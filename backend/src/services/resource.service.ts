import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Request,
  Injectable,
  UseGuards,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Resource, ResourceDocument } from '../schema/resource/resource.schema';
import { CreateResourceDto } from '../dto/resources/create-resource.dto'
import { UpdateResourceDto } from '../dto/resources/update-resource.dto'


@Injectable()
export class ResourceService {
  constructor(
    @InjectModel(Resource.name) private resourceModel: Model<ResourceDocument>,
  ) {}

  async create(dto: CreateResourceDto): Promise<Resource> {
    return new this.resourceModel(dto).save();
  }

  async findAll(): Promise<Resource[]> {
    return this.resourceModel.find({ status: 'active' }).populate('outletId');
  }

  async findByOutlet(outletId: string): Promise<Resource[]> {
    return this.resourceModel.find({ outletId, status: 'active' });
  }

  async update(id: string, dto: UpdateResourceDto): Promise<any> {
    return this.resourceModel.findByIdAndUpdate(id, dto, { new: true });
  }

  async softDelete(id: string): Promise<{ message: string }> {
    await this.resourceModel.findByIdAndUpdate(id, { status: 'inactive' });
    return { message: `Resource ${id} marked as inactive` };
  }
}
