import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'; 
import { BookingController } from '../controllers/booking.controller' ;//' /controllers/booking.controller';
import { Booking, BookingSchema } from '../schema/booking/booking.schema';
import { BookingService } from '../services/booking.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Booking.name, schema: BookingSchema }])],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule {}
