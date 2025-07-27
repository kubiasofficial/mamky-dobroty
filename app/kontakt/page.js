"use client";

import Link from 'next/link';

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