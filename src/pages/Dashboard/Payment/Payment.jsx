import { loadStripe } from "@stripe/stripe-js";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const Payment = () => {
    // todo: add publishable key
    const stripePromise = loadStripe("");
    return (
        <div>
            <SectionTitle heading="Payment" subHeading="Please pay for your order" />
            <div className="flex justify-center items-center">
            
            <div className="w-96 h-96 bg-gray-200 rounded-lg">
                <Elements stripe = {stripePromise}>
                    <CheckoutForm />
                </Elements>
            </div>

            </div>
        </div>
    );
};

export default Payment;