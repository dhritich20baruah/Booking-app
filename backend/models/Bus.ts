import mongoose, { Schema, Document, Model } from 'mongoose';

type BusType =  Document & {
    name: string;
    details: string;
    start: string;
    end: string;
    total_seats: string;
    stopages: string[];
    fare: string;
}

const busSchema: Schema<BusType> = new Schema({
    name: String,
    details: String,
    start: String,
    end: String,
    total_seats: String,
    stopages: [String],
    fare: String,
})

const Bus: Model<BusType> = mongoose.model<BusType>('Bus', busSchema);

export default Bus;