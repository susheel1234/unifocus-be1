import { Document } from 'mongoose';
import * as mongoose from 'mongoose';


export interface Coach extends Document {
    total_coach: number;
    total_row: number;
    seat_per_row: number;
    booked_seats: number;
    booked_seat_colour: string;
    available_seat_colour: string;
    user_seat_colour: string;
    booked_sheets: string[];
}


export const CoachSchemaModel = new mongoose.Schema({
    total_coach: { type: Number, required: true },
    total_row: { type: Number, required: true },
    seat_per_row: { type: Number, required: true },
    booked_seats: { type: Number, required: true },
    booked_seat_colour: { type: String, required: true },
    available_seat_colour: { type: String, required: true },
    user_seat_colour: { type: String, required: true },
    booked_sheets: { type: [String], default: [] },
})