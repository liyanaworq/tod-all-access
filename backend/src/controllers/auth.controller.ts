import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';// './auth.service';
import { LoginDto } from '../dto/login.dto';// './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(loginDto.email, loginDto.password);
    return this.authService.login(user);
  }
}
