import Form from "@/components/contact-us/Form";
import Footer from "@/components/Footer";
import TryAppCard from "@/components/home/TryAppCard";
import NavBarOne from "@/components/NavBarOne";

export default function Page() {
  return (
    <main className="w-full flex flex-col bg-[#F6FFFB]">
      <div className="w-full @max-4xl:pt-6 pt-7 2xl:pt-10  h-max flex flex-col items-center">
        <NavBarOne />
        <div className="2xl:mt-10 mt-8 w-full @max-4xl:pb-3 max-w-[1250px] px-5 h-max pt-10 2xl:pt-12 pb-[56px] 2xl:pb-[76px] flex flex-col items-center">
          <div className="w-full max-w-[512px] 2xl:max-w-[512px] flex flex-col items-center">
            <h1 className="font-bold @max-2xl:max-w-full leading-[55px] @max-4xl:text-[48px] @max-4xl:leading-[64px] 2xl:leading-[64px] mb-6 text-[40px] 2xl:text-[48px] text-[#111111] text-center">
              Contact Our Support
            </h1>
            <p className="font-normal @max-4xl:text-base @max-4xl:leading-6 text-sm 2xl:text-base leading-5 2xl:leading-7 text-[#5D5D5D] text-center mb-6">
              Reach out for orders, vendor applications, or partnerships. No
              robot responses,real humans reply fast!
            </p>
          </div>
          <Form />
          <div className="mb-[75px] 2xl:mb-[91px] @max-3xl:mb-10" />
          <TryAppCard />
        </div>
      </div>
      <Footer />
    </main>
  );
}
