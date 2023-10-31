import mongoose, { Schema, Document, Model } from 'mongoose';

type DailyRecordType =  Document & {
    doj: string;
    bus_id: string;
    passenger:{
        name: string;
        seat_no: string;
        mobile_no: string;
        email: string;
        gender: string;
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
    bus_id: String,
    passenger:[
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