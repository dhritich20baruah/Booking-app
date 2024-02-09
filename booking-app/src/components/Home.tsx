import { useState } from "react";
import { useRecoilState } from "recoil";
import { originState } from "../recoil/atom/JourneyAtom";
import { destinationState } from "../recoil/atom/JourneyAtom";
import { dojState } from "../recoil/atom/JourneyAtom";
import logo from "../Images/redbuslogo2.jpg";
import blackLogo from "../Images/redbusblack.png";
import ride from "../Images/ride.jpg";
import train from "../Images/train.jpg";
import axios from "axios";
import Buses from "./Buses";

const Home = () => {
  const stoppages: string[] = [
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

  type BusDetails = {
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

  const [places, setPlaces] = useState<string>("");
  const [filteredOrigins, setFilteredOrigins] = useState<string[]>([]);
  const [origin, setOrigin] = useRecoilState<string>(originState);

  const [stops, setStops] = useState<string>("");
  const [filteredDestinations, setFilteredDestination] = useState<string[]>([]);
  const [destination, setDestination] = useRecoilState<string>(destinationState);
  const [busList, setBusList] = useState<BusDetails[]>([]);

  const [doj, setDoj] = useRecoilState<string>(dojState);

  const [busDisplay, setBusDisplay] = useState(true);

  
  const handleVisible = () => {
    setBusDisplay(busDisplay => !busDisplay);
  };

  const getOrigin = (stopp: string) => {
    setPlaces(stopp);
    setOrigin((prevOrigin) => {
      if (prevOrigin !== stopp) {
        return stopp;
      } else {
        return prevOrigin;
      }
    });
  };

  const handleSearchOrigin = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query: string = e.target.value;
    setPlaces(query);
    const filteredResult: string[] = stoppages.filter((stopp) =>
      stopp.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredOrigins(filteredResult);
  };

  const getDestination = (stopp: string) => {
    setStops(stopp);
    setDestination((prevDestination) => {
      if (prevDestination !== stopp) {
        return stopp;
      } else {
        return prevDestination;
      }
    });
  };

  //Function for drop down
  const handleSearchDestination = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query: string = e.target.value;
    setStops(query);
    const filteredDestinations: string[] = stoppages.filter((stopp) =>
      stopp.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredDestination(filteredDestinations);
  };

  //Search buses
  async function searchBuses() {
    const searchObj = {
      origin,
      destination,
      doj,
    };
    handleVisible()
    try {
      const busArr = await axios.post(
        "http://localhost:3000/getBus",
        searchObj
      );
      setBusList(busArr.data.buses)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="home-page">
      {busDisplay ?
      (
      <div>
      <nav className="homeNav flex justify-between">
        <img
          src={logo}
          alt=""
          id="mainLogo"
          className="w-[5em] h-[3em] my-auto mx-[2em] pr-[2em]"
        />
        <ul id="services-nav" className="flex justify-between">
          <li>
            <div className="text-center my-auto mx-5 py-[0.5em] px-[1em] rounded-md hover:cursor-pointer hover:bg-slate-300">
              <img src={blackLogo} alt="" className="w-[3em] h-[2em] mx-auto" />
              <p>Bus Tickets</p>
            </div>
          </li>
          <li>
            <div className="text-center my-auto mx-5 py-[0.5em] px-[1em] rounded-md hover:cursor-pointer hover:bg-slate-300">
              <img src={ride} alt="" className="w-[3em] h-[2em] mx-auto" />
              <p>Cab Rental</p>
            </div>
          </li>
          <li>
            <div className="text-center my-auto mx-5 py-[0.5em] px-[1em] rounded-md hover:cursor-pointer hover:bg-slate-300">
              <img src={train} alt="" className="w-[3em] h-[2em] mx-auto" />
              <p>Train Tickets</p>
            </div>
          </li>
        </ul>
        <ul id="help-nav" className="flex justify-between my-auto mx-[1em]">
          <li className="flex items-center mx-[1em] py-[0.5em] px-[1em] rounded-md">
            <i className="material-icons">headset_mic</i> Help
          </li>
          <li className="flex items-center mx-[1em] py-[0.5em] px-[1em] rounded-md">
            <i className="material-icons">account_circle</i> My Account
          </li>
        </ul>
      </nav>
      <div id="main">
        <form
          action=""
          method="post"
          id="searchBus"
          className="absolute top-[30%] left-[68%] translate-x-[-50%] translate-y-[-68%] w-[100vw] flex"
          onSubmit={(e) => {
            e.preventDefault();
            searchBuses();
          }}
        >
          <div id="origin">
            <input
              type="text"
              name="from"
              value={places}
              onChange={handleSearchOrigin}
              className="font-lg p-[2.7em] h-28 font-bold outline-none border-2 border-gray-500 rounded-tl-md rounded-bl-md"
              placeholder="From"
            />
            <div className="absolute bg-white w-56 px-5 py-2">
              {places && (
                <ul id="fromList">
                  {filteredOrigins.map((stopp, index) => (
                    <li
                      key={index}
                      onClick={() => getOrigin(stopp)}
                      className="filteredStops my-2 font-bold text-gray-700 hover:cursor-pointer"
                    >
                      {stopp}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div id="destination">
            <input
              type="text"
              name="to"
              id="to"
              className="font-lg p-[2.7em] h-28 font-bold outline-none border-2 border-gray-500"
              value={stops}
              onChange={handleSearchDestination}
              placeholder="To"
            />
            <div className="absolute bg-white w-56 px-5 py-2">
              {stops && (
                <ul id="fromList">
                  {filteredDestinations.map((stopp, index) => (
                    <li
                      key={index}
                      onClick={() => getDestination(stopp)}
                      className="filteredOrigins my-2 font-bold text-gray-700 hover:cursor-pointer"
                    >
                      {stopp}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <input
            type="date"
            name="doj"
            id="doj"
            className="font-lg p-[2.7em] h-28 font-bold outline-none border-2 border-gray-500"
            onChange={(event) => setDoj(event.target.value)}
          />
          <button
            type="submit"
            className="bg-red-600 font-bold text-lg p-[2.7em] h-28 text-white rounded-tr-md rounded-br-md"
            onClick={searchBuses}
          >
            SEARCH BUSES
          </button>
        </form>
      </div>
      </div>
      )
      :
      <div>
        <Buses busList={busList}/> 
      </div>
      }
    </div>
  );
};

export default Home;
