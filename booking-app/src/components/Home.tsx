import React from "react";
import logo from "../Images/redbuslogo2.jpg";
import blackLogo from "../Images/redbusblack.png";
import ride from "../Images/ride.jpg";
import train from "../Images/train.jpg";
import "../App.css";

const Home = () => {
  return (
    <div>
      <nav className="homeNav">
        <img src={logo} alt="" id="mainLogo"/>
        <ul id="services-nav">
          <li>
            <div>
              <img src={blackLogo} alt="" />
              <p>Bus Tickets</p>
            </div>
          </li>
          <li>
            <div>
              <img src={ride} alt="" />
              <p>Cab Rental</p>
            </div>
          </li>
          <li>
            <div>
              <img src={train} alt="" />
              <p>Train Tickets</p>
            </div>
          </li>
        </ul>
        <ul id="help-nav">
          <li><i className="material-icons">headset_mic</i> Help</li>
          <li><i className="material-icons">account_circle</i> My Account</li>
        </ul>
      </nav>
      <div id="main">
        <form action="" method="post" id="searchBus">
            <input type="text" name="from" id="from" />
            <input type="text" name="to" id="to" />
            <input type="date" name="doj" id="doj" />
            <button type="submit">SEARCH BUSES</button>
        </form>
      </div>
    </div>
  );
};

export default Home;
