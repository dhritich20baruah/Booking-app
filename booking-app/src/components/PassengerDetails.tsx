import { useRecoilState } from "recoil";
import { passengerVisibilitySelector } from "../recoil/selectors/VisibilitySelectors";
import { useState } from "react";
import axios from "axios";

type passengerObj = {
  origin: string;
  destination: string;
  doj: string;
  busName: string;
  total_seats: number;
  stoppages: Array<string>;
  start_time: string;
  fare: number;
  seatNos: Array<string>;
};

const PassengerDetails: React.FC<passengerObj> = ({
  origin,
  destination,
  doj,
  busName,
  total_seats,
  stoppages,
  start_time,
  fare,
  seatNos,
}) => {
  const [, setPassengerVisibility] = useRecoilState(
    passengerVisibilitySelector
  );

  const [passengerObj, setPassengerObj] = useState({
    doj: doj,
    origin: origin,
    destination: destination,
    busName: busName,
    total_seats: total_seats,
    stoppages: stoppages,
    start_time: start_time,
    fare: fare,
    seat: [
      { passenger_name: "", seat_no: "", mobile_no: "", email: "", age: "" },
    ],
  });

  const handlePassengerVisible = () => {
    setPassengerVisibility((prevValue) => !prevValue);
  };

  // const bookSeat = async () => {
  //   const passengerObj = [
  //     {
  //       passenger_name: passengerName,
  //       seat_no: seatNos,
  //       mobile_no: mobileNo,
  //       email: email,
  //       age: age,
  //     },
  //   ];
  //   const seatObj = {
  //     doj: doj,
  //     origin: origin,
  //     destination: destination,
  //     total_seats: total_seats,
  //     stoppages: stoppages,
  //     start_time: start_time,
  //     fare: fare,
  //     seatNos: seatNos,
  //     seat: [...passengerObj],
  //   };
  //   console.log(seatObj);
  // };

  // Define a function to handle form field changes
  // const handleInputChange = (
  //   e: React.ChangeEvent<
  //     HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  //   >,
  //   index?: number
  // ) => {
  //   const { name, value } = e.target;
  //   if (index !== undefined) {
  //     const newSeat = [...passengerObj.seat];
  //     newSeat[index][name] = value;
  //     setPassengerObj({ ...passengerObj, seat: newSeat });
  //   } else {
  //     setPassengerObj({ ...passengerObj, [name]: value });
  //   }
  // };

  // Define a function to handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      // Construct the data object containing passenger details
      const setPassengerObj = {
        ...passengerObj,
        seat: [...passengerObj.seat, { passenger_name: "", seat_no: "", mobile_no: "", email: "", age: "" }],
      };

      // Make a POST request to the server
      const response = await axios.post("http://localhost:3000/bookSeat", passengerObj);

      // Handle the response accordingly
      console.log("Passenger data saved successfully:", response.data);
      // Optionally, reset the form or show a success message
    } catch (error) {
      console.error("Error saving passenger data:", error);
      // Optionally, display an error message to the user
    }
  };

  // Define a function to add a new passenger field
  // const addPassenger = () => {
  //   setFormData({
  //     ...formData,
  //     seat: [
  //       ...formData.seat,
  //       { passenger_name: "", seat_no: "", mobile_no: "", email: "", age: "" },
  //     ],
  //   });
  // };

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
                  Seat No.: <span className="font-bold"><input type="text" value={items} /></span>
                </div>
                <label htmlFor="Name">
                  Name <br />
                  <input
                    type="text"
                    name="Name"
                    id="Name"
                    className="w-[90%] border-2 border-gray-500 p-2 mx-2 outline-none"
                  />
                </label>
                <label htmlFor="Age">
                  Age <br />
                  <input
                    type="text"
                    name="Age"
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
