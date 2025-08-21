import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/homePage/footer/Footer";
import ResponsiveNav from "@/components/navbar/Responsive";
import Providers from "@/components/Providers";
import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";
import ScrollToTop from "@/components/helper/ScrollToTop";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pedal Safari | Tours and Travel",
  description: "Explore the best tours and travel experiences with Pedal Safari.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
 const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Providers session={session}>
          <ResponsiveNav />
          {children}
          <ScrollToTop />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
