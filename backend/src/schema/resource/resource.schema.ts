import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ResourceDocument = Resource & Document;

@Schema({ timestamps: true })
export class Resource {
  @Prop({ type: Types.ObjectId, ref: 'Outlet', required: true })
  outletId: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ enum: ['HOT_DESK', 'MEETING_ROOM'], required: true })
  type: 'HOT_DESK' | 'MEETING_ROOM';

  @Prop({ default: 'active' })
  status?: 'active' | 'inactive';
}

export const ResourceSchema = SchemaFactory.createForClass(Resource);
