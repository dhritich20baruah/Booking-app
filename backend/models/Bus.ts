import mongoose, { Schema, Document, Model } from 'mongoose';

type BusType = Document & {
  name: string;
  details: string;
  service: string;
  total_seats: number;
  stoppages: {
    name: string;
    distance_from_last: number;
    arrival_time: string;
  }[];
  fare: number;
  start_time: string;
  arrival_time: string;
};

const busSchema: Schema<BusType> = new Schema({
  name: String,
  details: String,
  service: String,
  total_seats: Number,
  stoppages: [
    {
      name: String,
      distance_from_last: Number,
      arrival_time: String,
    },
  ],
  fare: Number,
  start_time: String,
  arrival_time: String,
});

const Bus: Model<BusType> = mongoose.model<BusType>('Bus', busSchema);

export default Bus;
