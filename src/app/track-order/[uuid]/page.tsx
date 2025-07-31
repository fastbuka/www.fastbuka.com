import Footer from "@/components/Footer";
import RiderLocationMap from "@/components/RiderLocationMap";
import { ChevronRight, ChevronUp } from "lucide-react";
import Link from "next/link";

export default async function Page() {
  return (
    <main className="w-full @container flex flex-col bg-[#F6FFFB]">
      <div className="w-full h-screen mb-6 relative">
        <RiderLocationMap />
        <div className="absolute top-[50%] left-[50%] translate-y-[-50%] 2xl:px-[30px] px-7 2xl:py-6 py-5 translate-x-[-50%] h-screen w-[650px] 2xl:w-[850px] bg-white rounded-[14px] max-h-[90%]">
          <div className="w-full mb-2 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="text-[#667085] text-xs 2xl:text-sm font-normal"
              >
                Home
              </Link>
              <ChevronRight className="w-3.5 2xl:w-4 text-[#D0D5DD]" />
              <p className="text-[#667085] text-xs 2xl:text-sm">
                ID 3352655445
              </p>
            </div>
            <button
              type="button"
              className="bg-[#0EAD65] flex justify-center items-center custom-shadow-one cursor-pointer h-10 2xl:h-11 w-10 2xl:w-11 rounded-full"
            >
              <ChevronUp className="w-4 2xl:w-5 text-white" />
            </button>
          </div>
          <h2 className="text-[#344054] font-semibold 2xl:text-[30px] text-[22px]">
            Order ID: 3354654654526
          </h2>
        </div>
      </div>
      <Footer />
    </main>
  );
}
