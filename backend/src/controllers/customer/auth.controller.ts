import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  UseGuards,
  Get,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { Customer, CustomerDocument } from '../../schema/customer/customer.schema';// '../../schema/customer/user.schema';
// import { JwtAuthGuard } from '../../guards/jwt-auth.guard';

@Controller('auth/customer')
export class CustomerAuthController {
  constructor(
    @InjectModel(Customer.name)
    private customerModel: Model<CustomerDocument>,
  ) {}

  @Post('register')
  async register(@Body() body: { name: string; email: string; password: string }) {
    const hashed = await bcrypt.hash(body.password, 10);
    const created = new this.customerModel({ ...body, password: hashed });
    return created.save();
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const user = await this.customerModel.findOne({ email: body.email });
    if (!user || !user.password || !(await bcrypt.compare(body.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'yourSuperSecretKey');
    return { token, customer: { _id: user._id, name: user.name, email: user.email } };
  }
}
