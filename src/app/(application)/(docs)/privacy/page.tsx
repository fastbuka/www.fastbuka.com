'use client'; // This is a client-side component

export default function PrivacyPolicyPage() {
  return (
    <div>
      {/* Privacy Policy Section */}
      <div className='py-16 max-w-7xl mx-auto px-4'>
        <h1 className='text-4xl font-bold text-center mb-8'>Privacy Policy</h1>
        <p className='text-center text-gray-600 max-w-2xl mx-auto mb-12'>
          At FastBuka, we are committed to protecting your privacy. This policy
          outlines how we collect, use, and safeguard your personal information.
        </p>

        <div className='space-y-8'>
          {/* 1. Information Collection */}
          <section>
            <h2 className='text-2xl font-semibold'>
              1. Information Collection
            </h2>
            <p className='text-gray-600 mt-2'>
              We collect personal data that you provide when you register on our
              platform, place an order, or contact customer support. This data
              includes your name, email, delivery address, phone number, and
              payment information.
            </p>
          </section>

          {/* 2. How We Use Your Information */}
          <section>
            <h2 className='text-2xl font-semibold'>
              2. How We Use Your Information
            </h2>
            <p className='text-gray-600 mt-2'>
              The personal data we collect is used to process and deliver your
              orders, manage your account, and communicate with you. We also use
              your data to improve our platform and provide personalized
              recommendations.
            </p>
            <p className='text-gray-600 mt-2'>
              We may also use your information for marketing purposes, such as
              sending promotional offers and updates. You can opt out of
              receiving marketing communications at any time.
            </p>
          </section>

          {/* 3. Data Sharing */}
          <section>
            <h2 className='text-2xl font-semibold'>3. Data Sharing</h2>
            <p className='text-gray-600 mt-2'>
              We only share your personal data with third parties when necessary
              to fulfill your order, such as vendors and delivery partners. We
              do not sell or rent your personal data to third parties for their
              marketing purposes.
            </p>
          </section>

          {/* 4. Data Security */}
          <section>
            <h2 className='text-2xl font-semibold'>4. Data Security</h2>
            <p className='text-gray-600 mt-2'>
              We implement industry-standard security measures to protect your
              personal data from unauthorized access, use, or disclosure.
              However, no system is entirely secure, and we cannot guarantee
              absolute security.
            </p>
          </section>

          {/* 5. Data Retention */}
          <section>
            <h2 className='text-2xl font-semibold'>5. Data Retention</h2>
            <p className='text-gray-600 mt-2'>
              We retain your personal data for as long as necessary to provide
              our services and comply with legal obligations. You can request to
              have your data deleted by contacting our support team, subject to
              certain legal restrictions.
            </p>
          </section>

          {/* 6. Your Rights */}
          <section>
            <h2 className='text-2xl font-semibold'>6. Your Rights</h2>
            <p className='text-gray-600 mt-2'>
              You have the right to access, correct, or delete your personal
              data. You also have the right to object to certain data processing
              activities or to restrict processing in certain circumstances.
            </p>
          </section>

          {/* 7. Changes to This Policy */}
          <section>
            <h2 className='text-2xl font-semibold'>
              7. Changes to This Policy
            </h2>
            <p className='text-gray-600 mt-2'>
              We may update this privacy policy from time to time to reflect
              changes in our practices or legal requirements. We will notify you
              of any significant changes by updating this page or contacting you
              directly.
            </p>
          </section>

          {/* 8. Contact Information */}
          <section>
            <h2 className='text-2xl font-semibold'>8. Contact Information</h2>
            <p className='text-gray-600 mt-2'>
              If you have any questions or concerns about our privacy practices,
              please contact us at privacy@fastbuka.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
