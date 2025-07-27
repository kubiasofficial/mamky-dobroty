"use client";

import Link from 'next/link';

export default function Kontakt() {
  return (
    <>
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <h2>Dobroty od mamky</h2>
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
          <p><strong>Telefon:</strong> +420 605 198 143</p>
          <p><strong>Email:</strong> suslice1@seznam.cz</p>
          <p><strong>Místo:</strong> Rychnov nad Kněžnou</p>
          <p><strong>Adresa:</strong> Jirsákova 1802, Rychnov nad Kněžnou</p>
        </section>
      </main>
    </>
  );
}