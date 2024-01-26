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
        origin: string;
        destination: string
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
        passenger_name: String,
        seat_no: String,
        mobile_no: String,
        email: String,
        age: String,
        fare: String,
        origin: String,
        destination: String
        }
    ],
})

const DailyRecord: Model<DailyRecordType> = mongoose.model<DailyRecordType>('DailyRecord', DailyRecordSchema);

export default DailyRecord;