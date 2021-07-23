import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TournamentService } from '../../shared/services/tournament/tournament.service';
import { Model } from "mongoose";
import { InjectModel } from '@nestjs/mongoose';
import { Tournament } from '../../modules/tournament/tournament.interface';
import { ApiCreatedResponse, ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';


@Controller('tournament')
export class TournamentController {

    constructor(private readonly tournamentService: TournamentService) { }

    // CREATE

    @Post()
    async insertTournament(
        @Body('tournament') tournament: Tournament) {
        const tournamentCreated = await this.tournamentService.insertTournament(tournament);
        return { tournamentCreated };
    };

    // READ

    @Get()
    async getAllTournament() {
        const tournament = await this.tournamentService.fetchAllTournament();
        return tournament.map((tournament) => (tournament));
    };

    @Get(':id')
    async getOneTournament(@Param('id') id: string) {
        const tournament = await this.tournamentService.fetchOneTournament(id);
        return tournament;
    }

    // UPDATE

    @Patch(':id')
    async updateTournament(
        @Body('tournament') tournament: Tournament) {
        const tournamentUpdated = await this.tournamentService.updateTournament(tournament);
        return (tournamentUpdated);
    }

    // DELETE

    @Delete(':id')
    async deleteOneTournament(@Param('id') id: string) {
       await this.tournamentService.deleteTournament(id);
    }
}
