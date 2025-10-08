import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Ice Athlete",
  description: "Portfolio & class booking platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full bg-black text-black`}>
        {/* Top bar (can be removed if you want totally bare) */}
        <nav className="h-12 border-b border-amber-500 backdrop-blur-sm bg-white">
          <div className="max-w-6xl mx-auto h-full px-4 flex items-center justify-between">
            {/* Left side - Logo */}
            <a href="/" className="flex items-center gap-2">
              <img
                src="/images/MRS_Logo.svg"
                alt="MRS Logo"
                className="h-7 w-auto"
              />
            </a>

            {/* Right side - Nav links */}
            <div className="flex items-center gap-6 text-sm">
              <a href="/classes" className="hover:text-white">
                Classes
              </a>
              <a href="/contact" className="hover:text-white">
                Contact
              </a>
            </div>
          </div>
        </nav>

        {children}
      </body>
    </html>
  );
}