import { UserService } from '../services/user.service';// '../services/user.service';
import { CreateUserDto } from '../dto/create-user.dto';//'./dto/create-user.dto';
import {JwtAuthGuard} from '../guards/jwt-auth.guard';
import { Controller, Get, Post, Body,  UseGuards,Request  } from '@nestjs/common';

@Controller('users')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
