import mongoose, { Schema, Document, Model } from 'mongoose';

type DailyRecordType =  Document & {
    doj: string;
    origin: string;
    destination: string;
    busName: string;
    stoppages: Array<string>;
    start_time: string;
    fare: number;
    passenger_name: string;
    seat_no: string;
    mobile_no: string;
    email: string;
    age: string;
    paymentID: string;
    payment_success: boolean
}

const DailyRecordSchema: Schema<DailyRecordType> = new Schema({
    doj: String,
    origin: String,
    destination: String,
    busName: String,
    stoppages: Array<String>,
    start_time: String,
    fare: Number,
    passenger_name: String,
    seat_no: String,
    mobile_no: String,
    email: String,
    age: String,
    paymentID: String,
    payment_success: Boolean
})

const DailyRecord: Model<DailyRecordType> = mongoose.model<DailyRecordType>('DailyRecord', DailyRecordSchema);

export default DailyRecord;