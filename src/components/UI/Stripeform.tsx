/* eslint-disable react/jsx-sort-props */
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { toast } from "sonner";

export const StripePaymentForm = ({
  onPaymentStatusChange,
}: {
  onPaymentStatusChange: (status: string) => void;
}) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      toast.error("Stripe is not initialized.");

      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      toast.error("Card element is not loaded.");

      return;
    }

    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      toast.error("Payment failed. Please check your card details.");
      onPaymentStatusChange("PENDING"); // Notify parent component
    } else {
      toast.success("Payment is Successful");
      onPaymentStatusChange("COMPLETED"); // Notify parent component
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded-md">
      <h3 className="text-lg font-semibold mb-2">Card Details</h3>
      <CardElement className="border p-2 rounded" />
      <button
        type="submit"
        disabled={!stripe}
        className="bg-purple-500 text-white px-4 py-2 mt-4 rounded hover:bg-purple-600"
      >
        Pay Now
      </button>
    </form>
  );
};
