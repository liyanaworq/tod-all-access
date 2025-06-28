import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OutletController } from '../controllers/outlet.controller';// './outlet.controller';
import { OutletService } from '../services/outlet.service';//'./outlet.service';
import { Outlet, OutletSchema } from '../schema/outlet/outlet.schema';// './schemas/outlet.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Outlet.name, schema: OutletSchema }])],
  controllers: [OutletController],
  providers: [OutletService],
})
export class OutletModule {}
