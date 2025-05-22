import { Clock, RefreshCcw, Truck } from "lucide-react";

export default function Benefits() {
  return (
    <div>
      {/* Benefits Section */}
      <section className="py-16 ">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Us
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experience the best online shopping with our premium services and
              benefits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Truck className="w-10 h-10" />,
                title: "Free Shipping",
                description: "Free shipping on all orders over $50",
              },
              {
                icon: <RefreshCcw className="w-10 h-10" />,
                title: "Easy Returns",
                description: "30-day return policy for all items",
              },
              {
                icon: <Clock className="w-10 h-10" />,
                title: "24/7 Support",
                description: "Round-the-clock customer service",
              },
            ].map((benefit, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <div className="text-green-600 mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
