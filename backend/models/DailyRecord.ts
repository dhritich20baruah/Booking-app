import mongoose, { Schema, Document, Model } from 'mongoose';

type DailyRecordType =  Document & {
    doj: string;
    origin: string;
    destination: string;
    busName: string;
    total_seats: number;
    stoppages: Array<string>;
    start_time: string;
    fare: string;
    seat:{
        passenger_name: string;
        seat_no: string;
        mobile_no: string;
        email: string;
        age: string      
    }[];
}

const DailyRecordSchema: Schema<DailyRecordType> = new Schema({
    doj: String,
    origin: String,
    destination: String,
    busName: String,
    total_seats: Number,
    stoppages: Array<String>,
    start_time: String,
    fare: String,
    seat:[
        {
        passenger_name: String,
        seat_no: String,
        mobile_no: String,
        email: String,
        age: String
        }
    ],
})

const DailyRecord: Model<DailyRecordType> = mongoose.model<DailyRecordType>('DailyRecord', DailyRecordSchema);

export default DailyRecord;