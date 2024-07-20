import mongoose, { Schema, Document, Model } from 'mongoose';

type BusType = Document & {
  busName: string;
  details: string;
  total_seats: number;
  stoppages: Array<string>;
  fare: number;
  start_time: string;
  speed?: number;
  service: "day" | "night";
}

const busSchema: Schema<BusType> = new Schema({
  busName: String,
  details: String,
  total_seats: Number,
  stoppages: Array<String>,
  fare: Number,
  start_time: String,
  speed: Number,
  service: String,
});

const Bus: Model<BusType> = mongoose.model<BusType>('Bus', busSchema);

export default Bus;
