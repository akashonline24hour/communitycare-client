import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "next-themes";
import SocialAuthToast from "@/components/SocialAuthToast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Hermione Community Events",
  description: "Connecting hearts to empower local communities.",
  icons: {
    icon: [
      {
        url: "/logo.png",
        type: "image/png",
        sizes: "32x32",
      },
      {
        url: "/logo.png",
        type: "image/png",
        sizes: "192x192",
      },
    ],
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};
export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            theme="colored"
          />
          <SocialAuthToast />
        </ThemeProvider>
      </body>
    </html>
  );
}
