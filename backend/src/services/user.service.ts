import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schema/users/user.schema';// '../schemas/user.schema';
import { CreateUserDto } from '../dto/create-user.dto';//
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private model: Model<UserDocument>) {}

async create(dto: CreateUserDto) {
  const hashedPassword = await bcrypt.hash(dto.password, 10);
  const user = new this.model({ ...dto, password: hashedPassword });
  return user.save();
}

  async findAll() {
    return this.model.find().exec();
  }

  async findByEmail(email: string) {
    return this.model.findOne({ email }).exec();
  }
}
