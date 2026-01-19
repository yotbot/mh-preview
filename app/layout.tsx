import type { Metadata } from "next";
import { Inter, Bebas_Neue } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Marc van de Haar | Business Consultant & Entrepreneur",
  description:
    "Trusted, tailor-made advice that drives clarity. Serial entrepreneur and business consultant helping companies with strategy, reorganisation, and growth. Based in Rotterdam.",
  keywords: [
    "business consultant",
    "entrepreneur",
    "business strategy",
    "reorganisation",
    "corporate consulting",
    "Rotterdam",
    "Marc van de Haar",
  ],
  authors: [{ name: "Marc van de Haar" }],
  openGraph: {
    title: "Marc van de Haar | Business Consultant & Entrepreneur",
    description:
      "Trusted, tailor-made advice that drives clarity. Serial entrepreneur helping companies with strategy, reorganisation, and growth.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Marc van de Haar | Business Consultant",
    description:
      "Trusted, tailor-made advice that drives clarity. Serial entrepreneur and business consultant.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${bebasNeue.variable} font-(family-name:--font-inter) antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
