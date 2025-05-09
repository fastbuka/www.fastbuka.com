'use client'; // This ensures it's a client-side component

import Link from 'next/link';
import Image from 'next/image';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useUser } from '@/hooks/users';
import { Apple, PlayIcon as PlayStore } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function HeroSection() {
  const { profile } = useUser();
  const [showFoodImage, setShowFoodImage] = useState(true);
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await profile();
      if (response.success) {
        setUser(response.data.user);
      } else {
        Cookies.remove('token');
      }
    };

    fetchProfile();
  }, [profile, setUser]);

  useEffect(() => {
    const handleResize = () => {
      setShowFoodImage(window.innerWidth > 768);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="relative bg-white">
      {/* Top Section: Text + Buttons */}
      <div className="container mx-auto flex flex-col items-center justify-center py-8 sm:py-10 md:py-12 lg:py-16 mb-8 sm:mb-10 md:mb-12 lg:mb-[120px]">
        <div className="w-full max-w-2xl text-center space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8 px-6 sm:px-8 md:px-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-snug">
            Are you <span className="text-green-500">Hungry?</span> Place an
            order <span className="text-green-500">Now</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600">
            We deliver food and groceries from your favorite local restaurant
            and malls in townn.
          </p>
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 md:space-x-4 justify-center">
            <Link href="/">
              <Button className="bg-green-500 text-white px-5 sm:px-6 md:px-7 py-3 md:py-4 rounded-lg text-sm sm:text-base">
                <Apple className="mr-2 h-5 w-5" />
                App Store
              </Button>
            </Link>
            <Link href="/">
              <Button className="bg-transparent border border-green-500 text-green-500 px-5 sm:px-6 md:px-7 py-3 md:py-4 rounded-lg text-sm sm:text-base">
                <PlayStore className="mr-2 h-5 w-5" />
                Play Store
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Call-to-Action Section with Food Image */}
      <div
        className="relative py-2 md:py-16 mt-4 md:mt-16"
        style={{
          backgroundImage: `url('/images/pattern.png')`,
          backgroundSize: '400px 400px',
          backgroundRepeat: 'repeat',
        }}
      >
        <div className="absolute inset-0 bg-green-500 opacity-90"></div>
        {/* Bouncing Food Image */}
        {showFoodImage && (
          <div className="absolute -top-32 left-1/2 transform -translate-x-1/2 z-10">
            <img
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
          <div className="text-white space-y-6 md:space-y-8 relative z-10">
            <h2 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 md:mb-8">
              Hygienic and <br /> Nutritious Meals
            </h2>
            <div className="flex items-center space-x-4 overflow-x-auto pb-6 mb-6 md:mb-8 scroll-hidden">
              <Image
                src="/images/restaurant.jpg"
                alt="Partner 1"
                width={80}
                height={40}
                className="flex-shrink-0 rounded-lg"
              />
              <Image
                src="/images/restaurant.jpg"
                alt="Partner 2"
                width={80}
                height={40}
                className="flex-shrink-0 rounded-lg"
              />
              <Image
                src="/images/restaurant.jpg"
                alt="Partner 3"
                width={80}
                height={40}
                className="flex-shrink-0 rounded-lg"
              />
              <Image
                src="/images/restaurant.jpg"
                alt="Partner 4"
                width={80}
                height={40}
                className="flex-shrink-0 rounded-lg"
              />
            </div>
          </div>

          {/* Right Column: Partner Logos */}
          <div className="flex flex-col space-y-6 md:space-y-8 relative z-10 mt-6 md:mt-0">
            <p className="text-base md:text-xl text-white">
              Craving a delicious meal but short on time? We’ve got nutritious
              meal for your vibrant lifestyle. Where every bite is a
              satisfaction for your taste bud and body.
            </p>
            <Link href="/feeds">
              <Button className="bg-white text-green-500 px-7 md:px-9 py-7 md:py-9 rounded-full text-base md:text-lg font-semibold w-[180px] md:w-[220px]">
                Browse feeds
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
