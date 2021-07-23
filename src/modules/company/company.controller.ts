import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CompanyService } from '../../shared/services/company/company.service';
import { Model } from "mongoose";
import { InjectModel } from '@nestjs/mongoose';
import { Company } from '../../modules/company/company.interface';
import { ApiCreatedResponse, ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';


@Controller('company')
export class CompanyController {

    constructor(private readonly companyService: CompanyService) { }

    // CREATE

    @Post()
    async insertCompany(
        @Body('company') company: Company) {
        const companyCreated = await this.companyService.insertCompany(company);
        return { companyCreated };
    };

    // READ

    @Get()
    async getAllCompany() {
        const company = await this.companyService.fetchAllCompany();
        return company.map((company) => (company));
    };

    @Get(':id')
    async getOneCompany(@Param('id') id: string) {
        const company = await this.companyService.fetchOneCompany(id);
        return company;
    }

    // UPDATE

    @Patch(':id')
    async updateCompany(
        @Body('company') company: Company) {
        const companyUpdated = await this.companyService.updateCompany(company);
        return (companyUpdated);
    }

    // DELETE

    @Delete(':id')
    async deleteOneCompany(@Param('id') id: string) {
       await this.companyService.deleteCompany(id);
    }
}
