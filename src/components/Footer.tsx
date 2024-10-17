import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaXTwitter, FaLinkedinIn, FaInstagram, FaTiktok } from "react-icons/fa6";
import { FaHome, FaUtensils, FaPhoneAlt, FaEllipsisH } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-20">
      {/* Desktop and Laptop View */}
      <div className="hidden md:flex justify-between items-start max-w-7xl mx-auto px-4">
        
        {/* Logo Section */}
        <div className="space-y-4">
          <Link href="/">
            <Image src="/images/logo-white.png" alt="Fast Buka Logo" width={120} height={80} />
          </Link>
          <p>Delicious Diversity, Delivered</p>
          <div className="flex space-x-4">
            {/* Social Media Icons */}
            <a href="#" className="bg-gray-700 w-8 h-8 rounded-full flex items-center justify-center">
              <FaFacebookF className="text-white" />
            </a>
            <a href="#" className="bg-gray-700 w-8 h-8 rounded-full flex items-center justify-center">
              <FaXTwitter className="text-white" />
            </a>
            <a href="#" className="bg-gray-700 w-8 h-8 rounded-full flex items-center justify-center">
              <FaLinkedinIn className="text-white" />
            </a>
            <a href="#" className="bg-gray-700 w-8 h-8 rounded-full flex items-center justify-center">
              <FaInstagram className="text-white" />
            </a>
            <a href="#" className="bg-gray-700 w-8 h-8 rounded-full flex items-center justify-center">
              <FaTiktok className="text-white" />
            </a>
          </div>
          <p className="text-center py-4 mt-8">© 2024. All Rights Reserved</p>
        </div>
        
        {/* Company Links */}
        <div className="space-y-2">
          <h4 className="font-semibold">COMPANY</h4>
          <ul>
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/menu" className="hover:underline">Our Menu</a></li>
            <li><a href="#" className="hover:underline">Vendors</a></li>
            <li><a href="#" className="hover:underline">Riders</a></li>
            <li><a href="https://afamfest.com" className="hover:underline" target="_blank">Afamfest</a></li>
          </ul>
        </div>

        {/* Useful Links */}
        <div className="space-y-2">
          <h4 className="font-semibold">USEFUL</h4>
          <ul>
            <li><a href="#" className="hover:underline">Blog</a></li>
            <li><a href="/about" className="hover:underline">About Us</a></li>
            <li><a href="/contact" className="hover:underline">Contact</a></li>
            <li><a href="/faq" className="hover:underline">FAQs</a></li>
          </ul>
        </div>

        {/* External Links */}
        <div className="space-y-2">
          <h4 className="font-semibold">EXTERNAL</h4>
          <ul>
            <li><a href="#" className="hover:underline">Become a Vendor</a></li>
            <li><a href="#" className="hover:underline">Become a Rider</a></li>
            <li><a href="/partner" className="hover:underline">Work with Us</a></li>
          </ul>
        </div>

        {/* Terms */}
        <div className="space-y-2">
          <h4 className="font-semibold">TERMS</h4>
          <ul>
            <li><a href="/privacy" className="hover:underline">Privacy Policy</a></li>
            <li><a href="/privacy" className="hover:underline">Terms of Use</a></li>
          </ul>
        </div>
      </div>

      {/* Mobile and Tablet View */}
      <div className="fixed md:hidden inset-x-0 bottom-0 bg-black flex justify-between items-center p-4 shadow-lg">
        <a href="/" className="text-white text-center">
          <FaHome className="w-8 h-8 mx-auto mb-1" />
          <span className="block text-sm">Home</span>
        </a>
        <a href="/menu" className="text-white text-center">
          <FaUtensils className="w-8 h-8 mx-auto mb-1" />
          <span className="block text-sm">Menu</span>
        </a>
        <a href="/contact" className="text-white text-center">
          <FaPhoneAlt className="w-8 h-8 mx-auto mb-1" />
          <span className="block text-sm">Contact</span>
        </a>
        <a href="#" className="text-white text-center">
          <FaEllipsisH className="w-8 h-8 mx-auto mb-1" />
          <span className="block text-sm">More</span>
        </a>
      </div>
    </footer>
  );
}