// import { useState } from 'react';
// import { loadStripe, StripeError } from '@stripe/stripe-js';

// const stripePromise = loadStripe('your_stripe_publishable_key');

// const CheckoutForm: React.FC = () => {
//   const [error, setError] = useState<string | null>(null);

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();

//     const stripe = await stripePromise;

//     const { error } = await stripe.redirectToCheckout({
//       lineItems: [{ price: 'price_12345', quantity: 1 }],
//       mode: 'payment',
//       successUrl: 'https://yourwebsite.com/success',
//       cancelUrl: 'https://yourwebsite.com/cancel',
//     });

//     if (error) {
//       setError((error as StripeError).message);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <button type="submit">Pay</button>
//       {error && <div>{error}</div>}
//     </form>
//   );
// };

// export default CheckoutForm;
