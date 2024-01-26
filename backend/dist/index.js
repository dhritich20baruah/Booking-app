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
app.post('/newBus', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, details, service, total_seats, stoppages, fare, start_time, arrival_time, duration } = req.body;
        const newBus = new Bus_1.default({
            name, details, service, total_seats, stoppages, fare, start_time, arrival_time, duration
        });
        yield newBus.save();
        res.status(200).json({ status: 'OK', newBus });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred' });
    }
}));
app.post('/getBus', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { origin, destination, doj } = req.body;
    const inputDoj = doj;
    const formattedDoj = inputDoj.replace(/^(\d{2})\/(\d{2})\/(\d{4})$/, "$3-$2-$1");
    const busArr = (0, busData_1.searchBus)(origin, destination, formattedDoj);
    const totalDistance = (0, busData_2.calculateTotalFare)(origin, destination);
    const busList = busArr.buses.map((item) => {
        return Object.assign(Object.assign({}, item), { fare: Math.ceil(item.fare * totalDistance), origin, destination, doj });
    });
    res.json({ buses: busList });
}));
app.post('/bookSeat', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { doj, name, details, total_seats, stoppages, start_time, seat } = req.body;
        const dailyRecord = new DailyRecord_1.default({
            doj,
            name,
            details,
            total_seats,
            stoppages,
            start_time,
            seat
        });
        yield dailyRecord.save();
        res.status(201).json({ message: 'Data saved successfully' });
    }
    catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ error: 'Failed to save data' });
    }
}));
app.listen(port, () => {
    console.log(`[server]: Sever is running at localhost:${port}`);
});
