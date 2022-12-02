import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function CheckoutCard({price, description, vehicle}) {
  const [clientSecret, setClientSecret] = useState("");
  const [isPrice, setIsPrice] = useState(price)


  const [token, setToken] = useState()

  const getToken = () => {
    const token = localStorage.getItem('token')
    setToken(token)
  }

  useEffect(() => {
    getToken()
  }, [])

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: Number(price),
        description: `Renta de ${description}`
      }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [price]);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="App">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise} key={clientSecret}>
          <CheckoutForm vehicle={vehicle} totalPrice={price} token={token} clientSecret={clientSecret} />
        </Elements>
      )}
    </div>
  );
}