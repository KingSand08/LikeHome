"use server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function getStripePaymentIDInfo(stripePaymentID: string) {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(stripePaymentID);
    return { success: true, paymentIntent };
  } catch (error: any) {
    console.error(error);
    return { success: false, error: error.message };
  }
}
