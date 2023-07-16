import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AppService } from './app.service';
import { Coach } from './schema/coach.schema';
import { UserBookings } from './schema/user-booking.schema';

@Controller('bookings')
export class AppController {
  constructor(private readonly appService: AppService,
    @InjectModel('Coach') private readonly coachModel: Model<Coach>,
    @InjectModel('UserBookings') private readonly userBookingModel: Model<UserBookings> 
    ) {}

  @Post('save-seats')
  async insertCoachDetails(): Promise<any> {
    try {
      const res = await this.coachModel.insertMany({
        total_coach: 80,
        total_row: 12,
        seat_per_row: 7,
        booked_seats: 0,
        booked_seat_colour: 'red',
        available_seat_colour: 'green',
        user_seat_colour: 'purple',
        booked_sheets:[]
      })
      console.log(res, '====');
      return res;
    } catch (error) {
        console.log(error, '====--')
    }
  }

  @Get('seat-details')
  async getSeatDetails(): Promise<any> {
    const seatDetails = await this.coachModel.findOne({});
    console.log(seatDetails, '======BOOKIseatDetailsNGS=====')
    return seatDetails;
  }

  @Get('user/:username')
  async getUserBookings(@Param() param): Promise<any>{
    try {
      console.log(param, '========------')
      const bookings = await this.userBookingModel.findOne({username: param.username});
      console.log(bookings, '======BOOKINGS=====')
      return bookings;
    } catch (error) {
        console.log(error, '====---*****---====')
    }
  }

  @Post('user')
  async postBooking(@Body() body): Promise<any>{
    try {
      const seatId = body.seatId;
      const username = body.username;
      console.log(seatId, '=======', username)
      const bookings = await this.userBookingModel.findOneAndUpdate({
        username: username}, {
          $set: {
            username: username,
          },
          $push: { bookings: seatId }
        }, {upsert: true});
        let coach = await this.coachModel.findOne({});
        coach = JSON.parse(JSON.stringify(coach));
        coach['booked_sheets'].push(seatId);
        await this.coachModel.updateMany({},{$set: {booked_sheets: coach['booked_sheets']}})
      return bookings;
    } catch (error) {
        console.log(error, '====---*****---====')
    }
  }
  
}
