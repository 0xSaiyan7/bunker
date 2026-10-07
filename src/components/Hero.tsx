"use client";

import { useCallback, useState } from "react";
import { CONTRACT_ADDRESS, PUMP_FUN_URL, X_URL } from "@/lib/constants";

function truncateCa(ca: string) {
  if (ca.length <= 16) return ca;
  return `${ca.slice(0, 6)}…${ca.slice(-6)}`;
}

export function Hero() {
  const [copied, setCopied] = useState(false);

  const copyCa = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(CONTRACT_ADDRESS);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }, []);

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

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <button
            type="button"
            onClick={copyCa}
            className="panel-steel group flex w-full min-w-0 items-center justify-between gap-3 rounded-sm px-4 py-3 text-left transition-colors hover:border-amber/25 sm:w-auto sm:min-w-[280px]"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/40">
              Contract
            </span>
            <span className="truncate font-mono text-xs tracking-wide text-foreground/75">
              {truncateCa(CONTRACT_ADDRESS)}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-amber/80">
              {copied ? "Copied" : "Copy"}
            </span>
          </button>

          <a
            href={PUMP_FUN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center rounded-sm border border-amber/35 bg-amber/[0.08] px-6 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-amber transition-colors hover:bg-amber/[0.14] sm:w-auto"
          >
            Buy on pump.fun
          </a>

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
