import { Inter } from "next/font/google";
import "./globals.css";
import Link from 'next/link';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Mamky Dobroty",
  description: "Domácí pečení s láskou - na zakázku",
};

export default function RootLayout({ children }) {
  return (
    <html lang="cs">
      <body className={inter.className}>
        <header className="header">
          <div className="header-content">
            <div className="logo">
              <h2>Mamky Dobroty</h2>
            </div>
            <nav className="navigation">
              <Link href="/" className="nav-link">Domů</Link>
              <Link href="/nabidka" className="nav-link">Nabídka</Link>
              <Link href="/kontakt" className="nav-link active">Kontakt</Link>
            </nav>
          </div>
        </header>

        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
