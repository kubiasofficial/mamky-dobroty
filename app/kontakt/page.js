"use client";

import Link from 'next/link';
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Mamky Dobroty',
  description: 'Domácí pečení s láskou - na zakázku',
}

export default function RootLayout({ children }) {
  return (
    <html lang="cs">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}

export default function Kontakt() {
  return (
    <>
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
        <section className="contact">
          <h2>Kontakt</h2>
          <p><strong>Telefon:</strong> +420 123 456 789</p>
          <p><strong>Email:</strong> mamka@dobroty.cz</p>
          <p><strong>Místo:</strong> Liberec a okolí</p>
        </section>
      </main>
    </>
  );
}