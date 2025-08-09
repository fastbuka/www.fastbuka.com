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
    "Smart, secure, and faster food & grocery delivery — powered by Stellar blockchain",
  list: [
    {
      tag: "ORDER",
      title: "Choose from top vendors ",
      description:
        "Place orders in seconds from verified vendors within your location!",
      image: "/images/services/order.png",
    },
    {
      tag: "FUND",
      title: "Bank & Stable",
      description:
        "Fund securely via Bank, or Stable, with instant confirmation!",
      image: "/images/services/payment.png",
    },
    {
      tag: "TRACK",
      title: "Track & Enjoy ",
      description: "Live tracking. Tamper-proof orders.",
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
      title: "Uncle Abu’s Suya Spot",
      description:
        "I only joined to test it out… but now 40% of my revenue comes from fast, secure blockchain payments!",
      image: "/images/suya.png",
    },
    {
      tag: "Keep All Profits!",
      title: "Annie Market Place",
      description:
        "Before FastBuka, platform fees were eating into my profits. Now, thanks to their low transaction costs, I earn more and grow faster!",
      image: "/images/organic.jpg",
    },
    {
      tag: "I dey run my own hustle!",
      title: "Sodiq, FastBuka Ride",
      description:
        "Before FastBuka, work no sure and pay dey slow. But now, I dey deliver, collect my money sharp-sharp, and customers trust me.",
      image: "/images/ejiro.jpg",
    },
  ],
};
