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
        const { name, details, start, end, total_seats, stopages, fare } = req.body;
        const newBus = new Bus_1.default({
            name, details, start, end, total_seats, stopages, fare
        });
        yield newBus.save();
        res.status(200).json({ status: 'OK' });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred' });
    }
}));
app.get('/getBus', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const busDetails = yield Bus_1.default.find({});
        res.status(200).json({ busDetails });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred' });
    }
}));
app.listen(port, () => {
    console.log(`[server]: Sever is running at localhost:${port}`);
});
