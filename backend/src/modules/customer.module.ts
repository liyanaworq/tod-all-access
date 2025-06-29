import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CustomerController } from '../controllers/customer/customer.controller';
import { CustomerAuthController } from '../controllers/customer/auth.controller';
import { CustomerService } from '../services/customer.service';
import { Customer, CustomerSchema } from '../schema/customer/customer.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Customer.name, schema: CustomerSchema }]),
  ],
  controllers: [CustomerController, CustomerAuthController],
  providers: [CustomerService],
})
export class CustomerModule {}
