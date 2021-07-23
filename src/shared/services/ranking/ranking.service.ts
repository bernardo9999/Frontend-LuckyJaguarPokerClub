import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from "mongoose";
import { InjectModel } from '@nestjs/mongoose';
import { Ranking } from '../../../modules/ranking/ranking.interface';
import { RankingController } from 'src/modules/ranking/ranking.controller';

@Injectable()
export class RankingService {

    constructor(@InjectModel('Ranking') private readonly rankingModel: Model<Ranking>) { }

    // CREATE

    async insertRanking(ranking: Ranking) {
        const newRanking = new this.rankingModel({ ranking: ranking });
        const rankingCreated = await newRanking.save();
        return rankingCreated;
    }

    // READ

    async fetchAllRanking() {
        const allRanking = await this.rankingModel.find().exec();
        return allRanking as Ranking[];
    }

    async fetchOneRanking(id: string) {
        const oneRanking = await this.findRanking(id);
        return oneRanking
    }

    async findRanking(id: string): Promise<Ranking> {
        let ranking;
        try {
            ranking = await this.rankingModel.findById(id).exec();
        } catch (error) {
            throw new NotFoundException(error);
        }
        if (!ranking) {
            throw new NotFoundException('Could not find ranking');
        }
        return ranking as Ranking;
    }


    // UPDATE

    async updateRanking(ranking: Ranking) {
        const updateRanking = await this.rankingModel.findByIdAndUpdate(ranking.id, ranking, { new: true });
        return updateRanking;
    }

    // DELETE

    async deleteRanking(id: string): Promise<void> {
        const deleteRanking = await this.rankingModel.deleteOne({ _id: id }).exec();
        if (deleteRanking.n === 0) {
            throw new NotFoundException('Could not find ranking');
        }
    }
}