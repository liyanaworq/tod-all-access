import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Outlet, OutletDocument } from '../schema/outlet/outlet.schema';//' ./schemas/outlet.schema';
import { CreateOutletDto } from '../dto/create-outlet.dto';//'./dto/create-outlet.dto';

@Injectable()
export class OutletService {
  constructor(@InjectModel(Outlet.name) private model: Model<OutletDocument>) {}

  async create(dto: CreateOutletDto) {
    return new this.model(dto).save();
  }

  async findAll() {
    return this.model.find().exec();
  }
}
