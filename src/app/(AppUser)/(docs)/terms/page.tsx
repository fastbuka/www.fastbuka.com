"use client";  // This is a client-side component

import BreadCrumb from "@/components/BreadCrumb";

export default function TermsPage() {
  return (
    <div>
      {/* Breadcrumb */}
      <BreadCrumb
        items={[{ name: "Home", href: "/" }, { name: "Terms & Conditions", href: "/terms" }]}
        title="Terms & Conditions"
      />

      {/* Terms and Conditions Section */}
      <div className="py-16 max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">Terms and Conditions</h1>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          These Terms and Conditions govern your use of the FastBuka platform. Please read them carefully before using our services.
        </p>

        <div className="space-y-8">
          {/* 1. Introduction */}
          <section>
            <h2 className="text-2xl font-semibold">1. Introduction</h2>
            <p className="text-gray-600 mt-2">
              FastBuka provides a marketplace where users can browse and order food from multiple vendors. By using our services, you agree to comply with and be bound by the following terms and conditions. If you do not agree to these terms, you may not use our platform.
            </p>
          </section>

          {/* 2. Vendor Responsibilities */}
          <section>
            <h2 className="text-2xl font-semibold">2. Vendor Responsibilities</h2>
            <p className="text-gray-600 mt-2">
              Vendors are responsible for the quality, safety, and accuracy of the items listed. Vendors must comply with local food safety regulations and ensure that the products meet customer expectations.
            </p>
            <p className="text-gray-600 mt-2">
              Vendors are also responsible for updating product information, availability, and ensuring that all orders are fulfilled promptly and professionally.
            </p>
          </section>

          {/* 3. User Responsibilities */}
          <section>
            <h2 className="text-2xl font-semibold">3. User Responsibilities</h2>
            <p className="text-gray-600 mt-2">
              Users are responsible for providing accurate and up-to-date information when placing orders, including delivery addresses and contact details. Users must comply with local laws when using our platform and may not engage in any unlawful activities.
            </p>
          </section>

          {/* 4. Orders and Payments */}
          <section>
            <h2 className="text-2xl font-semibold">4. Orders and Payments</h2>
            <p className="text-gray-600 mt-2">
              All orders must be paid for using the payment methods provided on the platform, including credit cards, Paystack, or tokens. Once an order is confirmed, it is final, and you are responsible for ensuring that all details are correct.
            </p>
            <p className="text-gray-600 mt-2">
              If there is an issue with payment or delivery, please contact our support team immediately for assistance.
            </p>
          </section>

          {/* 5. Cancellations and Refunds */}
          <section>
            <h2 className="text-2xl font-semibold">5. Cancellations and Refunds</h2>
            <p className="text-gray-600 mt-2">
              Orders may be canceled only before the vendor begins preparation. If a cancellation is made in time, a full refund will be provided. Refunds for incorrect or poor-quality items are processed on a case-by-case basis. Contact our support team with your concerns.
            </p>
          </section>

          {/* 6. Delivery Policy */}
          <section>
            <h2 className="text-2xl font-semibold">6. Delivery Policy</h2>
            <p className="text-gray-600 mt-2">
              Delivery times provided are estimates and may vary based on traffic, weather, and other conditions. FastBuka is not liable for delays caused by these factors. Users should ensure that they are available at the delivery location to receive their orders.
            </p>
          </section>

          {/* 7. Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-semibold">7. Limitation of Liability</h2>
            <p className="text-gray-600 mt-2">
              FastBuka is not liable for any indirect, incidental, or consequential damages arising from the use of the platform, including lost profits, data, or opportunities. In any case, our liability is limited to the value of the order placed.
            </p>
          </section>

          {/* 8. Modifications to the Terms */}
          <section>
            <h2 className="text-2xl font-semibold">8. Modifications to the Terms</h2>
            <p className="text-gray-600 mt-2">
              We reserve the right to update these terms at any time. Significant changes will be communicated to you, and your continued use of the platform after such changes indicates acceptance of the updated terms.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}