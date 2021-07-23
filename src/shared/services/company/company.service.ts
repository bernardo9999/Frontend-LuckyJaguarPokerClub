import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from "mongoose";
import { InjectModel } from '@nestjs/mongoose';
import { Company } from '../../../modules/company/company.interface';
import { CompanyController } from 'src/modules/company/company.controller';

@Injectable()
export class CompanyService {

    constructor(@InjectModel('Company') private readonly companyModel: Model<Company>) { }

    // CREATE

    async insertCompany(company: Company) {
        const newCompany = new this.companyModel({ company: company });
        const companyCreated = await newCompany.save();
        return companyCreated;
    }

    // READ

    async fetchAllCompany() {
        const allCompany = await this.companyModel.find().exec();
        return allCompany as Company[];
    }

    async fetchOneCompany(id: string) {
        const oneCompany = await this.findCompany(id);
        return oneCompany
    }

    async findCompany(id: string): Promise<Company> {
        let company;
        try {
            company = await this.companyModel.findById(id).exec();
        } catch (error) {
            throw new NotFoundException(error);
        }
        if (!company) {
            throw new NotFoundException('Could not find company');
        }
        return company as Company;
    }


    // UPDATE

    async updateCompany(company: Company) {
        const updateCompany = await this.companyModel.findByIdAndUpdate(company.id, company, { new: true });
        return updateCompany;
    }

    // DELETE

    async deleteCompany(id: string): Promise<void> {
        const deleteCompany = await this.companyModel.deleteOne({ _id: id }).exec();
        if (deleteCompany.n === 0) {
            throw new NotFoundException('Could not find company');
        }
    }
}