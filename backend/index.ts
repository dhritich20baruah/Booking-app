import express, { Express, Request, Response } from "express";
import cors from "cors"
import dotenv from "dotenv";
import mongoose from "mongoose";
import Bus from "./models/Bus";
import searchBus from "./data/busData";
import { calculateTotalFare } from "./data/busData";
import { getTravelTime } from "./data/busData";
import Journey from "./models/Journey";
import busData from "./data/busData";
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

app.post('/getBus', async (req: Request, res: Response)=>{
  const {origin, destination, doj} = req.body
  const inputDoj = doj;
  const formattedDoj = inputDoj.replace(/^(\d{2})\/(\d{2})\/(\d{4})$/, "$3-$2-$1");

  const matchBuses = searchBus(origin, destination)
  const totalDistance = calculateTotalFare(origin, destination)
  const busList = matchBuses.map((item)=>{
    const travelTime = getTravelTime(origin, destination, formattedDoj)
    return {
      ...item,
      fare: Math.ceil(item.fare * totalDistance),
      travelTime
    }
  })

  res.json({buses: busList} )
})


app.listen(port, () => {
  console.log(`[server]: Sever is running at localhost:${port}`);
});
