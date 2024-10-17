"use client";  // This ensures it's a client-side component

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Hero() {
  const [showFoodImage, setShowFoodImage] = useState(true);

  // Hide the image on mobile screens
  useEffect(() => {
    const handleResize = () => {
      setShowFoodImage(window.innerWidth > 768); // Show only on screens larger than mobile
    };
    window.addEventListener("resize", handleResize);
    handleResize(); // Set the initial value
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="relative bg-white">

      {/* Top Section: Text + Buttons */}
      <div className="container mx-auto flex flex-col items-center justify-center py-8 sm:py-10 md:py-12 lg:py-16 mb-8 sm:mb-10 md:mb-12 lg:mb-[120px]">
        <div className="w-full max-w-2xl text-center space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8 px-6 sm:px-8 md:px-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-snug">
            Are you <span className="text-green-500">Hungry?</span> Place an order with <span className="text-green-500">FastBuka</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600">
            FastBuka delivers hygienic and nutritious meals from your favorite restaurants in three simple steps.
          </p>
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 md:space-x-4 justify-center">
            <Button className="bg-green-500 text-white px-5 sm:px-6 md:px-7 py-3 md:py-4 rounded-lg text-sm sm:text-base">Sign up for free</Button>
            <Button className="bg-transparent border border-green-500 text-green-500 px-5 sm:px-6 md:px-7 py-3 md:py-4 rounded-lg text-sm sm:text-base">Order Now</Button>
          </div>
        </div>
      </div>

      {/* Call-to-Action Section with Food Image */}
      <div className="relative py-10 md:py-16 mt-4 md:mt-16" style={{ backgroundImage: `url('/images/pattern.png')`, backgroundSize: "400px 400px", backgroundRepeat: "repeat" }}>
        <div className="absolute inset-0 bg-green-500 opacity-90"></div>
        {/* Bouncing Food Image */}
        {showFoodImage && (
          <div className="absolute -top-32 left-1/2 transform -translate-x-1/2 z-10">
            <Image
              className="animate-bounce"
              src="/images/food_flower.png"
              alt="Food"
              width={500}
              height={300}
            />
          </div>
        )}

        {/* Content Section: Two Columns */}
        <div className="relative w-full grid grid-cols-1 md:grid-cols-2 items-center gap-6 md:gap-8 pt-6 md:pt-16 px-6 sm:px-8 lg:px-10 max-w-7xl mx-auto mt-[20px] md:mt-[30px] mb-10 md:mb-16">
          {/* Left Column: Title and Text */}
          <div className="text-white space-y-6 md:space-y-8 relative z-10 mt-[120px] md:mt-0">
            <h2 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 md:mb-8">Hygienic and <br /> Nutritious Meals</h2>
            <div className="flex items-center space-x-4 overflow-x-auto pb-6 mb-6 md:mb-8">
              <Image src="/images/restaurant.jpg" alt="Partner 1" width={80} height={40} className="flex-shrink-0 rounded-lg" />
              <Image src="/images/restaurant.jpg" alt="Partner 2" width={80} height={40} className="flex-shrink-0 rounded-lg" />
              <Image src="/images/restaurant.jpg" alt="Partner 3" width={80} height={40} className="flex-shrink-0 rounded-lg" />
              <Image src="/images/restaurant.jpg" alt="Partner 4" width={80} height={40} className="flex-shrink-0 rounded-lg" />
            </div>
          </div>

          {/* Right Column: Partner Logos */}
          <div className="flex flex-col space-y-6 md:space-y-8 relative z-10 mt-6 md:mt-0">
            <p className="text-base md:text-xl text-white">
              Craving a delicious meal but short on time? We&apos;ve got you covered with our fast and fresh delivery service. Place your order and enjoy hot, freshly-prepared dishes delivered right to your doorstep. Satisfaction guaranteed!
            </p>
            <Button className="bg-white text-green-500 px-7 md:px-9 py-7 md:py-9 rounded-full text-base md:text-lg font-semibold w-[180px] md:w-[220px]">See menu</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
