import express, { Express, Request, Response } from "express";
import cors from "cors"
import dotenv from "dotenv";
import mongoose from "mongoose";
import Bus from "./models/Bus";
import Journey from "./models/Journey";

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
    const {name, details, start, end, total_seats, stopages, fare } = req.body

    const newBus = new Bus({
      name, details, start, end, total_seats, stopages, fare 
    })
    await newBus.save();
      res.status(200).json({ status: 'OK' });
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred' });
  }
 
})

app.get('/getBus', async (req: Request, res: Response)=>{
  try{
    const busDetails = await Bus.find({})
    res.status(200).json({busDetails})
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred' });
  }
})

app.listen(port, () => {
  console.log(`[server]: Sever is running at localhost:${port}`);
});
