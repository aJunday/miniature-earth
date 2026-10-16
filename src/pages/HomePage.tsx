import { WorldPreview } from '../components';
import { WORLD } from '../config';

export function HomePage() {
  return (
    <main className="flex min-h-svh flex-col items-center overflow-hidden bg-sky px-5 text-forest">
      <header className="relative z-10 mt-[clamp(3rem,10vh,7rem)] text-center">
        <p className="mb-3 text-xs font-bold tracking-[0.25em] text-forest/65 uppercase">
          A little world of possibility
        </p>
        <h1 className="font-display text-[clamp(3.25rem,9vw,6.5rem)] leading-[1.05] font-bold tracking-tight">
          {WORLD.title}
        </h1>
        <p className="mt-4 text-[clamp(1.1rem,2.8vw,1.5rem)] font-medium text-forest/80">
          {WORLD.tagline}
        </p>
      </header>
      <section
        aria-label="A spinning rounded green box: a preview of your miniature world"
        className="relative h-[clamp(20rem,53vh,32rem)] w-full max-w-3xl flex-none"
      >
        <WorldPreview />
      </section>
      <footer className="mt-auto pb-7 text-center text-xs font-semibold tracking-[0.12em] text-forest/60 uppercase">
        Small beginnings. Endless possibilities.
      </footer>
    </main>
  );
}
