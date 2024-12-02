import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { payment } from "../../api/strip";
import CheckoutForm from "../../components/CheckoutForm";
import useEcomStore from "../../store/ecom-store";

const stripePromise = loadStripe("pk_test_51QI7SkD07pUN951Sdcv8ZbblxEueHfWnEtMbIqUa0vj36o5MSGIJ3Rfduquy8aAewcRIfVURdJ1P4GF1cxV9oW8F000YZs881e");

const Payment = () => {
    const token = useEcomStore((state)=>state.token);
    const [clientSecret, setClientSecret] = useState("");

    useEffect(()=>{
        payment(token)
        .then((res)=>{
            console.log(res)
            setClientSecret(res.data.clientSecret)
        })
        .catch((err)=>{
            console.log(err)
            
        })
    },[])

    const appearance = {
        theme: 'stripe',
      };
      // Enable the skeleton loader UI for optimal loading.
      const loader = 'auto';

    return (
        <div>
            {
                clientSecret && (
                    <Elements options={{clientSecret, appearance, loader}} stripe={stripePromise}>
                        <CheckoutForm />
                    </Elements>
                )
            }
        </div>
    )
}

export default Payment