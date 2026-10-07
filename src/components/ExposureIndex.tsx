"use client";

import { useEffect, useRef, useState } from "react";

type StatKey = "pubkeys" | "var" | "sealed";

const BASE: Record<StatKey, number> = {
  pubkeys: 847_291,
  var: 2_847_000_000,
  sealed: 12_408,
};

function formatStat(key: StatKey, n: number) {
  if (key === "var") {
    if (n >= 1_000_000_000) return `$${(n / 1_000_000_000).toFixed(2)}B`;
    if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
    return `$${Math.round(n).toLocaleString()}`;
  }
  return Math.round(n).toLocaleString();
}

function useAnimatedStat(key: StatKey, duration = 2200) {
  const target = BASE[key];
  const [value, setValue] = useState(() => Math.floor(target * 0.92));
  const mounted = useRef(false);

  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    const start = performance.now();
    const from = value;
    const to = target;

    let raf: number;
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(from + (to - from) * eased);
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, duration, target]);

  useEffect(() => {
    const id = setInterval(() => {
      setValue((v) => {
        const r = (Date.now() % 1000) / 1000;
        const drift =
          key === "var"
            ? (r - 0.45) * 4_200_000
            : (r - 0.4) * (key === "pubkeys" ? 120 : 3);
        const next = v + drift;
        const floor = BASE[key] * 0.985;
        const ceil = BASE[key] * 1.018;
        return Math.min(ceil, Math.max(floor, next));
      });
    }, 3200);
    return () => clearInterval(id);
  }, [key]);

  return value;
}

function StatCard({
  label,
  statKey,
}: {
  label: string;
  statKey: StatKey;
}) {
  const value = useAnimatedStat(statKey);

  return (
    <div className="panel-steel flex flex-col justify-between rounded-sm p-5 sm:p-6">
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/40">
        {label}
      </p>
      <p
        className="mt-6 font-mono text-2xl tabular-nums tracking-wide text-foreground/85 sm:text-3xl"
        aria-live="polite"
      >
        {formatStat(statKey, value)}
      </p>
      <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.18em] text-foreground/25">
        Last tick // local sim
      </p>
    </div>
  );
}

export function ExposureIndex() {
  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <h2
          className="mb-8 font-bold text-xl tracking-[-0.04em] text-foreground/90 sm:text-2xl"
          style={{ letterSpacing: "-0.055em" }}
        >
          Exposure Index
        </h2>
        <div className="grid gap-4 sm:grid-cols-3 sm:gap-3">
          <StatCard label="Exposed pubkeys tracked" statKey="pubkeys" />
          <StatCard label="Value at risk" statKey="var" />
          <StatCard label="Addresses sealed" statKey="sealed" />
        </div>
      </div>
    </section>
  );
}
