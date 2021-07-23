import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './modules/user/user.controller';
import { UserModule } from './modules/user/user.module';
import { RankingController } from './modules/ranking/ranking.controller';
import { RankingModule } from './modules/ranking/ranking.module';
import { CompanyController } from './modules/company/company.controller';
import { CompanyModule } from './modules/company/company.module';
import { TournamentController } from './modules/tournament/tournament.controller';
import { TournamentModule } from './modules/tournament/tournament.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://equalssport:equalssportpasswd@localhost:27019/equalssport', {  useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }), 
    UserModule, RankingModule, CompanyModule, TournamentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
