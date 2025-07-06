import Footer from "@/components/Footer";
import Hero from "@/components/about/Hero";
import RenderTeam from "@/components/about/RenderTeam";
import SectionGridList from "@/components/home/SectionGridList";
import TryAppCard from "@/components/home/TryAppCard";
import { getTeam } from "@/lib/requests/category";

export default async function Page() {
  const team = await getTeam();

  return (
    <main className="w-full @container flex flex-col bg-[#F6FFFB]">
      <Hero />
      <div className="w-full pt-7 2xl:pt-10 pb-[71px] 2xl:pb-[91px] h-max flex flex-col items-center">
        <div className="w-full max-w-[1250px] px-5 h-max">
          <SectionGridList data={ourMission} />
          <div className="w-full flex my-8 2xl:my-10 flex-col items-center py-6">
            <h2 className="text-(--primary-black) text-center mb-2.5 font-semibold text-[28px] 2xl:text-[32px]">
              Meet the Team
            </h2>
            <p className="text-center font-normal text-[#5D5D5D] text-sm 2xl:text-base mb-8">
              Skip bank delays & scams, get 3-second secured payments with
              Africa’s first blockchain-powered food app
            </p>
            <div className="w-full @max-6xl:grid-cols-2 @max-2xl:grid-cols-1 max-w-[1218px] grid grid-cols-3 gap-x-6 gap-y-9 2xl:gap-y-[42px]">
              {team?.map((member, index) => {
                return <RenderTeam member={member} key={index} />;
              })}
            </div>
          </div>
          <TryAppCard />
        </div>
      </div>
      <Footer />
    </main>
  );
}

const ourMission = {
  title: "Our Mission",
  description:
    "We use blockchain to make food delivery better for everyone, no scams, no delays, no stress!",
  list: [
    {
      title: "Empower Customers",
      description:
        "Order with familiar payments (bank/USSD), while our system auto-converts to blockchain for security.",
      image: "/images/about/empower-customers.png",
    },
    {
      title: "Protect Transactions",
      description:
        "Stellar blockchain locks funds until you confirm delivery—zero fraud, zero stress.",
      image: "/images/about/protect-transactions.png",
    },
    {
      title: " Liberate Vendors",
      description:
        "Instant payouts in their preferred currency (₦aira or crypto), with 0% fees.",
      image: "/images/about/liberate-vendors.png",
    },
  ],
};
