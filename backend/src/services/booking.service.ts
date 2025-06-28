import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Booking, BookingDocument } from '../schema/booking/booking.schema';
import { CreateBookingDto } from '../dto/bookings/create-booking.dto';
import { UpdateBookingDto } from '../dto/bookings/update-booking.dto';

@Injectable()
export class BookingService {
  constructor(
    @InjectModel(Booking.name)
    private readonly bookingModel: Model<BookingDocument>,
  ) {}

  async create(dto: CreateBookingDto): Promise<Booking> {
    const booking = new this.bookingModel(dto);
    return booking.save();
  }

  async findAll(): Promise<Booking[]> {
    return this.bookingModel
      .find({ status: { $ne: 'inactive' } })
      .populate('userId')
      .populate('customerId')
      .populate('outletId')
      .exec();
  }

  async findById(id: string): Promise<Booking> {
    const booking = await this.bookingModel
      .findById(id)
      .populate('userId')
      .populate('customerId')
      .populate('outletId')
      .exec();

    if (!booking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }

    return booking;
  }

  async getByUser(userId: string): Promise<Booking[]> {
    return this.bookingModel
      .find({ userId, status: { $ne: 'inactive' } })
      .populate('customerId')
      .populate('outletId')
      .exec();
  }

  async getByCustomer(customerId: string): Promise<Booking[]> {
    return this.bookingModel
      .find({ customerId, status: { $ne: 'inactive' } })
      .populate('userId')
      .populate('outletId')
      .exec();
  }

  async update(id: string, dto: UpdateBookingDto): Promise<Booking> {
    const updated = await this.bookingModel.findByIdAndUpdate(id, dto, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }

    return updated;
  }

  async softDelete(id: string): Promise<{ message: string }> {
    const result = await this.bookingModel.findByIdAndUpdate(
      id,
      { status: 'inactive' },
      { new: true },
    );

    if (!result) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }

    return { message: `Booking ${id} marked as inactive` };
  }
}
