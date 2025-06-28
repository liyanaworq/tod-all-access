import { OutletService } from '../services/outlet.service' ;//'./outlet.service';
import { CreateOutletDto } from '../dto/create-outlet.dto';// './dto/create-outlet.dto';
import {JwtAuthGuard} from '../guards/jwt-auth.guard';
import { Controller, Get, Post, Body,  UseGuards,Request  } from '@nestjs/common';


@UseGuards(JwtAuthGuard) // ⬅️ This applies to all methods
@Controller('outlets')
export class OutletController {
  constructor(private readonly service: OutletService) {}

  @Post()
  create(@Body() dto: CreateOutletDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
