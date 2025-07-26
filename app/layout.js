import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Mamky Dobroty",
  description: "Domácí pečení s láskou - na zakázku",
};

export default function RootLayout({ children }) {
  return (
    <html lang="cs">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
