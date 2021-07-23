import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TournamentController } from './tournament.controller';
import { TournamentSchema } from "./tournament.interface";
import { TournamentService } from "src/shared/services/tournament/tournament.service";

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Tournament', schema: TournamentSchema }])],
    controllers: [TournamentController],
    providers: [TournamentService],
  })
export class TournamentModule {}
