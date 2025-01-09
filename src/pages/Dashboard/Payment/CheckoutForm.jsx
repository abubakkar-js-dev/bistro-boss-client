import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCarts from "../../../hooks/useCarts";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckoutForm = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const axiosSecure = useAxiosSecure();
  const [transactionId, setTransactionId] = useState("");

  const stripe = useStripe();
  const elements = useElements();
  const { carts,refetch } = useCarts();
  const totalPrice = carts.reduce((total, item) => total + item.price, 0);

  console.log(typeof totalPrice);

  useEffect(() => {
    if(totalPrice > 0){
      axiosSecure
      .post("/create-payment-intent", { price: parseFloat(totalPrice) })
      .then((res) => {
        console.log(res.data);
        setClientSecret(res.data.clientSecret);
      });
    }
  }, [axiosSecure, totalPrice]);

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

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || "anonymous",
            email: user?.email || "anonymous",
          },
        },
      });
    if (confirmError) {
      console.log(confirmError);
      setError(confirmError.message);
    } else {
      console.log("payment intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        console.log("transaction id", paymentIntent.id);
        setTransactionId(paymentIntent.id);
        setError("");
        // payment
        const payment = {
          email: user?.email,
          price: parseFloat(totalPrice),
          transactionId: paymentIntent.id,
          date: new Date(), // utc date convert with date-fns
          cartIds: carts.map((item) => item._id),
          menuIds: carts.map((item) => item.menu_id),
          status: "pending",
        };
        const res = await axiosSecure.post("/payments", payment);
        console.log(res.data);
        if (res?.data?.paymentResult?.insertedId){
          // todo: clear the cart
          refetch();
          // todo: display payment success swal
          Swal.fire({
            title: "Payment Success",
            text: "Your payment has been successfully processed",
            icon: "success",
            confirmButtonText: "OK",
          });
          navigate("/dashboard/payment-history");
        }
      }
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
      {transactionId && (
        <p className="text-green-500 mt-4">Transaction ID: {transactionId} </p>
      )}
    </form>
  );
};

export default CheckoutForm;
