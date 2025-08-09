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
              We believe every hustle matters. That’s why we’re building a
              platform where
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
    "To empower local food vendors, riders, and everyday customers with fast, secure, and affordable delivery through blockchain-powered payments.",
  list: [
    {
      title: "Food and grocery moves faster",
      description: "",
      image: "/images/about/empower-customers.png",
    },
    {
      title: "Payments are instant and tamper-proof",
      description: "",
      image: "/images/about/protect-transactions.png",
    },
    {
      title: "Trust is earned with every delivery",
      description: "",
      image: "/images/about/liberate-vendors.png",
    },
  ],
};
