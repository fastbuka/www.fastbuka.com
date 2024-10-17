"use client"; 

import BreadCrumb from "@/components/BreadCrumb";
import { Button } from "@/components/ui/button";

export default function Contact() {
  return (
    <>
      {/* Full-Screen Breadcrumb */}
      <BreadCrumb
        items={[{ name: "Home", href: "/" }, { name: "Contact Us", href: "/contact" }]}
        title="Contact Us"
      />

      {/* Contact Section */}
      <div className="py-16 max-w-7xl mx-auto px-4">
        <section className="py-16">
          <h2 className="text-3xl font-bold text-center text-green-600 mb-8">Get in Touch</h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
            We&apos;re here to help! Whether you have a question about our services, need assistance, or want to
            learn more about partnering with us, feel free to reach out.
          </p>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-16">
            <div className="p-6 bg-green-50 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-green-700 mb-4">Address</h3>
              <p className="text-gray-600">123 FastBuka Street, Lagos, Nigeria</p>
            </div>
            <div className="p-6 bg-green-50 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-green-700 mb-4">Email</h3>
              <p className="text-gray-600">support@fastbuka.com</p>
            </div>
            <div className="p-6 bg-green-50 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-green-700 mb-4">Phone</h3>
              <p className="text-gray-600">+234 800 123 4567</p>
            </div>
          </div>

          {/* Contact Form */}
          <form className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div className="flex flex-col">
              <label htmlFor="name" className="text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                id="name"
                className="p-4 border border-gray-300 rounded-lg focus:ring focus:ring-green-300"
                placeholder="Enter your full name"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label htmlFor="email" className="text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                id="email"
                className="p-4 border border-gray-300 rounded-lg focus:ring focus:ring-green-300"
                placeholder="Enter your email"
              />
            </div>

            {/* Subject */}
            <div className="flex flex-col">
              <label htmlFor="subject" className="text-gray-700 mb-2">Subject</label>
              <input
                type="text"
                id="subject"
                className="p-4 border border-gray-300 rounded-lg focus:ring focus:ring-green-300"
                placeholder="Subject of your message"
              />
            </div>

            {/* Phone */}
            <div className="flex flex-col">
              <label htmlFor="phone" className="text-gray-700 mb-2">Phone Number</label>
              <input
                type="tel"
                id="phone"
                className="p-4 border border-gray-300 rounded-lg focus:ring focus:ring-green-300"
                placeholder="Enter your phone number"
              />
            </div>

            {/* Message */}
            <div className="flex flex-col md:col-span-2">
              <label htmlFor="message" className="text-gray-700 mb-2">Your Message</label>
              <textarea
                id="message"
                rows={4}
                className="p-4 border border-gray-300 rounded-lg focus:ring focus:ring-green-300"
                placeholder="Type your message here..."
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2">
              <Button className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition">
                Send Message
              </Button>
            </div>
          </form>
        </section>
      </div>
    </>
  );
}
