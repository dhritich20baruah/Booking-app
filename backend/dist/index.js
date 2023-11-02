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
const busData_1 = __importDefault(require("./data/busData"));
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
app.get('/getBus', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const busDetails = await Bus.find({})
        for (let i = 0; i < busData_1.default.length; i++) {
            for (let j = 0; j < busData_1.default[i].stoppages.length - 1; j++) {
                console.log(busData_1.default[i].stoppages[j].name, busData_1.default[i].stoppages[j].distance_from_last, busData_1.default[i].stoppages[j + 1].name, busData_1.default[i].stoppages[j + 1].distance_from_last);
            }
        }
        res.status(200).json({ busData: busData_1.default });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred' });
    }
}));
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
