import LogoutButton from "@/components/profile/LogoutButton";
import ProfileForm from "@/components/profile/ProfileForm";
import React from "react";

export default function Page() {
  return (
    <div className="w-max max-w-full mb-[139px] 2xl:mb-[169px] flex flex-col items-center">
      <h2 className="text-(--primary-black) text-center mb-2.5 font-semibold text-[28px] 2xl:text-[32px]">
        Profile Details
      </h2>
      <p className="text-center font-normal text-[#5D5D5D] text-sm 2xl:text-base 2xl:mb-[50px] mb-10">
        Manage your account details, delivery spots, and taste preferences in
        one place.
      </p>
      <ProfileForm />
      <div className="w-[500px] max-w-full py-6 px-2.5 flex flex-col gap-7">
        <LogoutButton />
      </div>
    </div>
  );
}
