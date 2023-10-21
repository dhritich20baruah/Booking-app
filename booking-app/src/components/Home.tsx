import { useState } from "react";
import { useRecoilState } from "recoil"
import { originState } from "../recoil/atom/JourneyAtom";
import { destinationState } from "../recoil/atom/JourneyAtom";
import logo from "../Images/redbuslogo2.jpg";
import blackLogo from "../Images/redbusblack.png";
import ride from "../Images/ride.jpg";
import train from "../Images/train.jpg";

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

  const [places, setPlaces] = useState<string>("");
  const [filteredStoppages, setFilteredStoppages] = useState<string[]>([]);
  const [origin, setOrigin] = useRecoilState<string>(originState);
  const [destination, setDestination] = useRecoilState<string>(destinationState);
  const [doj, setDoj] = useState<string>("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query: string = e.target.value;
    setPlaces(query);
    const filteredResult: string[] = stoppages.filter((stopp) =>
      stopp.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredStoppages(filteredResult);
  };

  const getOrigin = (stopp: string) => {
    setPlaces(stopp)
    setOrigin((prevOrigin)=>{
      if(prevOrigin !== stopp){
        return stopp;
      }
      else{
        return prevOrigin
      }
    })
  }
  return (
    <div className="bg-red-400">
      <nav className="homeNav flex justify-between">
        <img src={logo} alt="" id="mainLogo" className="w-10"/>
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
          <div id="origin">
          <input
            type="text"
            name="from"
            id="origin-search"
            value={places}
            onChange={handleSearch}
          /> 
          {places && (
            <ul id="fromList">
              {filteredStoppages.map((stopp, index) => (
                <li key={index} onClick={()=>getOrigin(stopp)} className="filteredStops">{stopp}</li>
              ))}
            </ul>
          )}
        </div>
          <input
            type="text"
            name="to"
            id="to"
            value={destination}
            onChange={handleSearch}
          />
          <input
            type="date"
            name="doj"
            id="doj"
            onChange={(event) => setDoj(event.target.value)}
          />
          <button type="submit">SEARCH BUSES</button>
        </form>
       
      </div>
    </div>
  );
};

export default Home;
