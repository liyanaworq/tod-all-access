import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer, CustomerDocument } from '../schema/customer/customer.schema';
import { CreateCustomerDto } from '../dto/customer/create-customer.dto';
import { UpdateCustomerDto } from '../dto/customer/update-customer.dto';

@Injectable()
export class CustomerService {
  constructor(@InjectModel(Customer.name) private model: Model<CustomerDocument>) {}

  async create(dto: CreateCustomerDto) {
    return new this.model(dto).save();
  }

  async findAll() {
    return this.model.find({ status: { $ne: 'inactive' } }).exec();
  }

  async findById(id: string) {
    const customer = await this.model.findById(id).exec();
    if (!customer) throw new NotFoundException('Customer not found');
    return customer;
  }

  async update(id: string, dto: UpdateCustomerDto) {
    const updated = await this.model.findByIdAndUpdate(id, dto, { new: true }).exec();
    if (!updated) throw new NotFoundException('Customer not found or not updated');
    return updated;
  }

  async softDelete(id: string) {
    const deleted = await this.model.findByIdAndUpdate(id, { status: 'inactive' }, { new: true }).exec();
    if (!deleted) throw new NotFoundException('Customer not found or already inactive');
    return { message: 'Customer marked as inactive', id: deleted._id };
  }
}
