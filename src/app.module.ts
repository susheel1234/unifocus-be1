import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CoachSchemaModel } from './schema/coach.schema';
import { UserBookingsModel } from './schema/user-booking.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/bookings', {
    }),
    MongooseModule.forFeature([{ name: 'Coach', schema:  CoachSchemaModel}]),
    MongooseModule.forFeature([{ name: 'UserBookings', schema:  UserBookingsModel}]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
