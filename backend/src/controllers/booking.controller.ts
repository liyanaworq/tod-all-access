import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { BookingService } from '../services/booking.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { CreateBookingDto } from '../dto/bookings/create-booking.dto';// '../dto/create-booking.dto';
import { UpdateBookingDto } from '../dto/bookings/update-booking.dto';//'../dto/update-booking.dto';
import { AuthGuard } from '@nestjs/passport';
@UseGuards(JwtAuthGuard)
@Controller('bookings')
export class BookingController {
  constructor(private readonly service: BookingService) {}

@UseGuards(AuthGuard('jwt'))
@Post()
create(@Request() req, @Body() dto: CreateBookingDto) {
  const createdBy = req.user?.userId || req.body.createdBy;

  return this.service.create({
    ...dto,
    createdBy, // override regardless of what's in dto
  });
}


  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.service.findById(id);
  }

  @Get('/user/:userId')
  getByUser(@Param('userId') userId: string) {
    return this.service.getByUser(userId);
  }

  @Get('/customer/:customerId')
  getByCustomer(@Param('customerId') customerId: string) {
    return this.service.getByCustomer(customerId);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateBookingDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.softDelete(id);
  }
}
