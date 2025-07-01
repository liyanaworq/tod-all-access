import { IsString, IsEnum, IsDateString, IsOptional } from 'class-validator';

export enum BookingType {
  TOD_PASS = 'TOD_PASS',
  MEETING_ROOM = 'MEETING_ROOM',
}

export class CreateBookingDto {
  @IsString()
  userId: string;

  @IsString()
  outletId: string;

  @IsEnum(BookingType)
  bookingType: BookingType;

  @IsString()
  customerId: string;

  @IsOptional()
  @IsString()
  createdBy?: string;

  @IsOptional()
  @IsDateString()
  checkIn?: string;

  @IsOptional()
  checkOut?: Date;
}
