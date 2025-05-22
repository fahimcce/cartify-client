/* eslint-disable padding-line-between-statements */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-sort-props */
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { toast } from "sonner";
import { CreditCard, Lock } from "lucide-react";

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
    <div className="max-w-md mx-auto">
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-1 rounded-xl shadow-2xl">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg space-y-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <CreditCard className="h-6 w-6 text-indigo-600" />
              <h3 className="text-xl font-semibold text-gray-800">
                Card Details
              </h3>
            </div>
            <Lock className="h-5 w-5 text-gray-400" />
          </div>

          <div className="space-y-4">
            <div className="relative">
              <CardElement
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
                className="block w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            <button
              type="submit"
              disabled={!stripe}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium
                transform transition-all duration-200 hover:scale-[1.02] hover:shadow-lg
                disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                flex items-center justify-center space-x-2"
            >
              <Lock className="h-4 w-4" />
              <span>Pay Securely</span>
            </button>
          </div>

          <div className="mt-6 flex items-center justify-center space-x-2 text-sm text-gray-500">
            <Lock className="h-4 w-4" />
            <p>Payments are secured and encrypted</p>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2">
            <div className="flex items-center justify-center p-2 bg-gray-50 rounded">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png"
                alt="Visa"
                className="h-6 object-contain"
              />
            </div>
            <div className="flex items-center justify-center p-2 bg-gray-50 rounded">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png"
                alt="Mastercard"
                className="h-6 object-contain"
              />
            </div>
            <div className="flex items-center justify-center p-2 bg-gray-50 rounded">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/American_Express_logo_%282018%29.svg/1200px-American_Express_logo_%282018%29.svg.png"
                alt="American Express"
                className="h-6 object-contain"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
