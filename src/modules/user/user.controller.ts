import { Controller, Post, Body, Get, Param, Patch, Delete, Put } from "@nestjs/common";
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

    ) {

        if (!user || typeof user !== 'string') {
            throw new Error('User cannot be empty or other than string')
        }
        if (!password || typeof password !== 'string') {
            throw new Error('Password cannot be empty or other than string')
        }
        if (password.length < 5) {
            throw new Error('Password should be at least 6 characters')
        }
        const generatedId = await this.userService.insertUser(user, await bcrypt.hash(password, 10));
        return { generatedId };
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
            const token = jwt.sign({ user: user }, secret)
            return userChecked.access, userChecked._id, token
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

    @Patch(':id')
    async updateUser(
        @Body('user') user: User) {
        const updatedUser = await this.userService.updateUser(user);
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
