import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type BookingDocument = Booking & Document;

@Schema({ timestamps: true })
export class Booking {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Customer', required: true })
  customerId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Outlet', required: true })
  outletId: Types.ObjectId;

  @Prop({
    type: String,
    enum: ['TOD_PASS', 'MEETING_ROOM'],
    required: true,
  })
  bookingType: 'TOD_PASS' | 'MEETING_ROOM';

  @Prop({ type: Date, required: true })
  checkIn: Date;

  @Prop({ type: Date })
  checkOut?: Date;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  createdBy: Types.ObjectId;

  @Prop({ type: String, default: 'active' })
  status?: 'active' | 'inactive';
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
