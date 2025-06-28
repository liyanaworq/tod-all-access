import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { CreateCustomerDto } from '../../dto/customer/create-customer.dto' 
import { CustomerService } from '../../services/customer.service';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import {UpdateCustomerDto} from '../../dto/customer/update-customer.dto'

@UseGuards(JwtAuthGuard)
@Controller('customers')
export class CustomerController {
  constructor(private readonly service: CustomerService) {}

  @Post()
  create(@Body() dto: CreateCustomerDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCustomerDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  softDelete(@Param('id') id: string) {
    return this.service.softDelete(id);
  }
}
