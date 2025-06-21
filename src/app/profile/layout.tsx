import Footer from "@/components/Footer";
import GoBack from "@/components/GoBack";
import NavBarTwo from "@/components/NavBarTwo";
import TapBar from "@/components/profile/TapBar";
import Image from "next/image";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-full flex flex-col bg-[#F6FFFB]">
      <div className="w-full @max-4xl:pt-6 pt-7 2xl:pt-10  h-max flex flex-col items-center">
        <NavBarTwo />
        <div className="2xl:mt-14 mt-12 w-full max-w-[1210px] px-5 h-max flex flex-col">
          <div className="2xl:mb-[58px] mb-12">
            <GoBack />
          </div>
          <div className="w-full 2xl:mb-[72px] mb-[60px] h-max rounded-[17px] profile-background-card flex flex-col items-center 2xl:py-[60px] py-12">
            <Image
              src="/images/profile-img.png"
              alt=""
              width={200}
              height={200}
              className="2xl:w-[200px] w-44 mb-5 2xl:mb-6"
            />
            <p className="text-white font-semibold text-center text-base 2xl:text-xl">
              Promise Onuoha
            </p>
          </div>
          <TapBar />
          <div className="w-full mt-[50px] 2xl:mt-[57px] flex justify-center">
            {children}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
