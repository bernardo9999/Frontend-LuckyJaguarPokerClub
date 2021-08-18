import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from "mongoose";
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../../modules/user/user.interface';
import { UserController } from 'src/modules/user/user.controller';

@Injectable()
export class UserService {

    constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

    // CREATE

    async insertUser(user: string, password: string, nickname: string) {
        const newUser = new this.userModel({
            user: user,
            password: password,
            nickname: nickname,
            access: 2
        });
        const result = await newUser.save();
        return result;
    }

    // READ

    async fetchAllUser() {
        const allUser = await this.userModel.find().exec();
        return allUser as User[];
    }

    async fetchOneUser(id: string) {
        const oneUser = await this.findUser(id);
        return oneUser
    }

    async findUser(id: string): Promise<User> {
        let user;
        try {
            user = await this.userModel.findById(id).exec();
        } catch (error) {
            throw new NotFoundException(error);
        }
        if (!user) {
            throw new NotFoundException('Could not find user');
        }
        return user as User;
    }

    async checkUser(user: string) {
        const checkUser = await this.userModel.findOne({ user }).lean();
        return checkUser
    }

    // UPDATE

    async updatePassword(id: string, hashedPassword) {
        console.log(id, hashedPassword)

        const updatedPassword = this.userModel.updateOne({ _id: id }, { $set: { password: hashedPassword } })
        return updatedPassword
    }

    async updateUser(id: string, user: User) {
        const updateUser = await this.userModel.findByIdAndUpdate(id, user, { new: true });
        return updateUser;
    }

    async insertTournamentOrganizer(tournament_id, organizer, tournament_name){
        let tournament = {_id: tournament_id, name: tournament_name}
        return await this.userModel.findOneAndUpdate({user: organizer},  {$push: {"tournament": tournament}}, { upsert: true, new: true, setDefaultsOnInsert: true })
    }

    async insertTournamentPlayer(tournament_id, user_id, tournament_name){
        let tournament = {_id: tournament_id, name: tournament_name}
        return await this.userModel.findOneAndUpdate({_id: user_id},  {$push: {"tournament": tournament}}, { upsert: true, new: true, setDefaultsOnInsert: true })
    }

    async insertTourney(tournament, user){
        return await this.userModel.findOneAndUpdate({user},  {$push: {"tournament": {"name":  tournament.name}}}, { upsert: true, new: true, setDefaultsOnInsert: true })
    }

    // DELETE

    async deleteUser(id: string): Promise<void> {
        const deleteUser = await this.userModel.deleteOne({ _id: id }).exec();
        if (deleteUser.n === 0) {
            throw new NotFoundException('Could not find user');
        }
    }
}
