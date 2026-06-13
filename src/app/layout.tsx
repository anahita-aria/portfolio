import type { Metadata } from "next";
import { Aldrich, Inter, Manrope, Montserrat, Poppins, Rowdies, Zen_Dots } from "next/font/google";
import "./globals.css";
import { GlobalNav } from "@/components/global-nav";
import { Footer } from "@/components/footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
});

const zenDots = Zen_Dots({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-zen-dots",
});

const aldrich = Aldrich({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-aldrich",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
});

const rowdies = Rowdies({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-rowdies",
});

export const metadata: Metadata = {
  title: "Anahita Aria — Product Designer",
  description:
    "Portfolio of Anahita Aria, a Product Designer with 6+ years of experience in UX/UI design, user research, and design systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} ${montserrat.variable} ${zenDots.variable} ${aldrich.variable} ${manrope.variable} ${rowdies.variable} antialiased`}>
      <body className="min-h-screen flex flex-col font-sans">
        <GlobalNav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
