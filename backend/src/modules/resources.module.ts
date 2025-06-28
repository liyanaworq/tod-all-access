import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ResourceController } from '../controllers/resource.controller'; 
import { ResourceService } from '../services/resource.service';
import { Resource, ResourceSchema } from '../schema/resource/resource.schema';
@Module({
  imports: [MongooseModule.forFeature([{ name:  Resource.name, schema:  ResourceSchema }])],
  controllers: [ ResourceController],
  providers: [ ResourceService],
})
export class ResourceModule {}
