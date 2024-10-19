import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LearnMore() {
  return (
    <section className="bg-green-400 py-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-8 px-4">
        
        {/* Left Side: Heading and Button */}
        <div className="space-y-4 text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-bold text-black">
            Want to learn more?
          </h2>
          <Link href="/about">
            <Button className="bg-white text-green-600 px-6 py-3 rounded-full">
              Learn more
            </Button>
          </Link>
        </div>
        
        {/* Right Side: Description */}
        <div className="text-center md:text-right space-y-4">
          <div className="text-gray-800">
            <p className="max-w-[14em] md:max-w-[18em] lg:max-w-[22em] mx-auto md:ml-auto md:mr-0">
              To find out more about our products,
              offers, and services or if you
              have any questions, please get in
              touch with our team.
            </p>
          </div>
          <form className="flex flex-col items-center md:items-end space-y-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full md:w-64 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <Button className="bg-green-600 text-white px-6 py-3 rounded-full w-full md:w-auto">
              Subscribe Newsletter
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}