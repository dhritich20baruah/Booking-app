import { useRecoilState } from "recoil";
import { passengerVisibilitySelector } from "../recoil/selectors/VisibilitySelectors";
import { useState } from "react";
import axios from "axios";
import Payments from "./Payments";

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
  age: string;
};

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
  const [paymentsDisplay, setPaymentsDisplay] = useState(false);

  const handlePassengerVisible = () => {
    setPassengerVisibility((prevValue) => !prevValue);
  };

  const handlePaymentsDisplay = () => {
    setPaymentsDisplay((paymentsDisplay) => !paymentsDisplay);
  };

  const [formData, setFormData] = useState<passengerFormData[]>(
    seatNos.map((seatNo: string)=>({
      doj,
      origin,
      destination,
      busName,
      stoppages,
      start_time,
      fare,
      passenger_name: '',
      seat_no: seatNo, 
      mobile_no: '',
      email: '',
      age: '',
    }))
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    const newFormData = [...formData];
    newFormData[index] = { ...newFormData[index], [name]: value };
    setFormData(newFormData);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    try {
      await axios.post(
        "http://localhost:3000/bookseat",
        formData
      );
      handlePaymentsDisplay()
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
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
                    Seat No.:{" "}
                    <span className="font-bold">
                      <input type="text" name="seat_no" value={formData[index].seat_no} onChange={(e) => handleInputChange(e, index)} />
                    </span>
                  </div>
                  <label htmlFor="Name">
                    Name <br />
                    <input
                      type="text"
                      name="passenger_name"
                      onChange={(e) => handleInputChange(e, index)}
                      id="Name"
                      className="w-[90%] border-2 border-gray-500 p-2 mx-2 outline-none"
                      required
                    />
                  </label>
                  <label htmlFor="Age">
                    Age <br />
                    <input
                      type="text"
                      name="age"
                      onChange={(e) => handleInputChange(e, index)}
                      id="age"
                      className="w-[50%] border-2 border-gray-500 p-2 mx-2 outline-none"
                      required
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
                      onChange={(e) => handleInputChange(e, index)}
                      id="email"
                      className="w-[90%] border-2 border-gray-500 p-2 mx-2 outline-none"
                      required
                    />
                  </label>
                  <br />
                  <label htmlFor="Phone">
                    {" "}
                    Phone <br />
                    <input
                      type="phone"
                      name="mobile_no"
                      onChange={(e) => handleInputChange(e, index)}
                      id="mobile_no"
                      className="w-[90%] border-2 border-gray-500 p-2 mx-2 outline-none"
                      required
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
    <div>
    {paymentsDisplay && <Payments formData={formData}/>}
    </div>
    </>
  );
};

export default PassengerDetails;
