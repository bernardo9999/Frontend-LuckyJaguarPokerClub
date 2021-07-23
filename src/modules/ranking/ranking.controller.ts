import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { RankingService } from '../../shared/services/ranking/ranking.service';
import { Model } from "mongoose";
import { InjectModel } from '@nestjs/mongoose';
import { Ranking } from '../../modules/ranking/ranking.interface';
import { ApiCreatedResponse, ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';


@Controller('ranking')
export class RankingController {

    constructor(private readonly rankingService: RankingService) { }

    // CREATE

    @Post()
    async insertRanking(
        @Body('ranking') ranking: Ranking) {
        const rankingCreated = await this.rankingService.insertRanking(ranking);
        return { rankingCreated };
    };

    // READ

    @Get()
    async getAllRanking() {
        const ranking = await this.rankingService.fetchAllRanking();
        return ranking.map((ranking) => (ranking));
    };

    @Get(':id')
    async getOneRanking(@Param('id') id: string) {
        const ranking = await this.rankingService.fetchOneRanking(id);
        return ranking;
    }

    // UPDATE

    @Patch(':id')
    async updateRanking(
        @Body('ranking') ranking: Ranking) {
        const rankingUpdated = await this.rankingService.updateRanking(ranking);
        return (rankingUpdated);
    }

    // DELETE

    @Delete(':id')
    async deleteOneRanking(@Param('id') id: string) {
       await this.rankingService.deleteRanking(id);
    }
}
