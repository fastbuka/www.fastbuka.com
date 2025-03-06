'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  FaFacebookF,
  FaXTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaTiktok,
  FaHouse,
  FaBowlFood,
  FaWallet,
  FaCartArrowDown,
} from 'react-icons/fa6';
import { useEffect, useState } from 'react';
import { useCart } from '@/hooks/Partials/use-cart';


export default function AppFooter() {
  const { cart } = useCart();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <footer className='bg-black text-white py-20'>
      {/* Desktop and Laptop View */}
      <div className='hidden md:flex justify-between items-start max-w-7xl mx-auto px-4'>
        {/* Logo Section */}
        <div className='space-y-4'>
          <Link href='/'>
            <Image
              src='/images/logo-white.png'
              alt='Fast Buka Logo'
              width={120}
              height={80}
            />
          </Link>
          <p>Delicious Diversity, Delivered</p>
          <div className='flex space-x-4'>
            {/* Social Media Icons */}
            <a
              href='#'
              className='bg-[#0faf62] w-6 h-6 rounded-full flex items-center justify-center'
            >
              <FaFacebookF className='text-white' />
            </a>
            <a
              href='https://x.com/fastbuka'
              className='bg-[#0faf62] w-6 h-6 rounded-full flex items-center justify-center'
              target='_blank'
            >
              <FaXTwitter className='text-white' />
            </a>
            <a
              href='https://www.linkedin.com/company/fastbukadelivery/'
              className='bg-[#0faf62] w-6 h-6 rounded-full flex items-center justify-center'
              target='_blank'
            >
              <FaLinkedinIn className='text-white' />
            </a>
            <a
              href='https://www.instagram.com/fastbuka/'
              className='bg-[#0faf62] w-6 h-6 rounded-full flex items-center justify-center'
              target='_blank'
            >
              <FaInstagram className='text-white' />
            </a>
            <a
              href='https://tiktok.com/@fastbukadelivery'
              className='bg-[#0faf62] w-6 h-6 rounded-full flex items-center justify-center'
              target='_blank'
            >
              <FaTiktok className='text-white' />
            </a>
          </div>
          <p className='text-center py-4 mt-8'>© 2024. All Rights Reserved</p>
        </div>

        {/* Company Links */}
        <div className='space-y-2'>
          <h4 className='font-extraBold  text-[#0faf62] '>COMPANY</h4>
          <ul>
            <li>
              <a href='/' className='hover:underline hover:text-[#0faf62]'>
                Home
              </a>
            </li>
            <li>
              <a href='/menu' className='hover:underline hover:text-[#0faf62]'>
                Our Menu
              </a>
            </li>
            <li>
              <a href='#' className='hover:underline hover:text-[#0faf62]'>
                Vendors
              </a>
            </li>
            <li>
              <a href='#' className='hover:underline hover:text-[#0faf62]'>
                Riders
              </a>
            </li>
            <li>
              <a
                href='https://afamfest.com'
                className='hover:underline hover:text-[#0faf62]'
                target='_blank'
              >
                Afamfest
              </a>
            </li>
          </ul>
        </div>

        {/* Useful Links */}
        <div className='space-y-2'>
          <h4 className='font-extraBold  text-[#0faf62]'>USEFUL</h4>
          <ul>
            <li>
              <a href='#' className='hover:underline hover:text-[#0faf62]'>
                Blog
              </a>
            </li>
            <li>
              <a href='/about' className='hover:underline hover:text-[#0faf62]'>
                About Us
              </a>
            </li>
            <li>
              <a
                href='/contact'
                className='hover:underline hover:text-[#0faf62]'
              >
                Contact
              </a>
            </li>
            <li>
              <a href='/faq' className='hover:underline hover:text-[#0faf62]'>
                FAQs
              </a>
            </li>
          </ul>
        </div>

        {/* External Links */}
        <div className='space-y-2'>
          <h4 className='font-extraBold  text-[#0faf62]'>EXTERNAL</h4>
          <ul>
            <li>
              <a href='#' className='hover:underline hover:text-[#0faf62]'>
                Become a Vendor
              </a>
            </li>
            <li>
              <a href='#' className='hover:underline hover:text-[#0faf62]'>
                Become a Rider
              </a>
            </li>
            <li>
              <a
                href='/partner'
                className='hover:underline hover:text-[#0faf62]'
              >
                Work with Us
              </a>
            </li>
          </ul>
        </div>

        {/* Terms */}
        <div className='space-y-2'>
          <h4 className='font-extraBold  text-[#0faf62]'>TERMS</h4>
          <ul>
            <li>
              <a
                href='/privacy'
                className='hover:underline hover:text-[#0faf62]'
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a href='/terms' className='hover:underline hover:text-[#0faf62]'>
                Terms of Use
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Mobile and Tablet View */}
      <div className='fixed hidden z-40 inset-x-0 bottom-0 bg-black justify-between items-center p-3 shadow-lg'>
        <a href='/' className='text-white text-center'>
          <FaHouse className='w-6 h-6 mx-auto mb-1' />
          <span className='block text-xs font-thin'>Home</span>
        </a>
        <a href='/feeds' className='text-white text-center'>
          <FaBowlFood className='w-6 h-6 mx-auto mb-1' />
          <span className='block text-xs font-thin'>Menu</span>
        </a>
        <a href='/wallet' className='text-white text-center'>
          <FaWallet className='w-6 h-6 mx-auto mb-1' />
          <span className='block text-xs font-thin'>Wallet</span>
        </a>
        <a href='/cart' className='relative text-white text-center'>
          <FaCartArrowDown className='w-6 h-6 mx-auto mb-1' />
          {cart.length > 0 && (
            <span className='absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center'>
              {cart.length}
            </span>
          )}
          <span className='block text-xs font-thin'>Cart</span>
        </a>
      </div>
    </footer>
  );
}
