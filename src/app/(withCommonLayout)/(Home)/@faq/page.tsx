"use client";
import { useState } from "react";

export default function FAQPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqData = [
    {
      question: "What is this website about?",
      answer:
        "This website provides a platform for users to explore and purchase products related to mechanical keyboards.",
    },
    {
      question: "How can I place an order?",
      answer:
        "You can place an order by adding products to your cart and proceeding to checkout.",
    },
    {
      question: "Do you offer international shipping?",
      answer:
        "Yes, we do offer international shipping. You can select your shipping options at checkout.",
    },
    {
      question: "How do I return a product?",
      answer:
        "To return a product, please contact our support team within 30 days of receiving the item, and we'll guide you through the process.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept credit/debit cards, PayPal, and other secure payment methods.",
    },
  ];

  const handleToggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 mt-12">
      <h1 className="text-3xl  text-center mb-6">Frequently Asked Questions</h1>

      <div className="space-y-4">
        {faqData.map((faq, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg border border-gray-300"
          >
            <button
              // eslint-disable-next-line react/jsx-sort-props
              onClick={() => handleToggle(index)}
              className="w-full text-left p-4 text-xl font-semibold text-gray-800 bg-gray-100 hover:bg-gray-200 focus:outline-none rounded-t-lg flex justify-between items-center"
            >
              <span>{faq.question}</span>
              <span className="text-lg">
                {activeIndex === index ? "-" : "+"}
              </span>
            </button>
            {activeIndex === index && (
              <div className="p-4 text-gray-600 bg-gray-50 rounded-b-lg">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
