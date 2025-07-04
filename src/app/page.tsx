import Footer from "@/components/Footer";
import FAQs from "@/components/home/FAQs";
import Hero from "@/components/home/Hero";
import NearbyRestaurants from "@/components/home/NearbyRestaurants";
import PlaceOrder from "@/components/home/PlaceOrder";
import SectionGridList from "@/components/home/SectionGridList";
import TapbarServices from "@/components/home/TapbarServices";
import TryAppCard from "@/components/home/TryAppCard";
import { getVendors } from "@/lib/requests/vendors";

export default async function Home() {
  const vendors = await getVendors();

  return (
    <main className="w-full @container flex flex-col bg-[#F6FFFB]">
      <Hero />
      <div className="w-full pb-[71px] 2xl:pb-[91px] h-max flex flex-col items-center">
        <div className="w-full max-w-[1250px] px-5 h-max">
          <SectionGridList data={whyChooseUs} />
          <div className="w-full py-4 @max-4xl:py-0 2xl:py-6 @max-4xl:my-10 my-[62px] 2xl:my-[72px]">
            <TapbarServices />
          </div>
          <div className="w-full @max-4xl:mb-10 mb-[62px] @max-4xl:pt-6 2xl:mb-[72px]">
            <TryAppCard />
          </div>
          <SectionGridList data={stories} />
          <div className="my-[62px] @max-4xl:my-10 2xl:my-[72px] w-full">
            <NearbyRestaurants vendors={vendors} />
          </div>
          <FAQs />
          <PlaceOrder />
        </div>
      </div>
      <Footer />
    </main>
  );
}

const whyChooseUs = {
  title: "Why choose Us?",
  description:
    "Skip bank delays & scams, get 3-second secured payments with Africa’s first blockchain-powered food app",
  list: [
    {
      tag: "ORDER",
      title: "Choose from 500+ vendors ",
      description: "Place orders in seconds from verified vendors!",
      image: "/images/services/order.png",
    },
    {
      tag: "MAKE PAYMENT",
      title: "Bank/USSD  or crypto ",
      description:
        "Pay securely via bank, USSD, or crypto & instant confirmation!",
      image: "/images/services/payment.png",
    },
    {
      tag: "GET FOOD",
      title: "Track & Enjoy ",
      description: "Live rider tracking & enjoy blockchain-secured delivery!",
      image: "/images/services/get-food.png",
    },
  ],
};

const stories = {
  title: "Stories",
  description:
    "Earn rewards with every purchase while saying goodbye to payment delays.",
  list: [
    {
      tag: "Reflex. Money. Repeat!",
      title: "Uncle Abu’s Suya Spot (Asaba) ",
      description:
        "I joined just to try crypto... now 40% of my sales come from blockchain payments!",
      image: "/images/suya.png",
    },
    {
      tag: "Keep All Profits!",
      title: "Glow Organic Store (Enugu)",
      description:
        "Before high fees almost drained my profits, FastBuka’s 0% fee lets my business thrive!",
      image: "/images/organic.png",
    },
    {
      tag: "Own Your Hustle!",
      title: "Ejiro's Spot, (Warri)",
      description:
        "Dem no dey charge me like the others, my money dey land straight to my wallet!",
      image: "/images/ejiro.png",
    },
  ],
};
