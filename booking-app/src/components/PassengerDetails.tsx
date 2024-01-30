import { useRecoilState } from "recoil";
import { passengerVisibilitySelector } from "../recoil/selectors/VisibilitySelectors";
import { useState } from "react";
import axios from "axios";

type passengerObj = {
  origin: string;
  destination: string;
  doj: string;
  busName: string;
  stoppages: Array<string>;
  start_time: string;
  fare: number;
  seatNos: Array<string>;
};

type passengerFormData = {
  doj: string;
  origin: string;
  destination: string;
  busName: string;
  stoppages: Array<string>;
  start_time: string;
  fare: number;
  passenger_name: string;
  seat_no: string;
  mobile_no: string;
  email: string;
  age: string  
}

const PassengerDetails: React.FC<passengerObj> = ({
  origin,
  destination,
  doj,
  busName,
  stoppages,
  start_time,
  fare,
  seatNos,
}) => {
  const [, setPassengerVisibility] = useRecoilState(
    passengerVisibilitySelector
  );

  const handlePassengerVisible = () => {
    setPassengerVisibility((prevValue) => !prevValue);
  };

  const [formData, setFormData] = useState<passengerFormData[]>(Array(seatNos.length).fill({
    doj: doj,
    origin: origin,
    destination: destination,
    busName: busName,
    stoppages: stoppages,
    start_time: start_time,
    fare: fare,
  }))

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) =>{
    const {name, value} = e.target;
    const newFormData = [...formData];
    newFormData[index] = { ...newFormData[index], [name]: value};
    setFormData(newFormData)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData)
  }
  
  return (
    <div
      id="passengerDetails"
      className="fixed top-0 right-0 bg-white z-10 h-[100%] px-8 py-12 w-[30vw] shadow-lg shadow-black space-y-4 overflow-auto"
    >
      <i
        className="material-icons hover:cursor-pointer"
        onClick={handlePassengerVisible}
      >
        highlight_off
      </i>
      <h2 className="text-xl font-bold">Passenger Details</h2>
      <div className="passenger-info space-y-2">
        <h4 className="text-md font-semibold flex items-center">
          <i className="material-icons">account_circle</i> Passenger Information
        </h4>
        <form onSubmit={handleSubmit}>
        {seatNos.map((items: string, index: number) => {
          return (
            <div className="py-2">
              <div className="space-y-2">
                <p className="mb-2">
                  Passenger <span className="font-bold">{index + 1}</span> 
                </p>
                <div>
                  Seat No.: <span className="font-bold"><input type="text" name="seat_no" value={items}/></span>
                </div>
                <label htmlFor="Name">
                  Name <br />
                  <input
                    type="text"
                    name={`passenger${index}_name`} 
                    onChange={(e)=>handleInputChange(e, index)}
                    id="Name"
                    className="w-[90%] border-2 border-gray-500 p-2 mx-2 outline-none"
                  />
                </label>
                <label htmlFor="Age">
                  Age <br />
                  <input
                    type="text"
                    name="Age" 
                    onChange={(e)=>handleInputChange(e, index)}
                    id="Age"
                    className="w-[50%] border-2 border-gray-500 p-2 mx-2 outline-none"
                  />
                </label>
                <br />
              </div>
              <h4>
                <p className="flex my-2">
                  <i className="material-icons mx-2">email</i> Contact Details
                </p>
              </h4>
              <div>
                <label htmlFor="email">
                  {" "}
                  Email ID <br />
                  <input
                    type="email"
                    name="email"
                    onChange={(e)=>handleInputChange(e, index)}
                    id="email"
                    className="w-[90%] border-2 border-gray-500 p-2 mx-2 outline-none"
                  />
                </label>
                <br />
                <label htmlFor="Phone">
                  {" "}
                  Phone <br />
                  <input
                    type="phone"
                    name="Phone"
                    onChange={(e)=>handleInputChange(e, index)}
                    id="Phone"
                    className="w-[90%] border-2 border-gray-500 p-2 mx-2 outline-none"
                  />
                </label>
              </div>
            </div>
          );
        })}

        <hr />
        <p>
          <strong>Total Amount: INR {fare * seatNos.length}</strong>
        </p>
        <button
          className="bg-red-600 p-2 text-white hover:cursor-pointer hover:bg-red-700"
          type="submit"
        >
          PROCEED TO PAY
        </button>
        </form>
      </div>
    </div>
  );
};

export default PassengerDetails;
