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
    <div className="">
      <nav className="homeNav flex justify-between">
        <img src={logo} alt="" id="mainLogo" className="w-[5em] h-[3em] my-auto mx-[2em] pr-[2em]"/>
        <ul id="services-nav" className="flex justify-between">
          <li>
            <div className="text-center my-auto mx-5 py-[0.5em] px-[1em] rounded-md hover:cursor-pointer hover:bg-slate-300">
              <img src={blackLogo} alt="" className="w-[3em] h-[2em] mx-auto"/>
              <p>Bus Tickets</p>
            </div>
          </li>
          <li>
            <div className="text-center my-auto mx-5 py-[0.5em] px-[1em] rounded-md hover:cursor-pointer hover:bg-slate-300">
              <img src={ride} alt="" className="w-[3em] h-[2em] mx-auto"/>
              <p>Cab Rental</p>
            </div>
          </li>
          <li>
            <div className="text-center my-auto mx-5 py-[0.5em] px-[1em] rounded-md hover:cursor-pointer hover:bg-slate-300">
              <img src={train} alt="" className="w-[3em] h-[2em] mx-auto"/>
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
