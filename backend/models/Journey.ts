import mongoose, { Schema, Document, Model } from 'mongoose';

type JourneyType =  Document & {
    origin: string;
    destination: string;
    startTime: string;
    endTime: string;
    passenger: string;
    bus_id: string;
    seat_no: string;
    mobile_no: string;
    email: string;
    age: string;
    fare: string;
}

const journeySchema: Schema<JourneyType> = new Schema({
    origin: String,
    destination: String,
    startTime: String,
    endTime: String,
    passenger: String,
    bus_id: String,
    seat_no: String,
    mobile_no: String,
    email: String,
    age: String,
    fare: String
})

const Journey: Model<JourneyType> = mongoose.model<JourneyType>('Journey', journeySchema);

export default Journey;