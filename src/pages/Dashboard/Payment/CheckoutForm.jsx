import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCarts from "../../../hooks/useCarts";

const CheckoutForm = () => {
  const [error, setError] = useState("");
  const [clientSecret,setClientSecret] = useState("");
  const axiosSecure = useAxiosSecure();

  const stripe = useStripe();
  const elements = useElements();
  const {carts} = useCarts();
  const totalPrice = carts.reduce((total,item)=>total+item.price,0);

useEffect(()=>{
    axiosSecure.post("/create-payment-intent",{price:totalPrice})
    .then(res=>{
        console.log(res.data);
        setClientSecret(res.data.clientSecret);
      })
},[axiosSecure, totalPrice])


  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log(error);
      setError(error.message);
    } else {
      console.log(paymentMethod);
      setError("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        className="bg-gray-200 rounded-lg p-4 border border-gray-300"
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button
        className="btn btn-primary px-4 py-2 mt-4"
        type="submit"
        disabled={!stripe || !clientSecret}
      >
        Pay
      </button>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </form>
  );
};

export default CheckoutForm;
