import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { StripeCardElement } from "@stripe/stripe-js";
import axios from "axios";

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

type props = {
  formData: passengerData[];
  recordID: Array<string>;
  totalFare: number;
};

const CheckoutForm: React.FC<props> = ({ formData, recordID, totalFare }) => {
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement) as StripeCardElement;

    if (!cardElement) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await axios.post(
          "http://localhost:3000/create-payment-intent",
          {
            amount: totalFare,
            id,
            recordID,
          }
        );
        if (response.data.success) {
          console.log("Successful payment");
          setSuccess(true);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("PaymentMethod", paymentMethod);
    }
  };

  return (
    <>
      {!success ? (
        <form onSubmit={handleSubmit}>
          <CardElement />
          <button
            type="submit"
            disabled={!stripe}
            className="px-2 py-1 bg-red-700 text-white font-semibold hover:cursor-pointer hover:bg-orange-700 m-5"
          >
            Pay
          </button>
        </form>
      ) : (
        <div className="border-2 border-black rounded-md shadow-lg shadow-black p-5">
          <h1 className="text-center text-lg font-bold">Your Ticket</h1>
          {formData.map((items: any, index: number) => {
            return (
              <div className="flex justify-between my-3" key={index}>
                <p>
                  Passenger {index + 1}:{" "}
                  <span className="font-semibold text-lg">
                    {items.passenger_name}
                  </span>
                </p>
                <p>
                  Contact No.{" "}
                  <span className="font-semibold text-lg">
                    {items.mobile_no}
                  </span>
                </p>
                <p>
                  Seat No.{" "}
                  <span className="font-bold text-lg">{items.seat_no}</span>
                </p>
              </div>
            );
          })}
          <hr />
          <div className="flex justify-between">
            <p className="font-bold text-lg">{formData[0].busName}</p>
            <p className="font-bold text-lg">
              {formData[0].origin} --&gt; {formData[0].destination}
            </p>
            <p>
              Pick Up Time:{" "}
              <span className="font-bold text-lg">
                {formData[0].start_time} HRS
              </span>
            </p>
          </div>
          <p className="font-bold text-lg">Total Fare: INR {totalFare}/-</p>
          <p className="text-sm">
            **Please reach your pick up point atleast 15mins before departure.
          </p>
        </div>
      )}
    </>
  );
};
export default CheckoutForm;
