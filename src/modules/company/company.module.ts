import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanyController } from './company.controller';
import { CompanySchema } from "./company.interface";
import { CompanyService } from "src/shared/services/company/company.service";

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Company', schema: CompanySchema }])],
    controllers: [CompanyController],
    providers: [CompanyService],
  })
export class CompanyModule {}
