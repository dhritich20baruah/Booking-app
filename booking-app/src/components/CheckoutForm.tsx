import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { StripeCardElement } from "@stripe/stripe-js";
import axios from "axios";

const CheckoutForm: React.FC  = () => {
    const [success, setSuccess] = useState(false) 
    const stripe = useStripe()
    const elements = useElements()

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if(!stripe || !elements){
            return;
        }

        const cardElement = elements.getElement(CardElement) as StripeCardElement

        if(!cardElement){
            return
        }
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement
        })

        if(!error){
            try {
                const {id} = paymentMethod
                const response = await axios.post("http://localhost:3000/create-payment-intent", {
                    amount: 100, 
                    id
                })
                if(response.data.success){
                    console.log("Successful payment")
                    setSuccess(true)
                }
            } catch (error) {
                console.log(error)
            }
        } else {
            console.log('PaymentMethod', paymentMethod)
        }

    }

    return(
        <>
        {!success ? 
        <form onSubmit={handleSubmit}>
        <CardElement />
        <button type="submit" disabled={!stripe} className="px-2 py-1 bg-red-700 text-white font-semibold hover:cursor-pointer hover:bg-orange-700 m-5">
          Pay
        </button>
      </form>
        :
        <div>
            <p>TICKET BOOKED</p>
        </div>
        }
      </>
    )
}
export default CheckoutForm;
