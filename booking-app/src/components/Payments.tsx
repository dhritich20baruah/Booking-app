import React from "react";
import logo from "../Images/redbuslogo2.jpg";
import CountdownTimer from "./CountdownTimer";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

type passengerData = {
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

type props = { formData: passengerData[], recordID: Array<string> };

const PUBLIC_KEY = "pk_test_51Oh5akSGJj1UMFGk8ivs6pI4dIOO5nCcBGsqyoVt36KY6L75H64NyJesIjf1qjdK29SPBwkypZK45Yc5PS8R8wJ7005GghDSIS"
const stripePromise = loadStripe(PUBLIC_KEY);

const Payments: React.FC<props> = ({ formData, recordID }) => {
  const info = formData[0];
  console.log(recordID)
  return (
    <>
      <div className="z-20 fixed top-0 left-0 w-[100vw] h-[100vh] bg-white">
        <nav className="homeNav flex justify-between">
          <img
            src={logo}
            alt=""
            id="mainLogo"
            className="w-[5em] h-[3em] my-auto mx-[2em] pr-[2em]"
          />
          <ul id="help-nav" className="flex justify-between my-auto mx-[1em]">
            <li className="flex items-center mx-[1em] py-[0.5em] px-[1em] rounded-md">
              <i className="material-icons">headset_mic</i> Help
            </li>
            <li className="flex items-center mx-[1em] py-[0.5em] px-[1em] rounded-md">
              <i className="material-icons">account_circle</i> My Account
            </li>
          </ul>
        </nav>
        <div className="bg-red-500 p-3">
          <ul className="text-yellow-200 flex justify-evenly">
            <li className="flex">
              {info.origin} <i className="material-icons mx-3">arrow_forward</i>{" "}
              {info.destination}
            </li>
            <li className="flex">
              Please pay within <i className="material-icons mx-2">alarm</i>
              {/* <CountdownTimer/> */}
            </li>
          </ul>
        </div>
        <div className="main flex">
          <div className="payment-options w-[60%] p-10">
            <h1 className="text-xl font-bold mb-5">Choose Payment Method</h1>
            <div className="flex flex-col shadow-lg shadow-black p-5 space-y-3 text-lg font-semibold text-gray-800">
              <label
                htmlFor="creditCard"
                className="border-b-2 border-gray-400 pb-2"
              >
                <input type="radio" name="creditCard" id="creditCard" /> Credit
                Card
              </label>
              <label
                htmlFor="debitCard"
                className="border-b-2 border-gray-400 pb-2"
              >
                <input type="radio" name="creditCard" id="debitCard" /> Debit
                Card
              </label>
              <label htmlFor="netBanking">
                <input type="radio" name="netBanking" id="netBanking" /> Net
                Banking
              </label>
            </div>
            <div className="my-10">
              <Elements stripe={stripePromise}>
                <CheckoutForm />
              </Elements>
            </div>
          </div>
          <div className="passenger-info w-[40%] m-10">
            <div className="shadow-lg shadow-black">
              <h1 className="text-red-500 font-bold text-xl p-5">
                {info.busName}
              </h1>
              <hr />
              <div className="departure my-4 flex justify-between">
                <div className="flex">
                  <div className="p-3">
                    <i className="material-icons mx-3 text-red-500">event</i>
                  </div>
                  <div>
                    <h2>Departure</h2>
                    <h3 className="text-lg font-semibold">
                      {info.doj} | {info.start_time}
                    </h3>
                  </div>
                </div>
                <div className="px-5 text-right">
                  <h2>Seats</h2>
                  <h3 className="text-lg font-semibold">
                    {formData.map((item, index) => {
                      return (
                        <ul key={index} className="flex">
                          <li>{item.seat_no}</li>
                        </ul>
                      );
                    })}
                  </h3>
                </div>
              </div>
              <hr />
              <div className="drop-off my-4 flex justify-between">
                <div className="flex">
                  <div className="p-3">
                    <i className="material-icons mx-3 text-red-500">place</i>
                  </div>
                  <div>
                    <h2>Boarding Point</h2>
                    <h3 className="text-lg font-semibold">{info.origin}</h3>
                  </div>
                </div>
                <div className="px-5 text-right">
                  <h2>Dropping Point</h2>
                  <h3 className="text-lg font-semibold">{info.destination}</h3>
                </div>
              </div>
              <hr />
              <div className="passenger bg-red-500">
                <div className="flex font-semibold text-md py-5 px-4 text-yellow-300">
                  <i className="material-icons mx-4">account_circle</i>
                  {formData.map((item, index) => {
                    return (
                      <ul key={index} className="flex">
                        <li className="mx-3">{item.passenger_name}</li>
                      </ul>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="shadow-lg shadow-black my-5 p-4 space-y-4">
              <h1 className="text-red-500 text-xl font-bold px-4">
                FARE BREAKUP
              </h1>
              <ul className="flex justify-between px-4 text-xl">
                <li>Onward Fare</li>
                <li>INR {info.fare * formData.length}</li>
              </ul>
              <ul className="flex justify-between px-4 text-xl font-bold">
                <li>Total Payable</li>
                <li>INR {info.fare * formData.length}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payments;
