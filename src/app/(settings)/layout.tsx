"use client";
import Footer from "@/components/Footer";
import GoBack from "@/components/GoBack";
import NavBarTwo from "@/components/NavBarTwo";
import TapBar from "@/components/profile/TapBar";
import { useUser } from "@/contexts/UserContext";
import Image from "next/image";
import { useEffect } from "react";
import cookie from "js-cookie";
import { useRouter } from "next/navigation";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    const token = cookie.get("TOKEN");
    if (!token && !user) {
      router.replace("/login");
    }
  }, []);

  return (
    <main className="w-full @container flex flex-col bg-[#F6FFFB]">
      <div className="w-full @max-4xl:pt-6 pt-7 2xl:pt-10  h-max flex flex-col items-center">
        <NavBarTwo />
        <div className="2xl:mt-14 mt-12 w-full max-w-[1210px] px-5 h-max flex flex-col">
          <div className="2xl:mb-[58px] mb-12">
            <GoBack />
          </div>
          <div className="w-full 2xl:mb-[60px] mb-12 h-max rounded-[17px] profile-background-card flex flex-col items-center 2xl:py-12 py-10">
            <Image
              src="/images/profile-img.png"
              alt=""
              width={200}
              height={200}
              className="2xl:w-44 w-32 mb-5 2xl:mb-6"
            />
            <p className="text-white font-semibold text-center text-base 2xl:text-xl">
              {`${user?.first_name} ${user?.last_name}`}
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
