import Image from 'next/image';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* Horní lišta s textem "Vítejte u Mamky Dobroty" */}
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Vítejte u &nbsp;
          <code className="font-mono font-bold">Mamky Dobroty</code>
        </p>
        {/* Původní blok s logem Vercel byl odstraněn */}
      </div>

      {/* Blok s logem Mamky Dobroty uprostřed stránky */}
      <div className="relative z-[-1] flex place-items-center">
        <Image
          className="relative rounded-full shadow-lg" // Přidány třídy pro zaoblené rohy a stín, aby logo lépe vyniklo
          src="/mamky-dobroty-logo.png" // ZDE JE CESTA K TVÉMU NOVÉMU LOGU
          alt="Logo Mamky Dobroty"
          width={300} // Uprav rozměry podle potřeby, aby logo vypadalo dobře
          height={300}
          priority
        />
      </div>

      {/* Spodní navigační odkazy */}
      <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
        <a
          href="#" // Změněno na #, později zde budou skutečné cesty
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            O nás{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Přečtěte si, kdo jsme a co pro vás pečeme.
          </p>
        </a>

        <a
          href="#" // Změněno na #
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Produkty{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Prohlédněte si naši nabídku čerstvých dobrot.
          </p>
        </a>

        <a
          href="#" // Změněno na #
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Objednávka{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Vytvořte si objednávku snadno a rychle.
          </p>
        </a>

        <a
          href="#" // Změněno na #
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Kontakt{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Napište nám, rádi vám odpovíme.
          </p>
        </a>
      </div>
    </main>
  );
}