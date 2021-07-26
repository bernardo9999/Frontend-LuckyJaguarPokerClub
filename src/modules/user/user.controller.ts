import { Controller, Post, Body, Get, Param, Patch, Delete, Put, HttpException } from "@nestjs/common";
import { UserService } from '../../shared/services/user/user.service';
import { Model } from "mongoose";
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { User } from '../../modules/user/user.interface';
import { ApiCreatedResponse, ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
// const secret = process.env.JWT_SECRET;
const secret = 'jadfsijodfsJOIijiIIojNIO09H8798Jbguygkf56dsnyuuik'

@Controller('user')
export class UserController {

    constructor(@InjectModel('User') private readonly user: Model<User>, private readonly userService: UserService) { }

    // CREATE

    @Post()
    @ApiCreatedResponse({ description: 'User Registration' })
    async insertUser(
        @Body('user') user: string,
        @Body('password') password: string,
        @Body('nickname') nickname: string,

    ) {
        if (!user || typeof user !== 'string') {
            throw new HttpException ("User cannot be empty or other than string", 500)
        }
        if (user.length < 5) {
            throw new HttpException ("Password should be at least 6 characters", 500)
        }
        if (!nickname || typeof nickname !== 'string') {
            throw new HttpException ("User cannot be empty or other than string", 500)
        }
        if (nickname.length < 5) {
            throw new HttpException ("Password should be at least 6 characters", 500)
        }
        if (!password || typeof password !== 'string') {
            throw new HttpException ("User cannot be empty or other than string", 500)
        }
        if (password.length < 5) {
            throw new HttpException ("Password should be at least 6 characters", 500)
        }
        try{
        const generatedId = await this.userService.insertUser(user, await bcrypt.hash(password, 10), nickname);
        return {nickname: generatedId.nickname}
        }catch (error) {
            if (error.code === 11000) {
                console.log(error.message)
                 throw new HttpException ("Duplicate record", 500)
            }
            else{
                throw new Error(error)
            }
        }
    };

    @Post('login')
    @ApiOkResponse({ description: 'User Login' })
    @ApiUnauthorizedResponse({ description: 'Invalid Credentials' })
    async loginUser(
        @Body('user') user: string,

        @Body('password') password: string) {
        if (!user || !password) {
            throw Error('Invalid user or password');
        }
        const userChecked = await this.userService.checkUser(user);
        if (await bcrypt.compare(password, userChecked.password)) {
            const token = jwt.sign({ user: userChecked }, secret)
    return  {id: userChecked._id, nickname: userChecked.nickname, access: userChecked.access, token: token} 
        } else {
            throw Error('Invalid user or password');
        }
    }

    // READ

    @Get()
    async getAllUser() {
        const user = await this.userService.fetchAllUser();
        return user.map((user) => (user));
    };

    @Get(':id')
    async getOneUser(@Param('id') id: string) {
        const user = await this.userService.fetchOneUser(id);
        return user;
    }

    // UPDATE

    @Put(':id')
    async updateUser(
        @Param('id') id: string,
        @Body('user') user: User) {
            console.log(user)
        const updatedUser = await this.userService.updateUser(id, user);
        return ({ "message": `User ${updatedUser.id} updated!` });
    }

    @Post('change-password')
    async changePassword(
        @Body('token') token: string,
        @Body('password') password: string) {
        if (!password || typeof password !== 'string') {
            throw new Error('Password cannot be empty or other than string')
        }
        if (password.length < 5) {
            throw new Error('Password should be at least 6 characters')
        }
        try {
            const user = jwt.verify(token, secret);
            const id = user.id
            const hashedPassword = await bcrypt.hash(password, 10)
            console.log(user, id, hashedPassword)
            const updatedPassword = await this.userService.updatePassword(id, hashedPassword)
            return { status: 'ok' }
        } catch (error) {
            throw Error(error)
        }
    }

    // DELETE

    @Delete(':id')
    async deleteOneUser(@Param('id') id: string) {
        const deletedUser = await this.userService.deleteUser(id);
        return ({ "message": `User ${deletedUser} deleted!` });
    }
}
