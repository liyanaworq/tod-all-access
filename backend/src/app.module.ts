import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';  
import { BookingModule } from './modules/booking.module';
import { UserModule } from './modules/user.module'
import { CompanyModule} from './modules/company.module'
import {OutletModule} from './modules/outlet.module' 
import {AuthModule} from './modules/auth.module'
import {TestController} from './controllers/test.controller'
import {CustomerModule} from './modules/customer.module'
import {ResourceModule } from './modules/resources.module'
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://localhost:27017/coworking'),
    BookingModule,
    UserModule,
    CompanyModule,
    OutletModule,
    AuthModule,
    CustomerModule,
    ResourceModule
  ],
  controllers:[TestController]
})
export class AppModule {}
