import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { Types } from "mongoose";
import Bus from "./models/Bus";
// import searchBus from "./data/busData";
import { searchBus } from "./data/busData";
import { calculateTotalFare } from "./data/busData";
import DailyRecord from "./models/DailyRecord";
// import busData from "./data/busData";
dotenv.config();

const stripe = require("stripe")(process.env.STRIPE_SECRET)

const app: Express = express();
const port = process.env.PORT;
app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://0.0.0.0:27017/bookingApp")
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server : This is a booking app");
});

app.post("/newBus", async (req: Request, res: Response) => {
  try {
    const {
      name,
      details,
      service,
      total_seats,
      stoppages,
      fare,
      start_time,
      arrival_time,
      duration,
    } = req.body;

    const newBus = new Bus({
      name,
      details,
      service,
      total_seats,
      stoppages,
      fare,
      start_time,
      arrival_time,
      duration,
    });
    await newBus.save();
    res.status(200).json({ status: "OK", newBus });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.post("/getBus", async (req: Request, res: Response) => {
  const { origin, destination, doj } = req.body;
  const inputDoj = doj;
  const formattedDoj: any = inputDoj.replace(
    /^(\d{2})\/(\d{2})\/(\d{4})$/,
    "$3-$2-$1"
  );

  const busArr = searchBus(origin, destination, formattedDoj);
  const totalDistance = calculateTotalFare(origin, destination);
  const busList = await Promise.all(busArr.buses.map(async(item) => {
    const bookedSeats = await searchSeats(formattedDoj, origin, destination, item.busName)
    return {
      ...item,
      fare: Math.ceil(item.fare * totalDistance),
      origin,
      destination,
      doj,
      bookedSeats: bookedSeats,
    };
  }));

  res.json({ buses: busList });
});

app.post("/bookSeat", async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const savedRecordIds: Types.ObjectId[] = [];

    await Promise.all(req.body.map(async (passenger: any) => {
      // Ensure that passenger details are provided
      if (
        passenger.passenger_name == "" ||
        passenger.mobile_no == "" ||
        passenger.email == "" ||
        passenger.age == ""
      ) {
        return res
          .status(400)
          .json({
            error: "Passenger details are required and must be an array",
          });
      } else {
        const dailyRecord = new DailyRecord({
          doj: passenger.doj,
          origin: passenger.origin,
          destination: passenger.destination,
          busName: passenger.busName,
          stoppages: passenger.stoppages,
          start_time: passenger.start_time,
          fare: passenger.fare,
          passenger_name: passenger.passenger_name,
          seat_no: passenger.seat_no,
          mobile_no: passenger.mobile_no,
          email: passenger.email,
          age: passenger.age,
        });
        const savedRecord = await dailyRecord.save();
        savedRecordIds.push(savedRecord._id); // Assuming _id is the ObjectId field
      }
    }));

    res.status(201).json({ message: "Data saved successfully", savedRecordIds });
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).json({ error: "Failed to save data" });
  }
});


app.post('/create-payment-intent', async (req: Request, res: Response) => {
  const {amount, id, recordID} = req.body;
  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: 'inr',
      description: "Book Seat",
      payment_method: id,
      confirm: true,
      return_url: "https://yourwebsite.com/success"
    })
    await Promise.all(recordID.map(async (ids: string)=>{
        let records = await DailyRecord.findByIdAndUpdate(ids,{
          $set:{
            paymentID: payment.id,
            payment_success: true
          },
        },
        {new: true}
        )
    }))
    res.json({
      message: "Payment Successful",
      success: true, payment: payment.id
    })  
  }
  catch(error){
    console.error('Error creating Payment Intent:', error);
    res.status(500).json({ error: 'Failed to create Payment Intent' });
  }
})

async function searchSeats(doj: string, origin: string, destination: string, busName: string){
  try {
    const records = await DailyRecord.find({
      doj, origin, destination, busName
    }).exec()

    const bookedSeats: string[] = records.map(record => record.seat_no)

    return bookedSeats
  } catch (error) {
    console.error('Error searching records', error)
  }
}

app.listen(port, () => {
  console.log(`[server]: Sever is running at localhost:${port}`);
});
