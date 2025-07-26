"use client";

import Image from 'next/image';

export default function Home() {
  return (
    <main>
      <section className="hero">
        <Image
          src="/mamky-dobroty-logo.png"
          alt="Logo Mamky Dobroty"
          width={120}
          height={120}
          className="logo"
          priority
        />
        <h1>Dobroty od mamky</h1>
        <p>Domácí pečení s láskou – na zakázku</p>
      </section>

      <section className="menu">
        <h2>Nabídka</h2>
        <div className="menu-grid">
          <div className="menu-item">
            <Image src="/product-cake.jpg" alt="Ovocný dort" width={300} height={200} />
            <h3>Ovocný dort</h3>
            <p>Lehký krém, piškot a čerstvé ovoce.</p>
            <p><strong>od 450 Kč</strong></p>
          </div>
          <div className="menu-item">
            <Image src="/product-croissant.jpg" alt="Plněné rohlíčky" width={300} height={200} />
            <h3>Plněné rohlíčky</h3>
            <p>Na slano i na sladko – ideální na oslavy.</p>
            <p><strong>7 Kč / kus</strong></p>
          </div>
          <div className="menu-item">
            <Image src="/product-macarons.jpg" alt="Makronky" width={300} height={200} />
            <h3>Makronky</h3>
            <p>Křehké, barevné a plné chuti.</p>
            <p><strong>15 Kč / kus</strong></p>
          </div>
        </div>
      </section>

      <section className="contact">
        <h2>Kontakt</h2>
        <p><strong>Telefon:</strong> +420 123 456 789</p>
        <p><strong>Email:</strong> mamka@dobroty.cz</p>
        <p><strong>Místo:</strong> Liberec a okolí</p>
      </section>
    </main>
  );
}
