import BreadCrumb from "@/components/BreadCrumb";
import { Button } from "@/components/ui/button";

export default function Partner() {
  return (
    <>
     {/* Breadcrumb */}
     <BreadCrumb
     items={[{ name: "Home", href: "/" }, { name: "Partner with Us", href: "/partner" }]}
     title="Partner with Us"
   />
    <div className="py-16 max-w-7xl mx-auto px-4">
     

      {/* Partner Section */}
      <section className="py-16">
        <h2 className="text-3xl font-bold text-center text-green-600 mb-8">Why Partner with FastBuka?</h2>
        <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
          FastBuka offers a unique opportunity for restaurants, suppliers, and service providers to expand their business and reach a wider audience. 
          Partnering with FastBuka enables you to benefit from our seamless platform that connects you to customers seeking nutritious and delicious meals from top local restaurants.
        </p>

        {/* Reasons to Partner Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="p-6 bg-green-50 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-green-700 mb-4">Expand Your Reach</h3>
            <p className="text-gray-600">
              Join our platform and gain access to a larger customer base, boosting your visibility and sales.
            </p>
          </div>
          <div className="p-6 bg-green-50 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-green-700 mb-4">Seamless Integration</h3>
            <p className="text-gray-600">
              Easily integrate your services with FastBuka’s robust platform, enabling smooth transactions and customer satisfaction.
            </p>
          </div>
          <div className="p-6 bg-green-50 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-green-700 mb-4">Grow Your Business</h3>
            <p className="text-gray-600">
              Benefit from our marketing efforts and customer base to grow your business faster and more efficiently.
            </p>
          </div>
        </div>
      </section>

      {/* Partner Form Section */}
      <section className="bg-green-50 py-16 rounded-lg shadow-lg">
        <h3 className="text-2xl font-bold text-center text-green-600 mb-6">Fill out the form to Partner with Us</h3>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          We are actively looking for partners in various areas. Please fill out the form below to express your interest, and we will get back to you shortly.
        </p>

        {/* Form */}
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

          {/* Business Name */}
          <div className="flex flex-col">
            <label htmlFor="business" className="text-gray-700 mb-2">Business Name</label>
            <input
              type="text"
              id="business"
              className="p-4 border border-gray-300 rounded-lg focus:ring focus:ring-green-300"
              placeholder="Enter your business name"
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

          {/* Areas of Interest */}
          <div className="flex flex-col md:col-span-2">
            <label htmlFor="interest" className="text-gray-700 mb-2">Areas to Partner</label>
            <select
              id="interest"
              className="p-4 border border-gray-300 rounded-lg focus:ring focus:ring-green-300"
            >
              <option value="">Select an area to partner in</option>
              <option value="restaurant">Restaurant Partnerships</option>
              <option value="suppliers">Suppliers and Vendors</option>
              <option value="delivery">Delivery Services</option>
              <option value="marketing">Marketing and Promotion</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2">
            <Button className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition">
              Submit
            </Button>
          </div>
        </form>
      </section>
    </div>
    </>
  );
}
