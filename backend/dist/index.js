"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const Bus_1 = __importDefault(require("./models/Bus"));
// import searchBus from "./data/busData";
const busData_1 = require("./data/busData");
const busData_2 = require("./data/busData");
const DailyRecord_1 = __importDefault(require("./models/DailyRecord"));
// import busData from "./data/busData";
dotenv_1.default.config();
const stripe = require("stripe")(process.env.STRIPE_SECRET);
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
mongoose_1.default
    .connect("mongodb://0.0.0.0:27017/bookingApp")
    .then(() => console.log("DB connected"))
    .catch((err) => console.log(err));
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server : This is a booking app");
});
app.post("/newBus", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, details, service, total_seats, stoppages, fare, start_time, arrival_time, duration, } = req.body;
        const newBus = new Bus_1.default({
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
        yield newBus.save();
        res.status(200).json({ status: "OK", newBus });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred" });
    }
}));
app.post("/getBus", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { origin, destination, doj } = req.body;
    const inputDoj = doj;
    const formattedDoj = inputDoj.replace(/^(\d{2})\/(\d{2})\/(\d{4})$/, "$3-$2-$1");
    const busArr = (0, busData_1.searchBus)(origin, destination, formattedDoj);
    const totalDistance = (0, busData_2.calculateTotalFare)(origin, destination);
    const busList = yield Promise.all(busArr.buses.map((item) => __awaiter(void 0, void 0, void 0, function* () {
        const bookedSeats = yield searchSeats(formattedDoj, origin, item.busName);
        const busStops = item.stoppages.slice(item.stoppages.indexOf(origin), item.stoppages.indexOf(destination));
        return Object.assign(Object.assign({}, item), { fare: Math.ceil(item.fare * totalDistance), origin,
            destination,
            doj, stoppages: busStops, bookedSeats: bookedSeats });
    })));
    res.json({ buses: busList });
}));
app.post("/bookSeat", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const savedRecordIds = [];
        yield Promise.all(req.body.map((passenger) => __awaiter(void 0, void 0, void 0, function* () {
            // Ensure that passenger details are provided
            if (passenger.passenger_name == "" ||
                passenger.mobile_no == "" ||
                passenger.email == "" ||
                passenger.age == "") {
                return res
                    .status(400)
                    .json({
                    error: "Passenger details are required and must be an array",
                });
            }
            else {
                const dailyRecord = new DailyRecord_1.default({
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
                const savedRecord = yield dailyRecord.save();
                savedRecordIds.push(savedRecord._id); // Assuming _id is the ObjectId field
            }
        })));
        res.status(201).json({ message: "Data saved successfully", savedRecordIds });
    }
    catch (error) {
        console.error("Error saving data:", error);
        res.status(500).json({ error: "Failed to save data" });
    }
}));
app.post('/create-payment-intent', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { amount, id, recordID } = req.body;
    try {
        const payment = yield stripe.paymentIntents.create({
            amount,
            currency: 'inr',
            description: "Book Seat",
            payment_method: id,
            confirm: true,
            return_url: "https://yourwebsite.com/success"
        });
        yield Promise.all(recordID.map((ids) => __awaiter(void 0, void 0, void 0, function* () {
            let records = yield DailyRecord_1.default.findByIdAndUpdate(ids, {
                $set: {
                    paymentID: payment.id,
                    payment_success: true
                },
            }, { new: true });
        })));
        res.json({
            message: "Payment Successful",
            success: true, payment: payment.id
        });
    }
    catch (error) {
        console.error('Error creating Payment Intent:', error);
        res.status(500).json({ error: 'Failed to create Payment Intent' });
    }
}));
app.post("/deleteRecord", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { recordID } = req.body;
    try {
        yield Promise.all(recordID.map((ids) => __awaiter(void 0, void 0, void 0, function* () {
            let records = yield DailyRecord_1.default.findByIdAndDelete(ids);
        })));
        res.json({
            message: "Record Deleted",
            success: true
        });
    }
    catch (error) {
        console.error('Error in deleting record:', error);
        res.status(500).json({ error: 'Failed to delete record' });
    }
}));
function searchSeats(doj, origin, busName) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const records = yield DailyRecord_1.default.find({
                doj, stoppages: { $in: [origin] }, busName
            }).exec();
            const bookedSeats = records.map(record => record.seat_no);
            return bookedSeats;
        }
        catch (error) {
            console.error('Error searching records', error);
        }
    });
}
app.listen(port, () => {
    console.log(`[server]: Sever is running at localhost:${port}`);
});
