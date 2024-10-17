import BreadCrumb from "@/components/BreadCrumb";
import Image from "next/image";

export default function About() {
  return (
    <>
      {/* Full-Screen Breadcrumb */}
      <BreadCrumb
        items={[{ name: "Home", href: "/" }, { name: "About Us", href: "/about" }]}
        title="About Us"
      />

      {/* About Us Section */}
      <div className="py-16 max-w-7xl mx-auto px-4">
        <section className="py-16">
          <h2 className="text-3xl font-bold text-center text-green-600 mb-8">Who We Are</h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
            FastBuka is committed to delivering nutritious and hygienic meals from top local restaurants 
            to your doorstep. We believe in providing quality meals that cater to various tastes and preferences, 
            ensuring that you enjoy fresh food anytime, anywhere.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div className="p-6 bg-green-50 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-green-700 mb-4">Our Mission</h3>
              <p className="text-gray-600">
                At FastBuka, our mission is to connect people with their favorite local restaurants and provide 
                an unparalleled food delivery service that makes mealtime easy and enjoyable.
              </p>
            </div>

            <div className="p-6 bg-green-50 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-green-700 mb-4">Our Vision</h3>
              <p className="text-gray-600">
                We envision a world where everyone can enjoy freshly prepared meals without the hassle of 
                leaving their home. We strive to make healthy, delicious meals accessible to everyone, 
                everywhere.
              </p>
            </div>

            <div className="p-6 bg-green-50 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-green-700 mb-4">Our Values</h3>
              <p className="text-gray-600">
                We value quality, convenience, and customer satisfaction. These are the principles that guide 
                us as we continue to grow and serve our community with the best meal delivery service possible.
              </p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16">
          <h2 className="text-3xl font-bold text-center text-green-600 mb-8">Meet Our Team</h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
            Our dedicated team works tirelessly to ensure that every meal delivered to your door is fresh, 
            nutritious, and delicious. Meet the people who make FastBuka a success.
          </p>

          {/* Add team member cards here */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Example Team Member Card */}
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <div className="relative w-full h-48 mb-4">
                <Image
                  src="/images/cj.png"
                  alt="Team Member"
                  width={400}
                  height={300}
                  className="object-cover w-full h-full rounded-lg"
                />
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">Micheal Chijioke</h3>
              <p className="text-center text-gray-600">CEO & Founder</p>
            </div>
            {/* Add more team members as needed */}
          </div>
        </section>
      </div>
    </>
  );
}
