import "./globals.css";
import { Red_Hat_Display } from "next/font/google";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import { NextAuthProvider } from "./providers";

const inter = Red_Hat_Display({ subsets: ["latin"] });

export const metadata = {
  title: "Mail Tracker",
  description:
    "Effortlessly track email delivery and engagement to optimize your communication.",
  icons: {
    icon: { url: "/favicon.svg", type: "image/svg" },
    shortcut: { url: "/favicon.svg", type: "image/svg" }
  }
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <Navbar />
          {children}
          <Footer />
        </NextAuthProvider>
      </body>
    </html>
  );
}
