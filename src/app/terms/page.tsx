"use client";  // This is a client-side component

import BreadCrumb from "@/components/BreadCrumb";

export default function TermsPage() {
  return (
    <div>
      {/* Breadcrumb */}
      <BreadCrumb items={[{ name: "Home", href: "/" }, { name: "Terms & Privacy", href: "/terms" }]} title="Terms & Privacy" />

      {/* Terms and Conditions Section */}
      <div className="py-16 max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">Terms and Conditions</h1>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          These Terms and Conditions govern your use of the FastBuka platform and services. Please read them carefully before making use of our platform.
        </p>

        <div className="space-y-8">
          {/* 1. Introduction */}
          <section>
            <h2 className="text-2xl font-semibold">1. Introduction</h2>
            <p className="text-gray-600 mt-2">
              Welcome to FastBuka! By using our platform, you agree to be bound by these terms. If you do not agree to these terms, you must refrain from using the platform. FastBuka offers multi-vendor services allowing users to order food and other products from various vendors. 
            </p>
          </section>

          {/* 2. Vendor Responsibilities */}
          <section>
            <h2 className="text-2xl font-semibold">2. Vendor Responsibilities</h2>
            <p className="text-gray-600 mt-2">
              Vendors on FastBuka are responsible for maintaining the quality and accuracy of the products listed. They are required to ensure all meals, services, and products delivered are up to the standard as described on the platform.
            </p>
            <p className="text-gray-600 mt-2">
              Vendors must comply with all local and federal health and safety regulations. Any vendor found to be in breach of these terms may have their accounts suspended or terminated.
            </p>
          </section>

          {/* 3. User Responsibilities */}
          <section>
            <h2 className="text-2xl font-semibold">3. User Responsibilities</h2>
            <p className="text-gray-600 mt-2">
              Users must provide accurate and up-to-date contact details for delivery. FastBuka is not liable for any delays or issues caused by incorrect user information. Users must not engage in any fraudulent activities on the platform, including false reviews, chargebacks, or any other deceptive behavior.
            </p>
          </section>

          {/* 4. Orders and Payments */}
          <section>
            <h2 className="text-2xl font-semibold">4. Orders and Payments</h2>
            <p className="text-gray-600 mt-2">
              All orders placed on FastBuka are subject to availability. Once an order is confirmed, payment must be made through the platform’s secure payment gateway, which accepts credit/debit cards, in-app tokens, and other available payment methods. Users will receive a confirmation email or SMS once the order has been processed.
            </p>
            <p className="text-gray-600 mt-2">
              Any disputes regarding payments must be raised with our support team within 24 hours of the order. Refunds are processed on a case-by-case basis and will depend on the nature of the dispute.
            </p>
          </section>

          {/* 5. Cancellations */}
          <section>
            <h2 className="text-2xl font-semibold">5. Cancellations</h2>
            <p className="text-gray-600 mt-2">
              Orders may only be canceled before the vendor begins preparation. After this point, cancellation is not possible, and the user will be charged the full amount of the order. Vendors may cancel orders if they are unable to fulfill them, in which case the user will be refunded in full.
            </p>
          </section>

          {/* 6. Delivery */}
          <section>
            <h2 className="text-2xl font-semibold">6. Delivery</h2>
            <p className="text-gray-600 mt-2">
              Delivery times are estimates and may vary due to unforeseen circumstances such as weather or traffic conditions. FastBuka is not liable for delays in delivery caused by these factors.
            </p>
          </section>

          {/* 7. Privacy Policy */}
          <section>
            <h2 className="text-2xl font-semibold">7. Privacy Policy</h2>
            <p className="text-gray-600 mt-2">
              FastBuka takes your privacy seriously. This policy explains how we collect, use, and safeguard your personal data.
            </p>
            <ul className="list-disc list-inside mt-4 text-gray-600">
              <li>
                <strong>Information Collection:</strong> We collect personal data such as your name, address, email, phone number, and payment information when you register, place an order, or contact us.
              </li>
              <li>
                <strong>How We Use Your Data:</strong> Your data is used to process orders, deliver products, manage your account, and communicate with you. We may also use your data to improve our platform and services.
              </li>
              <li>
                <strong>Sharing of Data:</strong> We only share your personal data with vendors or delivery partners to fulfill your order. We do not sell or rent your data to third parties.
              </li>
              <li>
                <strong>Data Security:</strong> We employ industry-standard security measures to protect your personal data. However, no system is entirely foolproof, and we cannot guarantee complete security.
              </li>
              <li>
                <strong>Data Retention:</strong> We retain your data for as long as necessary to provide our services or as required by law.
              </li>
              <li>
                <strong>Your Rights:</strong> You have the right to access, correct, or delete your personal data. You can do this by contacting our support team.
              </li>
            </ul>
          </section>

          {/* 8. Modifications to the Terms */}
          <section>
            <h2 className="text-2xl font-semibold">8. Modifications to the Terms</h2>
            <p className="text-gray-600 mt-2">
              FastBuka reserves the right to modify these terms at any time. We will notify you of any significant changes by updating the terms on our website. Continued use of the platform constitutes acceptance of the modified terms.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
