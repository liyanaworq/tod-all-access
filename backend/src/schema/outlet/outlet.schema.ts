import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OutletDocument = Outlet & Document;

@Schema()
export class Outlet {
  @Prop({ required: true }) name: string;

  @Prop({ required: true }) location: string;

  @Prop({ default: 20 }) dailyQuota: number;
}

export const OutletSchema = SchemaFactory.createForClass(Outlet);


