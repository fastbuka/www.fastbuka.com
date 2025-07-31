export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      style={{ backgroundImage: "url(/images/authentication/login-bg.png)" }}
      className="w-full bg-no-repeat bg-cover h-screen flex justify-center items-center bg-[#116A43]"
    >
      <div className="w-max h-max max-h-full @max-2xl:w-full @max-2xl:h-full @max-2xl:rounded-none @max-2xl:flex @max-2xl:items-center max-w-full overflow-y-auto scroll-hidden bg-[#EFFEF7] rounded-[12px]">
        {" "}
        {children}
      </div>
    </div>
  );
}
