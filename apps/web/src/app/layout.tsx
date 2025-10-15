import "./globals.css";
import { Roboto_Flex, Michroma } from "next/font/google";

const body = Roboto_Flex({ subsets: ["latin"], variable: "--font-roboto-flex", display: "swap" });
const heading = Michroma({ weight: "400", subsets: ["latin"], variable: "--font-michroma", display: "swap" });

export const metadata = {
  title: "MohammadReza Safdarian",
  description: "My Portfolio & Rock Climbing Class Booking Platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${body.variable} ${heading.variable} h-full`}>
      <body className="h-full bg-black text-white overflow-hidden">{children}</body>
    </html>
  );
}
