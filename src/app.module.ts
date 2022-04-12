import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://pockerclub:pockerclubpasswd@cluster0.3f5k6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {  useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }), 
    UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
