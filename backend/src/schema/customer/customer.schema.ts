import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'; 

export type CustomerDocument = Customer & Document;
@Schema()
export class Customer {
  @Prop({ required: true }) name: string;
  @Prop({ required: true, unique: true }) email: string;
  @Prop() phone?: string;
}
export const CustomerSchema = SchemaFactory.createForClass(Customer);
