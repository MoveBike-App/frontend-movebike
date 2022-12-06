import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { createReserve } from "../services/reserves/reserve";
import { useRouter } from 'next/router'

export default function CheckoutForm({
  vehicle,
  price,
  clientSecret,
  initialDate,
  finalDate,
  totalDays,
  token,
}) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [statusPayment, setStatusPayment] = useState("");
  const [idReserve, setIdReserve] = useState()

  useEffect(() => {
    if (!stripe) {
      return;
    }

    // const clientSecret = new URLSearchParams(window.location.search).get(
    //   "payment_intent_client_secret"
    // );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("¡Pago realizado exitosamente!");
          setStatusPayment("succeeded");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          setStatusPayment("succeeded");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          setStatusPayment("requires_payment_method");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe, clientSecret]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);
    //let idReserve = "";

    const response = await stripe.confirmPayment({
      elements,
      //redirect: "if_required",
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `http://localhost:3000/thanks?token=${token}&idReserve=${idReserve}`,
      },
    });

    if (response?.paymentIntent?.amount !== price) {
      console.error(
        "Amount mismatch",
        response?.paymentIntent?.amount,
        "does not equal",
        price,
        "\n\nFull response:\n\n",
        response
      );
    }

    setIsLoading(false);

    const { error } = response;

    if (error) {
      if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message);
      }
    } else {
      setMessage("An unexpected error occurred.");
    }

    if (error) {
      setMessage(error.message);
    } else {
      const cartStorage = JSON.parse(localStorage.getItem("cartCurrent"));
      if (cartStorage) {
        const data = {
          vehicle: vehicle,
          totalPrice: price / 100,
          initialDate: initialDate,
          finalDate: finalDate,
          totalDays: totalDays,
          isPaid: true
        }

        const respReserve = await createReserve(data, token);
        const dataJson = await respReserve.json()
        setIdReserve(dataJson.data._id)
        localStorage.removeItem("cartCurrent");
      }
    }



    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <button disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pagar ahora"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
