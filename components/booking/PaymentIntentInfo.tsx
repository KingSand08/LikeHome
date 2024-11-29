import { getStripePaymentIDInfo } from "@/server-actions/stripe-actions";
import { useEffect, useState } from "react";

interface StripePaymentIDInfoProps {
  stripePaymentID: string;
}

interface PaymentIntentInfo {
  id: string | null;
  amount: number | null;
  currency: string | null;
  status: string | null;
  // Add other fields you are interested in displaying
}

const StripePaymentIDInfo: React.FC<StripePaymentIDInfoProps> = ({
  stripePaymentID,
}) => {
  const [paymentInfo, setPaymentInfo] = useState<PaymentIntentInfo>({
    id: null,
    amount: null,
    currency: null,
    status: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getStripePaymentIDInfo(stripePaymentID)
      .then((result) => {
        if (result.success && result.paymentIntent) {
          setPaymentInfo({
            id: result.paymentIntent.id || null,
            amount: result.paymentIntent.amount || null,
            currency: result.paymentIntent.currency || null,
            status: result.paymentIntent.status || null,
            // Map other fields as needed
          });
          setError(null);
        } else {
          setError(result.error);
        }
      })
      .catch((err) => {
        setError("Failed to fetch payment intent info");
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, [stripePaymentID]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <div>
        <p>ID: {paymentInfo.id || "Not available"}</p>
        <p>
          Amount:{" "}
          {paymentInfo.amount !== null
            ? `${(paymentInfo.amount / 100).toFixed(
                2
              )} ${paymentInfo.currency?.toUpperCase()}`
            : "Not available"}
        </p>
        <p>Status: {paymentInfo.status || "Not available"}</p>
        {/* Display other fields as needed */}
      </div>
    </div>
  );
};

export default StripePaymentIDInfo;
