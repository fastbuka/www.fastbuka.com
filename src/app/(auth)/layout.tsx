export default function AuthenticationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="w-full @container">{children}</main>;
}
