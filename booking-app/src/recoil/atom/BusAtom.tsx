import { atom } from "recoil";

type Bus = {
  busName: string;
  details: string;
  total_seats: number;
  stoppages: Array<string>;
  fare: number;
  start_time: string;
  speed?: number;
  service: "day" | "night";
  travelTime: {
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string
  };
  origin: string;
  destination: string;
  doj: string
};

export const BusAtom = atom<Bus[]>({
  key: "BusAtom",
  default: [],
});