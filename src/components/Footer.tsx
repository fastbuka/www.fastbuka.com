import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="w-full  pb-8 px-5 2xl:pb-10 flex justify-center">
      <div className="w-full @max-4xl:flex-col @max-4xl:gap-[100px] @max-5xl:px-8 @max-4xl:py-8 @max-4xl:px-5 max-w-[1312px] bg-[#EFFEF7] rounded-[32px] flex justify-between items-start p-16">
        <div className="w-max flex flex-col max-w-full">
          <Link href="/">
            <Image
              className="2xl:w-[169px] w-[149px] mb-[18px]"
              src="/images/logo.svg"
              width={169}
              height={88}
              alt=""
            />
          </Link>
          <p className="font-normal text-[#3D3D3D] text-base 2xl:text-xl mb-8">
            Delicious Diversity, Delivered
          </p>
          <div className="w-max flex items-center gap-4 mb-8">
            {socials.map((item, index) => (
              <Link key={index} href={item.path}>
                <Image
                  src={item.link}
                  alt=""
                  width={40}
                  height={40}
                  className="w-10"
                />
              </Link>
            ))}
          </div>
          <p className="font-normal text-[#888888] text-base 2xl:text-xl">
            ©{new Date().getFullYear()}. All Rights Reversed
          </p>
        </div>
        <div className="w-max flex @max-4xl:flex-col items-start @max-5xl:gap-[50px] gap-[100px]">
          {links.map((item, index) => {
            return (
              <div key={index} className="w-max flex flex-col gap-2.5">
                <h3 className="text-(--primary-green) py-1.5 font-medium text-base 2xl:text-xl">
                  {item.title}
                </h3>
                {item.links.map((link, linkIndex) => {
                  return (
                    <Link
                      href={link.href}
                      key={linkIndex}
                      className="text-[#3D3D3D] py-1.5 font-normal text-base 2xl:text-xl"
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </footer>
  );
}

const socials = [
  {
    link: "/images/socials/instagram.svg",
    path: "#",
  },
  {
    link: "/images/socials/x.svg",
    path: "#",
  },
  {
    link: "/images/socials/linkedin.svg",
    path: "#",
  },
  {
    link: "/images/socials/facebook.svg",
    path: "#",
  },
  {
    link: "/images/socials/tiktok.svg",
    path: "#",
  },
];

const links = [
  {
    title: "Company",
    links: [
      { name: "Browse Stores", href: "/browse-stores" },
      { name: "About", href: "/about" },
      { name: "Contact", href: "/contact-us" },
    ],
  },
  {
    title: "Use Cases",
    links: [
      { name: "Customer", href: "#" },
      { name: "Vendors", href: "#" },
      { name: "Riders", href: "#" },
    ],
  },
  {
    title: "Terms",
    links: [
      { name: "Terms & Conditions", href: "#" },
      { name: "Privacy Policy", href: "#" },
    ],
  },
];
