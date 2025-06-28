import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {Company, CompanyDocument} from '../schema/company/company.schema'
import {CreateCompanyDto} from '../dto/create-company.dto'
@Injectable()
export class CompanyService {
  constructor(@InjectModel(Company.name) private model: Model<CompanyDocument>) {}

  async create(dto: CreateCompanyDto) {
    return new this.model(dto).save();
  }

  async findAll() {
    return this.model.find().exec();
  }
}
