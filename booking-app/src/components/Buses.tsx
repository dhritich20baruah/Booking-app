import redLogo from "../Images/redbuslogo.jpg";
import SeatPlan from "./SeatPlan";
import { Link } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { VisibilityAtom } from "../recoil/atom/Visible";
import { BusAtom } from "../recoil/atom/BusAtom";
import { originState } from "../recoil/atom/JourneyAtom";
import { destinationState } from "../recoil/atom/JourneyAtom";
import { useState } from "react";

type busArr = {
  name: string;
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
    endTime: string;
  };
  origin: string;
  destination: string;
  doj: string;
};

const Buses = () => {
  const [, setVisibility] = useRecoilState(VisibilityAtom);
  const [busList] = useRecoilState<busArr[]>(BusAtom);
  const origin = useRecoilValue(originState);
  const destination = useRecoilValue(destinationState);
  const [seatVisibility, setSeatVisibility] = useState(false);
  const [busFare, setbusFare] = useState(0);

  const handleVisible = () => {
    setVisibility((visibility) => !visibility);
  };

  const handleFare = (fare:number)=>{
    setbusFare(fare);
    handleSeatVisible()
  }
  const handleSeatVisible = () => {
    setSeatVisibility((seatVisibility) => !seatVisibility);
  };

  console.log("Buses: ", busList);

  return (
    <main id="buses">
      <nav
        id="busesNav"
        className="flex justify-between items-center text-white h-[5em] bg-red-500 "
      >
        <ul className="flex items-center mx-[2em] space-x-[2em]">
          <Link to="/">
            <li>
              <img src={redLogo} alt="" className="h-[4em]" />
            </li>
          </Link>
          <li>BUS TICKETS</li>
        </ul>
        <ul className="flex items-center mx-[2em] space-x-[2em]">
          <li>Help</li>
          <li className="flex items-center">
            Manage Booking <i className="material-icons">expand_more</i>
          </li>
          <li className="flex items-center">
            <i className="material-icons">account_circle</i>{" "}
            <i className="material-icons">expand_more</i>
          </li>
        </ul>
      </nav>
      <p id="busRoute" className="m-4">
        <strong>Home</strong> &gt; Bus Tickets &gt; {origin} To {destination}{" "}
        Bus &gt;
      </p>
      <hr />
      <p id="travelPlan" className="flex font-bold m-4">
        {" "}
        {origin} <i className="material-icons">arrow_forward</i> {destination}{" "}
        <i className="material-icons">chevron_left</i>10 Oct Tue{" "}
        <i className="material-icons">chevron_right</i>
        <button
          className="mx-1 p-1 text-white bg-red-500 rounded-md hover:cursor-pointer"
          onClick={handleVisible}
        >
          Modify
        </button>
      </p>
      <hr />
      <section id="busSelection" className="flex">
        <div id="filters" className="m-4 w-[20%]">
          <p>FILTERS</p>
          <ul className="space-y-2 my-2">
            <li>Live Tracking</li>
            <li>Primo Bus</li>
          </ul>
          <p>DEPARTURE TIME</p>
          <ul className="space-y-2 my-2">
            <li>
              <input
                type="checkbox"
                name="before6am"
                id="before6am"
                className="mr-4"
              />
              Before 6 am
            </li>
            <li>
              <input
                type="checkbox"
                name="6am-12pm"
                id="6am-12pm"
                className="mr-4"
              />
              6 am to 12 pm
            </li>
            <li>
              <input
                type="checkbox"
                name="12pm-6pm"
                id="12pm-6pm"
                className="mr-4"
              />
              12 pm to 6 pm
            </li>
            <li>
              <input
                type="checkbox"
                name="after6pm"
                id="after6pm"
                className="mr-4"
              />
              After 6 pm
            </li>
          </ul>
          <p>ARRIVAL TIME</p>
          <ul className="space-y-2 my-2">
            <li>
              <input
                type="checkbox"
                name="before6am"
                id="before6am"
                className="mr-4"
              />
              Before 6 am
            </li>
            <li>
              <input
                type="checkbox"
                name="6am-12pm"
                id="6am-12pm"
                className="mr-4"
              />
              6 am to 12 pm
            </li>
            <li>
              <input
                type="checkbox"
                name="12pm-6pm"
                id="12pm-6pm"
                className="mr-4"
              />
              12 pm to 6 pm
            </li>
            <li>
              <input
                type="checkbox"
                name="after6pm"
                id="after6pm"
                className="mr-4"
              />
              After 6 pm
            </li>
          </ul>
        </div>
        <div id="busList" className="w-max-[80%] m-4">
          {busList.map((item) => {
            return (
              <div
                id="card"
                className="p-4 grid grid-cols-7 gap-4 w-[100%] border-2 border-gray-600 font-md my-4"
              >
                <div>
                  <p className="font-bold text-lg">{item.name}</p>
                  <br />
                  <p>{item.details}</p>
                </div>
                <div>
                  <p className="font-bold text-lg">{item.start_time}</p>
                  <p>{item.doj}</p>
                  <p>{item.origin}</p>
                </div>
                <div>
                  <p>Duration</p>
                </div>
                <div>
                  <p className="font-bold text-lg">{item.travelTime.endTime}</p>
                  <p>{item.travelTime.endDate}</p>
                  <p>{item.destination}</p>
                </div>
                <div>
                  <p className="font-bold text-lg">
                    <i className="material-icons">star</i>4.0
                  </p>
                </div>
                <div>
                  <p className="font-bold text-lg">INR {item.fare}</p>
                </div>
                <div>
                  <br />
                  <p>{item.total_seats} Seats Available</p>
                  <p>8 Single</p>
                  <br />
                  <br />
                  <button
                    onClick={() => handleFare(item.fare)}
                    className="bg-red-600 p-4 text-white hover:cursor-pointer hover:bg-red-700"
                  >
                    VIEW SEATS
                  </button>
                </div>
                <div>
                  {seatVisibility && (
                    <div>
                      <SeatPlan
                        origin={item.origin}
                        destination={item.destination}
                        doj={item.doj}
                        total_seats={item.total_seats}
                        stoppages={item.stoppages}
                        start_time={item.start_time}
                        fare={busFare}
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          {seatVisibility &&
           <button
           onClick={handleSeatVisible}
           className="bg-red-600 p-4 text-white hover:cursor-pointer hover:bg-red-700 fixed top-[10%] right-[10%]"
           >
                    X
           </button>
          }
        </div>
      </section>
    </main>
  );
};

export default Buses;
