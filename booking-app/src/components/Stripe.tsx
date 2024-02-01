import React from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
const stripePromise = loadStripe("pk_test_51LjHWKJ")
import Payments from './Payments'
const Stripe = () => {
  return (
    <Elements stripe={stripePromise}>
        <Payments/>
    </Elements>
  )
}

export default Stripe