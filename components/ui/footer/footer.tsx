import { Label } from "@radix-ui/react-dropdown-menu";
import { Facebook, Instagram, Linkedin, SendHorizonal, Twitter } from "lucide-react";
import Link from "next/link";
import { Input } from "../input";
import { Button } from "../button";

export const Footer = () => {
  return (
    <footer className="bg-blue-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-4 mb-4 border-b border-black/10 dark:border-white/10 pb-4">
          <div className="font-mono">
            <Label className="font-bold text-xl mb-2 col-span-4 md:col-span-1">
              E-VENT HORIZON
            </Label>
            <Label>
              Discover and create unforgettable events.
            </Label>
          </div>
          <div className="font-mono">
            <Label className="font-bold text-xl mb-2 col-span-4 md:col-span-1">
              Quick Links
            </Label>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  About us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Contact
                </Link>
              </li>

              <li>
                <Link href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <div className="font-mono">
            <Label className="font-bold text-xl mb-2 col-span-4 md:col-span-1">
              Follow Us
            </Label>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <Facebook className="w-6 h-6" />
              </Link>
              <Link href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <Instagram className="w-6 h-6" />
              </Link>
              <Link href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <Linkedin className="w-6 h-6" />
              </Link>
              <Link href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <Twitter className="w-6 h-6" />
              </Link>
            </div>
          </div>
          <div className="font-mono">
            <Label className="font-bold text-xl mb-2 col-span-4 md:col-span-1">
              Newsletter
            </Label>
            <Label className="text-sm mb-2">
              Subscribe to our newsletter for the latest updates.
            </Label>
            <form className="flex flex-row space-x-1">
              <Input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              />
              <Button
                type="submit"
                className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 dark:hover:bg-blue-500 hover:cursor-pointer transition-colors"
              >
                <SendHorizonal className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center">

          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="text-sm font-mono">&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );

}