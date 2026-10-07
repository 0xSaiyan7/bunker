import { X_URL } from "@/lib/constants";

export function Hero() {
  return (
    <section className="px-4 pt-28 pb-16 sm:px-6 sm:pt-32 sm:pb-24 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-foreground/40">
          Protocol // $BUNKER
        </p>
        <h1
          className="mt-4 font-bold text-[clamp(2.75rem,12vw,5.5rem)] leading-[0.92] text-foreground/95"
          style={{ letterSpacing: "-0.055em" }}
        >
          BUNKER
          <br />
          MODE
        </h1>
        <p className="mt-8 max-w-md text-base leading-relaxed text-foreground/65 sm:text-lg">
          move your bags to an address that has never signed a transaction
        </p>

        <div className="mt-10">
          <a
            href={X_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center rounded-sm border border-white/[0.08] px-6 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/50 transition-colors hover:border-white/[0.14] hover:text-foreground/70 sm:w-auto"
          >
            X / Updates
          </a>
        </div>
      </div>
    </section>
  );
}
