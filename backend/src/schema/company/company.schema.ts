import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CompanyDocument = Company & Document;

@Schema()
export class Company {
  @Prop({ required: true }) name: string;

  @Prop({ default: 100 }) quota: number; // Default monthly TOD pass quota
}

export const CompanySchema = SchemaFactory.createForClass(Company);
