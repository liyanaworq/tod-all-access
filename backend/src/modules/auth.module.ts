import { Module } from '@nestjs/common';   
import {UserModule} from './user.module'
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import {AuthService} from '../services/auth.service'
import {JwtStrategy} from '../stratergies/jwt.stratergies'
import {AuthController} from '../controllers/auth.controller'

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: 'yourSuperSecretKey',//process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
 