import { ResourceService } from '../services/resource.service' ;//'./outlet.service';
import { CreateResourceDto } from '../dto/resources/create-resource.dto'
import { UpdateResourceDto } from '../dto/resources/update-resource.dto'
import {JwtAuthGuard} from '../guards/jwt-auth.guard';
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

@UseGuards(JwtAuthGuard)
@Controller('resources')
export class ResourceController {
  constructor(private readonly service: ResourceService) {}

  @Post()
  create(@Body() dto: CreateResourceDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get('outlet/:outletId')
  findByOutlet(@Param('outletId') outletId: string) {
    return this.service.findByOutlet(outletId);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateResourceDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.softDelete(id);
  }
}
