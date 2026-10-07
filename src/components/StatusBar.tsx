"use client";

import { useEffect, useState } from "react";
import { STATUS_CYCLE } from "@/lib/constants";

export function StatusBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % STATUS_CYCLE.length);
    }, 4200);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 border-b border-white/[0.06] bg-[#0a0a09]/92 backdrop-blur-sm">
      <div className="flex items-center gap-3 px-4 py-2 sm:px-6">
        <span
          className="amber-pulse h-1.5 w-1.5 shrink-0 rounded-full bg-amber"
          aria-hidden
        />
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/70 sm:text-[11px]">
          <span className="text-foreground/55">SYS // </span>
          {STATUS_CYCLE[index]}
          <span className="cursor-blink ml-0.5 inline-block w-[6px] bg-amber/80">
            &nbsp;
          </span>
        </p>
      </div>
    </header>
  );
}
