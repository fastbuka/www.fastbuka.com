import React from "react";
import Image from "next/image";
import Link from "next/link";
// import Vector1 from "../../../public/images/homepage/Vector1.png";
// import Vector2 from "../../../public/images/homepage/Vector2.png";
// import Vector3 from "../../../public/images/homepage/Vector3.png";

export default function Hero() {
  return (
    <div>
      <div className="flex justify-center">
        <Image src={'/Vector3.png'} alt="vector3" width={100} height={100} className="img-fluid mt-10" />
      </div>

      <div className="grid grid-cols-4 justify-items-center container mx-auto px-4 mt-10">
        <div className="place-self-center">
          <Image
            src={'/Vector2.png'}
            alt="vaector2"
            width={100} height={100}
            className="img-fluid hidden md:block w-24"
          />
        </div>
        <div className="md:col-span-2 col-span-4">
          <h1 className="md:text-[40px] text-4xl text-center font-mono font-semibold">
            Bring Your Favourite Local Meals to your Doorstep
          </h1>
          <p className="text-center md:text-xl text-lg mt-3">
            Experience the fastest way to order and deliver food with steller
            blockchain technology. Join the FastBuka&apos;s revolution in food
            delivery and support locat food vendors
          </p>

          <div className="flex justify-center mt-3 gap-3">
            <Link href="#waitlist">
              <button
                type="button"
                className="text-[#0a3a6b] bg-white border border-[#0a3a6b] font-semibold rounded-full text-sm px-10 py-4 text-center drop-shadow-xl transition ease-in-out delay-150 hover:-translate-y-1 hover:bg-[#0a3a6b] hover:text-white duration-300 hover:drop-shadow-2xl"
              >
                Join Our Waiting List 
              </button>
            </Link>

            {/* <Link href="/auth/register">
              <button
                type="button"
                className="text-white bg-[#0a3a6b] border border-[#0a3a6b] font-semibold rounded-full text-sm px-10 py-4 text-center drop-shadow-xl transition ease-in-out delay-150 hover:-translate-y-1 hover:bg-white hover:text-[#0a3a6b] duration-300 hover:drop-shadow-2xl"
              >
                Register
              </button>
            </Link> */}
          </div>
        </div>
        <div className="place-self-center">
          <Image
            src={'/Vector1.png'}
            alt="vector1"
            width={100} height={100}
            className="img-fluid hidden md:block w-24"
          />
        </div>
      </div>
    </div>
  );
}