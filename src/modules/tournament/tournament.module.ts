import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TournamentController } from './tournament.controller';
import { TournamentSchema } from "./tournament.interface";
import { UserSchema } from "../user/user.interface";
import { UserService } from '../../shared/services/user/user.service';
import { TournamentService } from "src/shared/services/tournament/tournament.service";

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Tournament', schema: TournamentSchema }, { name: 'User', schema: UserSchema }])],
    controllers: [TournamentController],
    providers: [TournamentService, UserService],
  })
export class TournamentModule {}
