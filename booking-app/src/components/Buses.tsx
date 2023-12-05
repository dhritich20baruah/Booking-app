import redLogo from "../Images/redbuslogo.jpg";
import SeatPlan from "./SeatPlan";
import PassengerDetails from "./PassengerDetails";
import { Link } from "react-router-dom";
import {useRecoilState, useRecoilValue} from 'recoil'
import { VisibilityAtom } from "../recoil/atom/Visible";
import { passengerVisibilitySelector} from "../recoil/selectors/VisibilitySelectors";
import { BusAtom } from "../recoil/atom/BusAtom";
import { originState } from "../recoil/atom/JourneyAtom";
import { destinationState } from "../recoil/atom/JourneyAtom";
import { useState } from "react";

type busArr =  {
  name: string;
  details: string;
  total_seats: number;
  stoppages: Array<string>;
  fare: number;
  start_time: string;
  speed?: number;
  service: "day" | "night";
}

const Buses = () => {
  const [visibility, setVisibility] = useRecoilState(VisibilityAtom);
  const [busList] = useRecoilState<busArr[]>(BusAtom)
  const origin = useRecoilValue(originState);
  const destination = useRecoilValue(destinationState);
  
  
  const handleVisible = () => {
    setVisibility(visibility => !visibility);
  };
  
  const passengerVisibility = useRecoilValue(passengerVisibilitySelector)

  const [seatVisibility, setSeatVisibility] = useState(false);

  const handleSeatVisible = () => {
    setSeatVisibility((seatVisibility) => !seatVisibility);
  };

  console.log("Buses: ",busList)

  return (
    <main id="buses">
      <nav id="busesNav" className="flex justify-between items-center text-white h-[5em] bg-red-500 ">
        <ul className="flex items-center mx-[2em] space-x-[2em]">
          <Link to="/">
          <li>
            <img src={redLogo} alt="" className="h-[4em]"/>
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
        <strong>Home</strong> &gt; Bus Tickets &gt; {origin} To {destination} Bus
        &gt;
      </p>
      <hr />
      <p id="travelPlan" className="flex font-bold m-4">
        {" "}
        {origin} <i className="material-icons">arrow_forward</i> {destination}{" "}
        <i className="material-icons">chevron_left</i>10 Oct Tue{" "}
        <i className="material-icons">chevron_right</i>
        <button className="mx-1 p-1 text-white bg-red-500 rounded-md hover:cursor-pointer" onClick={handleVisible}>Modify</button>
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
              <input type="checkbox" name="before6am" id="before6am" className="mr-4"/>
              Before 6 am
            </li>
            <li>
              <input type="checkbox" name="6am-12pm" id="6am-12pm" className="mr-4" />6 am to 12
              pm
            </li>
            <li>
              <input type="checkbox" name="12pm-6pm" id="12pm-6pm" className="mr-4"/>
              12 pm to 6 pm
            </li>
            <li>
              <input type="checkbox" name="after6pm" id="after6pm" className="mr-4" />
              After 6 pm
            </li>
          </ul>
          <p>ARRIVAL TIME</p>
          <ul className="space-y-2 my-2">
            <li>
              <input type="checkbox" name="before6am" id="before6am" className="mr-4"/>
              Before 6 am
            </li>
            <li>
              <input type="checkbox" name="6am-12pm" id="6am-12pm" className="mr-4"/>6 am to 12
              pm
            </li>
            <li>
              <input type="checkbox" name="12pm-6pm" id="12pm-6pm" className="mr-4"/>
              12 pm to 6 pm
            </li>
            <li>
              <input type="checkbox" name="after6pm" id="after6pm" className="mr-4"/>
              After 6 pm
            </li>
          </ul>
        </div>
        <div id="busList" className="w-max-[80%] m-4">
          {busList.map((item)=>{
            return(
              <div id="card" className="p-4 grid grid-cols-7 gap-4 w-[100%] border-2 border-gray-600 font-md my-4">
              <div>
                <p className="font-bold text-lg">{item.name}</p>
                <br />
                <p>{item.details}</p>
              </div>
              <div>
                <p className="font-bold text-lg">20:30</p>
                <br />
                <br />
                <p>{item.start_time}</p>
              </div>
              <div>
                <p>09h 20m</p>
              </div>
              <div>
                <p className="font-bold text-lg">05:50</p>
                <p>11-Oct</p>
                <p>item.end_time</p>
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
                {!seatVisibility ?
                <button onClick={handleSeatVisible} className="bg-red-600 p-4 text-white hover:cursor-pointer hover:bg-red-700">VIEW SEATS</button>
                :
                <button onClick={handleSeatVisible} className="bg-red-600 p-4 text-white hover:cursor-pointer hover:bg-red-700">HIDE SEATS</button>
                }
              </div>
            </div>
            )
          })}
       
         {seatVisibility && <SeatPlan />}
        </div>
      </section>
      {passengerVisibility && <PassengerDetails />}
    </main>
  );
};

export default Buses;
