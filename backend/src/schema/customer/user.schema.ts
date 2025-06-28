// Backend: schema/user-customer.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserCustomerDocument = UserCustomer & Document;

@Schema({ timestamps: true })
export class UserCustomer {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: 'active' })
  status: 'active' | 'inactive';
}

export const UserCustomerSchema = SchemaFactory.createForClass(UserCustomer);
