import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RankingController } from './ranking.controller';
import { RankingSchema } from "./ranking.interface";
import { RankingService } from "src/shared/services/ranking/ranking.service";

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Ranking', schema: RankingSchema }])],
    controllers: [RankingController],
    providers: [RankingService],
  })
export class RankingModule {}
