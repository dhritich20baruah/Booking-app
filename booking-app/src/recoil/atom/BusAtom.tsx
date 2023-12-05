import { atom } from "recoil";

type Bus = {
  name: string;
  details: string;
  total_seats: number;
  stoppages: Array<string>;
  fare: number;
  start_time: string;
  speed?: number;
  service: "day" | "night";
};

export const BusAtom = atom<Bus[]>({
  key: "BusAtom",
  default: [],
});