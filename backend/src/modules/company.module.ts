import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'; 
import {Company, CompanySchema} from '../schema/company/company.schema'
import {CompanyController} from '../controllers/company.controlller'
import {CompanyService} from '../services/company.service'

@Module({
  imports: [MongooseModule.forFeature([{ name: Company.name, schema: CompanySchema }])],
  controllers: [CompanyController],
  providers: [CompanyService],
})


export class CompanyModule {}
