import Image from "next/image";

export default function AccountRegistrationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full h-screen flex items-start">
      <Image
        src="/images/authentication/sign-up-bg.png"
        alt=""
        width={715}
        height={1024}
        className="h-full w-max @max-4xl:hidden object-cover max-w-[50%]"
      />
      <div className="w-full h-full overflow-y-auto bg-[#EFFEF7]">
        {children}
      </div>
    </div>
  );
}
