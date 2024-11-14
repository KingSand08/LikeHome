import CheckoutInfo from "@/components/checkout/CheckoutInfo";

export default function PaymentPage() {
  return (
    <main className="max-w-xl mx-auto p-10 text-white text-center border m-10 rounded-md bg-gradient-to-tr from-teal-500 to-purple-500">
      <CheckoutInfo pricePerDay={100} numberOfDays={1} />
    </main>
  );
}
