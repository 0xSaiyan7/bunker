"use client";

import { useEffect, useState } from "react";

type MigrationStatus = "MIGRATING" | "SEALED" | "ROTATING";

type MigrationRow = {
  id: string;
  from: string;
  status: MigrationStatus;
  btc: string;
  at: string;
};

const STATUSES: MigrationStatus[] = ["MIGRATING", "SEALED", "ROTATING"];

function randomHex(bytePairs: number) {
  const chars = "0123456789abcdef";
  let s = "0x";
  for (let i = 0; i < bytePairs * 2; i++) {
    s += chars[Math.floor(Math.random() * 16)];
  }
  return s;
}

function truncateAddr(addr: string) {
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
}

function randomBtc() {
  const n = Math.random() * 42 + 0.02;
  return n.toFixed(n < 1 ? 4 : 2);
}

function randomTime() {
  const d = new Date();
  return d.toISOString().slice(11, 19);
}

function makeRow(): MigrationRow {
  const status = STATUSES[Math.floor(Math.random() * STATUSES.length)];
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    from: randomHex(20),
    status,
    btc: randomBtc(),
    at: randomTime(),
  };
}

const SEED_ROWS: MigrationRow[] = [
  {
    id: "seed-1",
    from: "0x7f3a8c2b1d9e4f5a6b7c8d9e0f1a2b3c4d5e6f7",
    status: "SEALED",
    btc: "2.41",
    at: "18:02:11",
  },
  {
    id: "seed-2",
    from: "0x4a2e9f1c8b7d6e5f4a3b2c1d0e9f8a7b6c5d4e3",
    status: "MIGRATING",
    btc: "0.8842",
    at: "18:01:44",
  },
  {
    id: "seed-3",
    from: "0x9c1d4e7f2a8b5c6d3e0f1a2b9c8d7e6f5a4b3c2",
    status: "ROTATING",
    btc: "12.08",
    at: "18:01:02",
  },
  {
    id: "seed-4",
    from: "0x2b8f6a4c1e9d0f3a7b5c2e8d4f1a6b9c3e0d7f2",
    status: "SEALED",
    btc: "4.12",
    at: "18:00:31",
  },
  {
    id: "seed-5",
    from: "0x6e3a1f9c8d7b6a5e4f3c2b1a0d9e8f7c6b5a4e3",
    status: "MIGRATING",
    btc: "0.1204",
    at: "17:59:58",
  },
  {
    id: "seed-6",
    from: "0x1a0b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2",
    status: "SEALED",
    btc: "28.6",
    at: "17:59:12",
  },
  {
    id: "seed-7",
    from: "0xf5e4d3c2b1a0f9e8d7c6b5a4f3e2d1c0b9a8f7e6",
    status: "ROTATING",
    btc: "1.02",
    at: "17:58:40",
  },
  {
    id: "seed-8",
    from: "0x3c7e9a1b5d8f2e4c6a0b3d5f7e9a1c3e5b7d9f1",
    status: "MIGRATING",
    btc: "6.77",
    at: "17:58:05",
  },
];

export function MigrationMonitor() {
  const [rows, setRows] = useState<MigrationRow[]>(SEED_ROWS);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
    setRows((prev) => {
      const extra = Array.from({ length: 2 }, () => makeRow());
      return [...extra, ...prev].slice(0, 14);
    });
  }, []);

  useEffect(() => {
    if (!ready) return;
    const tick = () => {
      setRows((prev) => {
        const next = [makeRow(), ...prev];
        return next.slice(0, 14);
      });
    };
    const id = setInterval(tick, 4000);
    return () => clearInterval(id);
  }, [ready]);

  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-baseline justify-between gap-4">
          <h2
            className="font-bold text-xl tracking-[-0.04em] text-foreground/90 sm:text-2xl"
            style={{ letterSpacing: "-0.055em" }}
          >
            Migration Monitor
          </h2>
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-amber/70">
            Live // Sim
          </span>
        </div>

        <div className="panel-steel overflow-hidden rounded-sm">
          <div className="grid grid-cols-[minmax(0,1.1fr)_minmax(0,0.7fr)_minmax(0,0.9fr)_minmax(0,0.5fr)] gap-2 border-b border-white/[0.06] px-3 py-2.5 font-mono text-[9px] uppercase tracking-[0.15em] text-foreground/35 sm:gap-3 sm:px-4 sm:text-[10px]">
            <span>From</span>
            <span>To</span>
            <span>Status</span>
            <span className="text-right">BTC</span>
          </div>
          <ul className="divide-y divide-white/[0.04]">
            {rows.map((row, i) => (
              <li
                key={row.id}
                className={`grid grid-cols-[minmax(0,1.1fr)_minmax(0,0.7fr)_minmax(0,0.9fr)_minmax(0,0.5fr)] gap-2 px-3 py-2.5 font-mono text-[10px] tracking-wide sm:gap-3 sm:px-4 sm:text-xs ${
                  i === 0 ? "bg-white/[0.02]" : ""
                }`}
              >
                <span className="truncate text-foreground/55">
                  {truncateAddr(row.from)}
                </span>
                <span className="text-foreground/40">SEALED</span>
                <label className="min-w-0">
                  <span className="sr-only">Status</span>
                  <select
                    value={row.status}
                    aria-readonly
                    tabIndex={-1}
                    className="pointer-events-none w-full max-w-full cursor-default appearance-none truncate rounded-sm border border-white/[0.08] bg-black/30 py-0.5 pl-1.5 pr-5 text-[9px] uppercase tracking-wide text-foreground/50 sm:text-[10px]"
                    onChange={() => {}}
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </label>
                <span className="text-right text-foreground/45">{row.btc}</span>
              </li>
            ))}
          </ul>
          <div className="border-t border-white/[0.06] px-3 py-2 font-mono text-[9px] uppercase tracking-[0.2em] text-foreground/30 sm:px-4">
            Ingest // {rows.length} events buffered
          </div>
        </div>
      </div>
    </section>
  );
}
