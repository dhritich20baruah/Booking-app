import React, {useState} from "react";
import logo from "../Images/redbuslogo2.jpg";
import axios from "axios";
import { CardNumberElement, CardCvcElement, CardExpiryElement, useStripe, useElements } from "@stripe/react-stripe-js";


const Payments = () => {
  const [success, setSuccess] = useState(false)
    const stripe = useStripe()
    const elements = useElements()

    const handleSubmit = async (e) =>{
      e.preventDefault()
      const {error, paymentMethod} = await stripe.createPaymentMethod({
          type: "card",
          card: elements.getElement(CardCvcElement, CardExpiryElement, CardNumberElement)
      })

      if(!error){
          try {
              const {id} = paymentMethod
              const response = await axios.post("http://localhost:4000/payment", {
                  amount: 10000,
                  id
              })

              if(response.data.success){
                  console.log("Successful Payment")
                  setSuccess(true)
              }

          } catch (error) {
              console.log("Error", error)
          }
      }else {
          console.log(error.message)
      }
  }

  return (
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
            origin <i className="material-icons mx-3">arrow_forward</i>{" "}
            destination
          </li>
          <li className="flex">
            Please pay within <i className="material-icons mx-2">alarm</i> timer
          </li>
        </ul>
      </div>
      <div className="main flex">
        <div className="payment-options w-[60%] p-10">
        {!success ? 
        <form onSubmit={handleSubmit}>
            <fieldset className='FormGroup'>
                <div className="FormRow">
                    <CardNumberElement options={CARD_OPTIONS} />
                </div>
            </fieldset>
            <fieldset className='FormGroup'>
                <div className="FormRow">
                    <CardExpiryElement options={CARD_OPTIONS} />
                </div>
            </fieldset>
            <fieldset className='FormGroup'>
                <div className="FormRow">
                    <CardCvcElement options={CARD_OPTIONS} />
                </div>
            </fieldset>
            <button>Pay</button>
        </form>
        :
        <div className="payment-success">
            <h2>Payment successful</h2>
            <h3 className='Thank-you'>Thank you for your patronage</h3>
        </div>
    }
        </div>
        <div className="passenger-info w-[40%] m-10">
          <div className="shadow-lg shadow-black">
            <h1 className="text-red-500 font-bold text-xl p-5">Bus name</h1>
            <hr />
            <div className="departure my-4 flex justify-between">
              <div className="flex">
                <div className="p-3">
                  <i className="material-icons mx-3 text-red-500">event</i>
                </div>
                <div>
                  <h2>Departure</h2>
                  <h3 className="text-lg font-semibold">doj start_time</h3>
                </div>
              </div>
              <div className="px-5 text-right">
                <h2>Seats</h2>
                <h3 className="text-lg font-semibold">seatNo</h3>
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
                  <h3 className="text-lg font-semibold">origin</h3>
                </div>
              </div>
              <div className="px-5 text-right">
                <h2>Dropping Point</h2>
                <h3 className="text-lg font-semibold">destination</h3>
              </div>
            </div>
            <hr />
            <div className="passenger bg-red-500">
             <p className="flex font-semibold text-md py-5 px-4 text-yellow-300"><i className="material-icons mx-4">account_circle</i>Passenger Name</p> 
            </div>
          </div>
          <div className="shadow-lg shadow-black my-5 p-4 space-y-4">
            <h1 className="text-red-500 text-xl font-bold px-4">FARE BREAKUP</h1>
            <ul className="flex justify-between px-4 text-xl">
                <li>Onward Fare</li>
                <li>INR 1021</li>
            </ul>
            <ul className="flex justify-between px-4 text-xl font-bold">
                <li>Total Payable</li>
                <li>INR 1021</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payments;
