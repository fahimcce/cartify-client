import React from "react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-green-600 text-white py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold">About Cartify</h1>
          <p className="mt-2 text-lg">
            Your trusted platform for a seamless online shopping experience.
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Our Mission
          </h2>
          <p className="text-gray-600 leading-relaxed">
            At Cartify, our mission is to empower users, vendors, and
            administrators by providing an intuitive, responsive, and secure
            e-commerce platform. We aim to deliver a seamless shopping
            experience that connects people with the products they love, while
            enabling vendors to manage their shops and administrators to
            maintain system integrity.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            What We Offer
          </h2>
          <ul className="list-disc list-inside text-gray-600 leading-relaxed">
            <li>
              A robust platform for users to browse and purchase products
              effortlessly.
            </li>
            <li>
              Comprehensive tools for vendors to manage shops, inventories, and
              sales.
            </li>
            <li>
              Advanced administrative controls for monitoring and system
              management.
            </li>
            <li>
              Secure payment integrations for a safe and reliable checkout
              experience.
            </li>
            <li>Scalable infrastructure built with modern web technologies.</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Our Technology
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Cartify is built on a foundation of cutting-edge web technologies:
          </p>
          <ul className="list-disc list-inside text-gray-600 leading-relaxed">
            <li>
              Backend: Node.js and Express.js for a robust and scalable server.
            </li>
            <li>Frontend: Next.js for a fast and responsive user interface.</li>
            <li>
              Database: PostgreSQL for reliable and efficient data storage.
            </li>
            <li>Third-party integrations for payments and file storage.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Why Choose Cartify?
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Cartify stands out as a professional, enterprise-grade solution for
            e-commerce needs. We prioritize:
          </p>
          <ul className="list-disc list-inside text-gray-600 leading-relaxed">
            <li>Intuitive and user-friendly design.</li>
            <li>High performance and scalability to meet growing demands.</li>
            <li>Security features to protect user data and transactions.</li>
            <li>
              Continuous updates and improvements for the best experience.
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}
