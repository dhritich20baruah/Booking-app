import React, { useState } from "react";
import logo from "../Images/redbuslogo2.jpg";
import blackLogo from "../Images/redbusblack.png";
import ride from "../Images/ride.jpg";
import train from "../Images/train.jpg";
import "../App.css";

const Home = () => {
  const stoppages = [
    "Goalpara",
    "Guwahati",
    "Nagaon",
    "Bokakhat",
    "Jorhat",
    "Sivsagar",
    "Dibrugarh",
    "Tinsukia",
    "Saikhowa",
  ];
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [doj, setDoj] = useState("");
  const [filteredStoppages, setFilteredStoppages] = useState(stoppages);

  const handleSearch = (e: any) => {
    const query = e.target.value;
    setFrom(query);

    const filteredResult = stoppages.filter((stopp) =>
      stopp.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredStoppages(filteredResult);
  };
  return (
    <div>
      <nav className="homeNav">
        <img src={logo} alt="" id="mainLogo" />
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
          <li>
            <i className="material-icons">headset_mic</i> Help
          </li>
          <li>
            <i className="material-icons">account_circle</i> My Account
          </li>
        </ul>
      </nav>
      <div id="main">
        <form action="" method="post" id="searchBus">
          <input
            type="text"
            name="from"
            id="from"
            value={from}
            onChange={handleSearch}
          />
          <input
            type="text"
            name="to"
            id="to"
            onChange={(event) => setTo(event.target.value)}
          />
          <input
            type="date"
            name="doj"
            id="doj"
            onChange={(event) => setDoj(event.target.value)}
          />
          <button type="submit">SEARCH BUSES</button>
        </form>
        <div>
          {from && (
            <ul id="fromList">
              {filteredStoppages.map((stopp, index) => (
                <li key={index}>{stopp}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
