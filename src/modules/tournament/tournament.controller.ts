import { Body, Controller, Delete, Get, HttpException, Param, Patch, Post } from '@nestjs/common';
import { TournamentService } from '../../shared/services/tournament/tournament.service';
import { UserService } from '../../shared/services/user/user.service';
import { Tournament, Tourney } from '../../modules/tournament/tournament.interface';
import * as TournamentOrganizer from 'tournament-organizer';
import * as cache from 'memory-cache'
 
@Controller('tournament')
export class TournamentController {

    constructor(private readonly tournamentService: TournamentService, private readonly userService: UserService) { }
    // CREATE

    @Post()
    async insertTournament(
        @Body('tournament') tournament: Tournament) {
        const tournamentCreated = await this.tournamentService.insertTournament(tournament);
        const tournamentUser = await this.userService.insertTournamentOrganizer(tournamentCreated._id, tournament.organizer, tournament.name)
        return { tournament: tournamentCreated, user_upated: tournamentUser };
    };

    @Post('start-tourney/:id')
    async startTourney(
        @Param('id') id: string,
        @Body('tourney') tourney: Tourney
    ) {
        const manager = new TournamentOrganizer.EventManager();
        const newTourney = manager.createTournament(id, tourney);
        cache.put(id, manager);
        cache.put(id, newTourney);
        const oneTournament = await this.tournamentService.insertTourney(id, manager, newTourney)
        try {
            for (let i = 0; i < oneTournament.players.length; i++) {
                cache.get(id).addPlayer(oneTournament.players[i].alias, oneTournament.players[i].id, oneTournament.players[i].seed); // Id pode vir do front ou BD
                const player = newTourney.addPlayer(oneTournament.players[i].alias, oneTournament.players[i].id, oneTournament.players[i].seed); // Id pode vir do front ou BD
            }
            const eventStarted = await this.getStartEvent(id)
            return { status: eventStarted, standings: await this.getStandings(id)}
        } catch {
            throw new HttpException("No cake for you", 500)
        }
    }

    @Post('/add-player/:id')
    async insertPlayer(
        @Param('id') id: string,
        @Body('user_id') user_id: string,
        @Body('nickname') nickname: string,
        @Body('user') user: string,
        @Body('seed') seed: string
    ) {
        let player = { _id: user_id, alias: nickname, id: user, seed: seed }
        try {
            let tournament = await this.tournamentService.insertPlayer(id, player);
            await this.userService.insertTournamentPlayer(id, user_id, tournament.name);

        } catch {
            throw new HttpException("Registration failed", 400)
        }
    };

    @Post('/add-result/:id')
    async addResult(
        @Param('id') id: string,
        @Body('match_id') match_id: string,
        @Body('resultPlayerOne') resultPlayerOne: number,
        @Body('resultPlayerTwo') resultPlayerTwo: number
    ) {
        try {
            //const match = cache.get('tourney').activeMatches()[req.body[0].matchNumber -1]; This is one way without filter
            const match = await cache.get(id).activeMatches().filter(elem => elem.id == match_id, console.log("match_id", match_id));
            console.log('----------------------------------')
            console.log(match[0].id)
            console.log('----------------------------------')
            
            await cache.get(id).result(match[0], resultPlayerOne, resultPlayerTwo); // it is possible to have a forth param, with de draw, default is zero
            return { status: "Your result has been computed", match:  await cache.get(id).activeMatches().filter(elem => elem.id == match_id)};
        } catch (err) {
            throw new HttpException("Registration failed", 400)
        }
    };

    // READ

    @Get('/standings/:id')
    async getStandings(
        @Param('id') id: string
    ){
        return await cache.get(id).standings()
    }

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

    @Get('/start-tourney/:id')
    async getStartEvent( @Param('id') id: string) {
        await cache.get(id).startEvent();
        return { message: "you have just started an event" };
    }

    @Get('/active-matches/:id')
    async getActiveMatches(@Param('id') id: string) {
        return await cache.get(id).activeMatches();
    };

    @Get('/next-round/:id')
    async getNextRound(@Param('id') id: string) {
        await cache.get(id).nextRound();
        return { message: "Try to start next round" }
    };

    @Get('/tournament-name-id/:id')
    async getTournamentNameId(@Param('id') id: string
    ){
        const tourney = cache.get(id);
        return { eventID: tourney.eventID, name: tourney.name };
    };

    @Get('/clear-cache/:id')
    clearCache(@Param('id') id: string) {
        cache.del(id);
        cache.del(id);
        cache.clear();
        console.log(cache.size());
        return { message: "Just Cleaning some Cache" };
    };

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
