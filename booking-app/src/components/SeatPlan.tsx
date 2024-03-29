import { useState } from "react";
import PassengerDetails from "./PassengerDetails";

type tripObj = {
  origin: string,
  destination: string,
  doj: string,
  busName: string,
  total_seats: number,
  stoppages: Array<string>,
  start_time: string,
  fare: number,
  bookedArr: Array<string>
}

const SeatPlan: React.FC<tripObj> = ({origin, destination, doj, busName, stoppages, start_time, fare, bookedArr}) => {
  const right = [...Array(24).keys()].map((i) => i + 1);
  const left = Array.from({ length: 48 - 25 + 1 }, (_, index) => 25 + index);
  // const left = Array.from({ length: total_seats - total_seats/2 }, (_, index) => total_seats/2 + index +1);

  const [selectedSeatArr, setSelectedSeatArr] = useState<string[]>([]);

  const [passengerVisibility, setPassengerVisibility] = useState(false);

  const handlePassengerVisible = () => {
    setPassengerVisibility((prevValue) => !prevValue);
  };

  const handleSeatClick = (seatNumber: string) => {
    //Check if the seat is already booked
    if(bookedArr.includes(seatNumber)){
      return
    }
    // Check if the seat is already selected
    const isSelected = selectedSeatArr.includes(seatNumber);

    // If selected, remove from the array; otherwise, add to the array
    setSelectedSeatArr((prevArr) =>
      !isSelected
        ? [...prevArr, seatNumber] : [...prevArr]
    );
  };

  const clearSelection = () => {
    setSelectedSeatArr([])
  }

  return (
    <>
    <section id="seatPlan" className="h-auto bg-gray-300 flex fixed shadow-lg shadow-black top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[80%]">
      <div id="seat-Selection" className="m-20">
        <div
          id="bus"
          className="flex bg-white h-fit border-2 border-black border-l-8"
        >
          <div id="driver" className="w-12 border-r-4 border-black bg-white">
            <i className="material-icons" style={{ margin: "10px" }}>
              adjust
            </i>
          </div>
          <div id="seats" className="p-4 grid grid-rows-2 gap-y-4">
            <div
              id="right"
              className="h-[50%] w-[100%] grid grid-cols-12 gap-x-1"
            >
              {right.map((item) => {
                const isBooked =  bookedArr.includes(String(item))
                const isSelected = selectedSeatArr.includes(String(item))
                return (
                  <div
                  className={`seat w-[2em] h-[2em] border-l-2 border-4 border-black hover:cursor-pointer ${isBooked ? 'bg-red-500' : (isSelected ? 'bg-green-500' : '')}`}
                    key={item}
                    onClick={() => handleSeatClick(String(item))}
                  >
                    {item}
                  </div>
                );
              })}
            </div>
            <div
              id="left"
              className="h-[50%] w-[100%] grid grid-cols-12 gap-x-1"
            >
              {left.map((item) => {
                 const isBooked =  bookedArr.includes(String(item))
                 const isSelected = selectedSeatArr.includes(String(item))
                return (
                  <div
                  className={`seat w-[2em] h-[2em] border-l-2 border-4 border-black hover:cursor-pointer ${isBooked ? 'bg-red-500' : (isSelected ? 'bg-green-500' : '')}`}
                    key={item}
                    onClick={() => handleSeatClick(String(item))}
                  >
                    {item}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div
        id="station"
        className="w-[30%] space-y-2 bg-white p-8 m-12 shadow-lg shadow-black"
      >
        <p>Boarding Point: <span className="font-semibold">{origin}</span></p>  
        <p>Drop Off Point: <span className="font-semibold">{destination}</span></p>  
        <hr />
        <div><p className="font-semibold">Seats: </p>{selectedSeatArr.map((seatNums)=>{return(<span className="font-semibold" key={seatNums}>{seatNums}, </span>)})}</div>
        <button
          onClick={clearSelection}
          className="bg-red-600 p-2 text-white hover:bg-red-700 hover:cursor-pointer"
        >
          CLEAR SELECTION
        </button>
        <p className="font-bold">Total Fare: INR {fare * selectedSeatArr.length}</p>
        { selectedSeatArr.length !==0 ?
        <button
          onClick={handlePassengerVisible}
          className="bg-red-600 p-2 text-white hover:bg-red-700 hover:cursor-pointer"
        >
          CONTINUE
        </button>
        : <button></button>  
      }
      </div>
    </section>
      
    {passengerVisibility &&
    <div>
     <button onClick={handlePassengerVisible} className="top-0 right-0 fixed font-bold p-1 m-3 text-white bg-red-500 hover:cursor-pointer z-30">X</button>
    <PassengerDetails origin={origin} destination={destination} doj={doj} busName={busName} stoppages={stoppages} start_time={start_time} fare={fare} seatNos={selectedSeatArr}/>
    </div>
    }
    </>
  );
};

export default SeatPlan;
