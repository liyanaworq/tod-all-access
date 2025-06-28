import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import {CreateCompanyDto} from '../dto/create-company.dto'
import {CompanyService} from '../services/company.service'
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard) // ⬅️ This applies to all methods
@Controller('companies')
export class CompanyController {
  constructor(private readonly service: CompanyService) {}

  @Post()
  create(@Body() dto: CreateCompanyDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
