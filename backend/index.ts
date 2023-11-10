import express, { Express, Request, Response } from "express";
import cors from "cors"
import dotenv from "dotenv";
import mongoose from "mongoose";
import Bus from "./models/Bus";
import Journey from "./models/Journey";
import busData from "./data/busData";
import { stops } from "./data/busData";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
app.use(cors())
app.use(express.json());

mongoose
  .connect("mongodb://0.0.0.0:27017/bookingApp")
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server : This is a booking app");
});

app.post('/newBus', async (req: Request, res: Response)=>{
  try{
    const {name, details, service, total_seats, stoppages, fare, start_time, arrival_time, duration } = req.body

    const newBus = new Bus({
      name, details, service, total_seats, stoppages, fare, start_time, arrival_time, duration
    })
    await newBus.save();
      res.status(200).json({ status: 'OK', newBus});
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred' });
  }
 
})

app.get('/getBus', async (req: Request, res: Response)=>{
  const {origin, destination, doj} = req.body
  try{
   function searchBus(origin: string, destination: string): Bus[]{
    return busData.filter((bus)=>{
      const originIndex = bus.stoppages.indexOf(origin);
      const destinationIndex = bus.stoppages.indexOf(destination);

      return originIndex !== -1 && destinationIndex !== -1 && originIndex < destinationIndex
    })
   }
   
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred' });
  }
})

// app.post('/searchBuses', async (req: Request, res: Response)=>{
//   let {origin, destination, doj} = req.body

//   let bus = await Bus.find({})

//   let quotes = await Quotes.find({
//     $or: [
//       {
//         quote: { $regex: searchTermLower },
//       },
//       {
//         quote: { $regex: searchTerm },
//       },
//       {
//         quote: { $regex: searchTermFirst },
//       },
//     ],
//   });
//   return quotes
// })

app.listen(port, () => {
  console.log(`[server]: Sever is running at localhost:${port}`);
});
