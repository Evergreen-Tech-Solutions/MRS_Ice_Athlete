import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { Roboto_Flex, Michroma } from "next/font/google";

export const runtime = 'nodejs';

const body = Roboto_Flex({
  subsets: ["latin"],
  variable: "--font-roboto-flex",
  display: "swap",
});
const heading = Michroma({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-michroma",
  display: "swap",
});

export const metadata = {
  title: "MohammadReza Safdarian",
  description: "My Portfolio & Rock Climbing Class Booking Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${body.variable} ${heading.variable} h-full`}>
      <body className="h-full overflow-hidden bg-stone-950">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
