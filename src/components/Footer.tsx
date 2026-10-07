import { X_URL } from "@/lib/constants";

const TICKER_ITEMS = [
  "BUNKER MODE ACTIVE",
  "HASH COMMITMENT STABLE",
  "MIGRATION QUEUE NOMINAL",
  "NO RECOVERY EVENT",
  "ECDSA EXPOSURE INDEXED",
  "SEALED EGRESS CLEAR",
  "THREAT WINDOW: MONTHS",
  "MAXIMUM DEFENSIVE POSTURE",
];

export function Footer() {
  const ticker = [...TICKER_ITEMS, ...TICKER_ITEMS].join("   ◆   ");

  return (
    <footer className="mt-auto border-t border-white/[0.06] bg-[#090908]/80">
      <div className="overflow-hidden border-b border-white/[0.04] py-2.5">
        <div className="ticker-track flex w-max whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/35">
          <span className="px-4">{ticker}</span>
          <span className="px-4" aria-hidden>
            {ticker}
          </span>
        </div>
      </div>

      <div className="mx-auto flex max-w-4xl flex-col gap-6 px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/40">
            $BUNKER // OPS TERMINAL
          </p>
          <a
            href={X_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/45 transition-colors hover:text-foreground/70"
          >
            x
          </a>
        </div>
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-foreground/25">
          maximum defensive acceleration.
        </p>
      </div>
    </footer>
  );
}
