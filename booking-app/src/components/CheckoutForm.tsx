import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { StripeCardElement } from "@stripe/stripe-js";

const CheckoutForm: React.FC  = () => {
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

        if(error){
            console.error('Error', error)
        } else {
            console.log('PaymentMethod', paymentMethod)
        }

    }

    return(
        <form onSubmit={handleSubmit}>
        <CardElement />
        <button type="submit" disabled={!stripe} className="px-2 py-1 bg-red-700 text-white font-semibold hover:cursor-pointer hover:bg-orange-700 m-5">
          Pay
        </button>
      </form>
    )
}
export default CheckoutForm;
