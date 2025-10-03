import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { IEvent } from "@/lib/database/models/event.model";

import { loadStripe } from '@stripe/stripe-js';
import { checkoutOrder } from "@/lib/actions/order.actions";

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const Checkout = ({event, userId}: {event: IEvent, userId: string}) => {

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get('success')) {
      console.log('Order placed! You will receive an email confirmation.');
    }

    if (query.get('canceled')) {
      console.log("Order canceled -- continue to shop around and checkout when you're ready.");
    }
  }, []);
  
  const onCheckout = async () => {
    const order = {
      eventTitle: event.title,
      eventId: event._id,
      price: event.price,
      isFree: event.isFree,
      buyerId: userId
    }

    await checkoutOrder(order);
  };
  
  return (
    <form action={onCheckout} method="post">
      <Button 
        type="submit" 
        role="link" 
        size="lg" 
        className="button sm:w-fit rounded-full bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all font-semibold"
      >
        {event.isFree ? 'Get Ticket' : 'Buy Ticket'}
      </Button>
    </form>
  );
};

export default Checkout;