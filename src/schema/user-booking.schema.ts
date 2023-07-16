import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export interface UserBookings extends Document {
    username: string[];
    bookings: [];
}

export const UserBookingsModel = new mongoose.Schema({
    username: {type: String, required: true},
    bookings: {type: [], default: []}
})