import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'; 
import { UserController } from '../controllers/user.controller'
import { UserService } from '../services/user.service'; 
import { User, UserSchema } from '../schema/users/user.schema'; 


@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
