import React from "react";
import redLogo from "../Images/redbuslogo.jpg";
import SeatPlan from "./SeatPlan";
import PassengerDetails from "./PassengerDetails";
const Buses = () => {
  return (
    <main id="buses">
      <nav id="busesNav">
        <ul>
          <li>
            <img src={redLogo} alt="" />
          </li>
          <li>BUS TICKETS</li>
          <li>rYde</li>
          <li>redRail</li>
        </ul>
        <ul>
          <li>Help</li>
          <li>
            Manage Booking <i className="material-icons">expand_more</i>
          </li>
          <li>
            <i className="material-icons">account_circle</i>{" "}
            <i className="material-icons">expand_more</i>
          </li>
        </ul>
      </nav>
      <p id="busRoute">
        <strong>Home</strong> &gt; Bus TIckets &gt; Guwahati To Dibrugarh Bus
        &gt;
      </p>
      <hr />
      <p id="travelPlan">
        {" "}
        Guwahati <i className="material-icons">arrow_forward</i> Dibrugarh{" "}
        <i className="material-icons">chevron_left</i>10 Oct Tue{" "}
        <i className="material-icons">chevron_right</i>
        <button>Modify</button>
      </p>
      <hr />
      <section id="busSelection">
        <div id="filters">
          <p>FILTERS</p>
          <ul>
            <li>Live Tracking</li>
            <li>Primo Bus</li>
          </ul>
          <p>DEPARTURE TIME</p>
          <ul>
            <li>
              <input type="checkbox" name="before6am" id="before6am" />
              Before 6 am
            </li>
            <li>
              <input type="checkbox" name="6am-12pm" id="6am-12pm" />6 am to 12
              pm
            </li>
            <li>
              <input type="checkbox" name="12pm-6pm" id="12pm-6pm" />
              12 pm to 6 pm
            </li>
            <li>
              <input type="checkbox" name="after6pm" id="after6pm" />
              After 6 pm
            </li>
          </ul>
          <p>ARRIVAL TIME</p>
          <ul>
            <li>
              <input type="checkbox" name="before6am" id="before6am" />
              Before 6 am
            </li>
            <li>
              <input type="checkbox" name="6am-12pm" id="6am-12pm" />6 am to 12
              pm
            </li>
            <li>
              <input type="checkbox" name="12pm-6pm" id="12pm-6pm" />
              12 pm to 6 pm
            </li>
            <li>
              <input type="checkbox" name="after6pm" id="after6pm" />
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
                <br /><br />
                <button>VIEW SEATS</button>
            </div>
          </div>
          <SeatPlan/>
        </div>
      </section>
      <div id="passengerDetails">
      <PassengerDetails/>
      </div>
    </main>
  );
};

export default Buses;
