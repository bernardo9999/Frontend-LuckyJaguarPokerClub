import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from "mongoose";
import { InjectModel } from '@nestjs/mongoose';
import { Tournament } from '../../../modules/tournament/tournament.interface';
import { TournamentController } from 'src/modules/tournament/tournament.controller';

@Injectable()
export class TournamentService {

    constructor(@InjectModel('Tournament') private readonly tournamentModel: Model<Tournament>) { }

    // CREATE

    insertTournament(tournament: Tournament) {
        const newTournament = new this.tournamentModel(tournament);
        return newTournament.save();
    }

    insertTourney(id, manager, newTourney) {
        return this.tournamentModel.findByIdAndUpdate({ _id: id }, { "$set": { "EventManager": manager , "tourney": newTourney } }, {  upsert: true, new: true, setDefaultsOnInsert: true })

    }

    insertPlayer(id, player) {
        return this.tournamentModel.findByIdAndUpdate({ _id: id }, { "$push": { "players": player } },  { upsert: true, new: true, setDefaultsOnInsert: true })
        // return await this.tournamentModel.findByIdAndUpdate({ _id: id }, { "$push": { "tourney.$[outer].players": player } }, { "arrayFilters": [{ "outer.name": tourney_name }], new: true }
            // return await this.tournamentModel.findByIdAndUpdate({ _id: id }, { "$set": { "tourney.$[outer].players.$[inner]": player } }, { "arrayFilters": [{ "outer.name": tourney_name }, { "inner.id": player.id }], upsert: true, new: true }, function (err, doc) {
           
    }

    // READ

    async fetchAllTournament() {
        const allTournament = await this.tournamentModel.find().exec();
        return allTournament as Tournament[];
    }

    async fetchOneTournament(id: string) {
        const oneTournament = await this.findTournament(id);
        return oneTournament
    }

    async findTournament(id: string): Promise<Tournament> {
        let tournament;
        try {
            tournament = await this.tournamentModel.findById(id).exec();
        } catch (error) {
            throw new NotFoundException(error);
        }
        if (!tournament) {
            throw new NotFoundException('Could not find tournament');
        }
        return tournament as Tournament;
    }


    // UPDATE

    async updateTournament(tournament: Tournament) {
        const updateTournament = await this.tournamentModel.findByIdAndUpdate(tournament.id, tournament, { new: true });
        return updateTournament;
    }


    // DELETE

    async deleteTournament(id: string): Promise<void> {
        const deleteTournament = await this.tournamentModel.deleteOne({ _id: id }).exec();
        if (deleteTournament.n === 0) {
            throw new NotFoundException('Could not find tournament');
        }
    }
}