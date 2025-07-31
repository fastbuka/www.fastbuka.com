import Hero from "@/components/browse-stores/Hero";
import NearbyVendors from "@/components/browse-stores/NearbyVendors";
import VendorsHorizontalList from "@/components/browse-stores/VendorsHorizontalList";
import Footer from "@/components/Footer";
import { getCategories } from "@/lib/requests/category";
import { getAllVendors, getFeaturedVendors } from "@/lib/requests/vendors";
import Image from "next/image";

type SearchParams = Promise<{
  category: string | undefined;
  search: string | undefined;
}>;

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { category, search } = await searchParams;
  const categories = await getCategories();
  const featuredVendors = await getFeaturedVendors();
  const vendorsByCategory = category ? await getAllVendors(category) : null;
  const vendorsBySearch = search ? await getAllVendors(search) : null;
  const breakfastVendors = await getAllVendors("Breakfast");
  const lunchVendors = await getAllVendors("Lunch");
  const dinnerVendors = await getAllVendors("Dinner");

  return (
    <main className="w-full @container flex flex-col bg-[#F6FFFB]">
      <Hero category={category} search={search} categories={categories || []} />
      <div className="w-full mt-7 @max-4xl:mt-10 px-6 2xl:mt-10 h-max flex flex-col items-center">
        <div
          id="vender-list"
          className="max-w-full w-[1210px] flex flex-col @max-4xl:gap-10 gap-7 2xl:gap-10"
        >
          {category && vendorsByCategory && (
            <VendorsHorizontalList
              title={category}
              data={vendorsByCategory}
              url={`/api/v1/vendor/public/approved?q=${category}`}
              description="Skip bank delays & scams, get 3-second secured payments with Africa’s first blockchain-powered food app"
            />
          )}

          {search && vendorsBySearch && (
            <VendorsHorizontalList
              title={`Search result for "${search}"`}
              data={vendorsBySearch}
              url={`/api/v1/vendor/public/approved?q=${search}`}
              description="Skip bank delays & scams, get 3-second secured payments with Africa’s first blockchain-powered food app"
            />
          )}

          {featuredVendors && (
            <VendorsHorizontalList
              title="Featured"
              data={featuredVendors}
              url="/api/v1/vendor/public/approved?sortField=featured"
              description="Skip bank delays & scams, get 3-second secured payments with Africa’s first blockchain-powered food app"
            />
          )}
          <NearbyVendors />
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
              {breakfastVendors && (
                <div className="w-full flex flex-col">
                  <h2 className="text-(--primary-black) font-normal text-xl 2xl:text-2xl mb-9 2xl:mb-12">
                    Breakfast
                  </h2>
                  <div className="w-full flex overflow-y-auto scroll-hidden">
                    <VendorsHorizontalList
                      data={breakfastVendors}
                      asList
                      url="/api/v1/vendor/public/approved?q=Breakfast"
                    />
                  </div>
                </div>
              )}
              {lunchVendors && (
                <div className="w-full flex flex-col">
                  <h2 className="text-(--primary-black) font-normal text-xl 2xl:text-2xl mb-9 2xl:mb-12">
                    Lunch
                  </h2>
                  <div className="w-full flex overflow-y-auto scroll-hidden">
                    <VendorsHorizontalList
                      data={lunchVendors}
                      asList
                      url="/api/v1/vendor/public/approved?q=Lunch"
                    />
                  </div>
                </div>
              )}
              {dinnerVendors && (
                <div className="w-full flex flex-col">
                  <h2 className="text-(--primary-black) font-normal text-xl 2xl:text-2xl mb-9 2xl:mb-12">
                    Dinner
                  </h2>
                  <div className="w-full flex overflow-y-auto scroll-hidden">
                    <VendorsHorizontalList
                      data={dinnerVendors}
                      asList
                      url="/api/v1/vendor/public/approved?q=Dinner"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="w-full flex 2xl:mb-[111px] @max-4xl:mb-10 @max-4xl:justify-start mb-[81px] justify-center"></div>
      </div>
      <Footer />
    </main>
  );
}
