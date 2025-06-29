import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CustomerDocument = Customer & Document;

@Schema({ timestamps: true })
export class Customer {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  phone?: string;

  @Prop() // Optional – present only for login
  password?: string;

  @Prop({ default: 'active' })
  status: 'active' | 'inactive';
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
