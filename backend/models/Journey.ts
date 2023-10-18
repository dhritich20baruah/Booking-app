import mongoose, { Schema, Document, Model } from 'mongoose';

type JourneyType =  Document & {
    pickup: string;
    drop_off: string;
    startTime: string;
    endTime: string;
    passenger: string;
    bus_id: string;
    seat_no: string;
    mobile_no: string;
    email: string;
    gender: string;
    age: string;
    fare: string;
    city: string;
    state: string
}

const journeySchema: Schema<JourneyType> = new Schema({
    pickup: String,
    drop_off: String,
    startTime: String,
    endTime: String,
    passenger: String,
    bus_id: String,
    seat_no: String,
    mobile_no: String,
    email: String,
    gender: String,
    age: String,
    fare: String,
    city: String,
    state: String,
})

const Journey: Model<JourneyType> = mongoose.model<JourneyType>('Journey', journeySchema);

export default Journey;