import redLogo from "../Images/redbuslogo.jpg";
import SeatPlan from "./SeatPlan";
import PassengerDetails from "./PassengerDetails";
import { Link } from "react-router-dom";
import {useRecoilState, useRecoilValue} from 'recoil'
import { VisibilityAtom } from "../recoil/atom/Visible";
import { passengerVisibilitySelector } from "../recoil/selectors/VisibilitySelectors";

const Buses = () => {
  const [visibility, setVisibility] = useRecoilState(VisibilityAtom);

  const handleVisible = () => {
    setVisibility((visibility) => !visibility);
  };

  const passengerVisibility = useRecoilValue(passengerVisibilitySelector)

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
          <li>rYde</li>
          <li>redRail</li>
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
        <strong>Home</strong> &gt; Bus TIckets &gt; Guwahati To Dibrugarh Bus
        &gt;
      </p>
      <hr />
      <p id="travelPlan" className="flex font-bold m-4">
        {" "}
        Guwahati <i className="material-icons">arrow_forward</i> Dibrugarh{" "}
        <i className="material-icons">chevron_left</i>10 Oct Tue{" "}
        <i className="material-icons">chevron_right</i>
        <button>Modify</button>
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
        <div id="busList">
          <div id="card">
            <div>
              <p className="text-bold">John Travels</p>
              <br />
              <p>Volvo Multi-Axle A/C Semi Sleeper (2+2)</p>
            </div>
            <div>
              <p className="text-bold">20:30</p>
              <br />
              <br />
              <p>ISBT Guwahati</p>
            </div>
            <div>
              <p>09h 20m</p>
            </div>
            <div>
              <p className="text-bold">05:50</p>
              <p>11-Oct</p>
              <p>Dibrugarh ASTC</p>
            </div>
            <div>
              <p className="text-bold">
                <i className="material-icons">star</i>4.0
              </p>
            </div>
            <div>
              <p className="text-bold">INR 857.14</p>
            </div>
            <div>
              <br />
              <p>42 Seats Available</p>
              <p>8 Single</p>
              <br />
              <br />
              <button onClick={handleVisible}>VIEW SEATS</button>
            </div>
          </div>
         {!visibility && <SeatPlan />}
        </div>
      </section>
      {passengerVisibility && <PassengerDetails />}
    </main>
  );
};

export default Buses;
