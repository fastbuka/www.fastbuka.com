import Hero from "@/components/browse-stores/Hero";
import VendorListItem from "@/components/browse-stores/VendorListItem";
import VendorsHorizontalList from "@/components/browse-stores/VendorsHorizontalList";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function Page() {
  return (
    <main className="w-full @container flex flex-col bg-[#F6FFFB]">
      <Hero />
      <div className="w-full mt-7 @max-4xl:mt-10 px-6 2xl:mt-10 h-max flex flex-col items-center">
        <div className="max-w-full w-[1210px] flex flex-col @max-4xl:gap-10 gap-7 2xl:gap-10">
          {vendorsByCategory.map((category, index) => {
            return <VendorsHorizontalList key={index} item={category} />;
          })}
          <div className="w-full flex flex-col @max-4xl:py-[28px] py-[30px] 2xl:py-[38px]">
            <div className="flex mb-2.5 items-center gap-2.5">
              <h2 className="text-(--primary-black) font-medium text-[28px] 2xl:text-[32px]">
                All Vendors
              </h2>
              <Image
                src="/images/chevron-down.svg"
                width={24}
                height={24}
                alt=""
                className="2xl:w-6 w-5"
              />
            </div>
            <p className=" font-normal  text-[#5D5D5D] mb-7 2xl:mb-[34px] text-sm 2xl:text-base">
              Skip bank delays & scams, get 3-second secured payments with
              Africa’s first blockchain-powered food app
            </p>
            <div className="w-full flex flex-col gap-9 2xl:gap-12">
              {allVendors.map((vendor, index) => {
                return (
                  <div key={index} className="w-full flex flex-col">
                    <h2 className="text-(--primary-black) font-normal text-xl 2xl:text-2xl mb-9 2xl:mb-12">
                      {vendor.title}
                    </h2>
                    <div className="w-full flex overflow-y-auto scroll-hidden">
                      <div className="w-max flex gap-6">
                        {vendor.list.map((vendorList, index) => {
                          return (
                            <VendorListItem item={vendorList} key={index} />
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="w-full flex 2xl:mb-[111px] @max-4xl:mb-10 @max-4xl:mt-8 @max-4xl:justify-start mb-[81px] justify-center mt-16 2xl:mt-20">
          <button
            type="button"
            className="border-(--primary-green) bg-transparent w-max border hover:opacity-80 duration-200 text-(--primary-green) text-sm 2xl:text-xl font-normal py-3 px-6 rounded-[12px]"
          >
            View All
          </button>
        </div>
      </div>
      <Footer />
    </main>
  );
}

const vendorsByCategory = [
  {
    title: "Handpicked for you with 💚",
    description:
      "Skip bank delays & scams, get 3-second secured payments with Africa’s first blockchain-powered food app",
    list: Array(6).fill({
      image: "/images/dummy-vendor.svg",
      name: "AFRICAN   CHICKEN   FASTFOOD",
      heading: "Chicken Republic",
      time: "33- 40 mins",
    }),
  },
  {
    title: "Featured",
    description:
      "Skip bank delays & scams, get 3-second secured payments with Africa’s first blockchain-powered food app",
    list: Array(6).fill({
      image: "/images/dummy-vendor.svg",
      name: "AFRICAN   CHICKEN   FASTFOOD",
      heading: "Chicken Republic",
      time: "33- 40 mins",
    }),
  },
];

const allVendors = [
  {
    title: "Break Fast",
    list: Array(6).fill({
      image: "/images/dummy-vendor.svg",
      name: "AFRICAN   CHICKEN   FASTFOOD",
      heading: "Chicken Republic",
      time: "33- 40 mins",
    }),
  },
  {
    title: "Lunch",
    list: Array(6).fill({
      image: "/images/dummy-vendor.svg",
      name: "AFRICAN   CHICKEN   FASTFOOD",
      heading: "Chicken Republic",
      time: "33- 40 mins",
    }),
  },
  {
    title: "Dinner",
    list: Array(6).fill({
      image: "/images/dummy-vendor.svg",
      name: "AFRICAN   CHICKEN   FASTFOOD",
      heading: "Chicken Republic",
      time: "33- 40 mins",
    }),
  },
];
