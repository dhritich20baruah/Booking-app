import mongoose, { Schema, Document, Model } from 'mongoose';

type DailyRecordType =  Document & {
    doj: string;
    name: string;
    details: string;
    total_seats: number;
    stoppages: Array<string>;
    start_time: string;
    seat:{
        passenger_name: string;
        seat_no: string;
        mobile_no: string;
        email: string;
        age: string;
        fare: string;
        city: string;
        state: string;
        origin: string;
        destination: string;
        stoppages: string[];
    }[];
}

const DailyRecordSchema: Schema<DailyRecordType> = new Schema({
    doj: String,
    name: String,
    details: String,
    total_seats: Number,
    stoppages: Array<String>,
    start_time: String,
    seat:[
        {
        name: String,
        seat_no: String,
        mobile_no: String,
        email: String,
        gender: String,
        age: String,
        fare: String,
        city: String,
        state: String,
        origin: String,
        destination: String,
        stoppages: [String],
        }
    ],
})

const DailyRecord: Model<DailyRecordType> = mongoose.model<DailyRecordType>('DailyRecord', DailyRecordSchema);

export default DailyRecord;