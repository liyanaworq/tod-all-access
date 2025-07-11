import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
// user/schemas/user.schema.ts
@Schema()
export class User {
  @Prop({ required: true }) name: string;
  @Prop({ required: true, unique: true }) email: string;
  @Prop({ required: true }) password: string;
  @Prop({ enum: ['USER', 'PIC', 'FD', 'ADMIN'], default: 'USER' }) role: string;
}


export const UserSchema = SchemaFactory.createForClass(User);
