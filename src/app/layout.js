import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from 'react-hot-toast';


export const metadata = {
  title: "VidStream",
  description: "A platform for streaming videos",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={` antialiased`}
      >
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
