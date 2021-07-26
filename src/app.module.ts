import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { RankingModule } from './modules/ranking/ranking.module';
import { TournamentModule } from './modules/tournament/tournament.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://equalssport:equalssportpasswd@localhost:27019/equalssport', {  useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }), 
    UserModule, RankingModule, TournamentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
