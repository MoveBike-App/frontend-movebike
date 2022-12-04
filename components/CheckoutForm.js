import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { createReserve } from "../services/reserves/reserve";
import { format } from "date-fns";

export default function CheckoutForm({
  vehicle,
  totalPrice,
  clientSecret,
  initialDate,
  finalDate,
  token,
}) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [statusPayment, setStatusPayment] = useState("");

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
        return_url: `http://localhost:3000/thanks?token=${token}`,
      },
    });
    localStorage.setItem("stripe", JSON.stringify(response));

    console.log(response);

    if (response?.paymentIntent?.amount !== totalPrice) {
      console.error(
        "Amount mismatch",
        response?.paymentIntent?.amount,
        "does not equal",
        totalPrice,
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
        const { fechaFinal, fechaInical } = cartStorage;
        const response = await createReserve(
          vehicle,
          totalPrice / 100,
          true,
          fechaInical,
          fechaFinal,
          token
        );
        console.log(response);
        //idReserve = response.data.data._id;
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
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
