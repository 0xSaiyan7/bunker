"use client";

import { useEffect, useRef, useState } from "react";
import { THREAT_LOG_LINES } from "@/lib/constants";

function formatClock(d: Date) {
  return d.toISOString().slice(11, 19);
}

export function ThreatReadout() {
  const [lines, setLines] = useState<string[]>([]);
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [clock, setClock] = useState("--:--:--");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setClock(formatClock(new Date()));
    const id = setInterval(() => setClock(formatClock(new Date())), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const full = THREAT_LOG_LINES[lineIndex];
    if (charIndex < full.length) {
      const delay = 28 + Math.random() * 40;
      const t = window.setTimeout(() => {
        setCharIndex((c) => c + 1);
      }, delay);
      return () => clearTimeout(t);
    }

    const prefix = `[${formatClock(new Date())}] `;
    const completed = prefix + full;
    setLines((prev) => {
      const next = [...prev, completed];
      return next.slice(-24);
    });
    setCharIndex(0);
    setLineIndex((i) => (i + 1) % THREAT_LOG_LINES.length);

    return undefined;
  }, [lineIndex, charIndex]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines, charIndex]);

  const current = THREAT_LOG_LINES[lineIndex];
  const partial = current.slice(0, charIndex);

  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <h2
          className="mb-6 font-bold text-xl text-foreground/90 sm:text-2xl"
          style={{ letterSpacing: "-0.055em" }}
        >
          Threat Readout
        </h2>
        <div className="panel-steel overflow-hidden rounded-sm border border-[#1a2a1f]/80 bg-[#060807]">
          <div className="border-b border-white/[0.04] px-3 py-2 font-mono text-[9px] uppercase tracking-[0.25em] text-[var(--terminal-green-bright)]/50 sm:px-4">
            Curve watch // passive scan
          </div>
          <div
            ref={scrollRef}
            className="max-h-[220px] overflow-y-auto overflow-x-hidden px-3 py-4 font-mono text-[11px] leading-relaxed sm:max-h-[260px] sm:px-4 sm:text-xs"
          >
            {lines.map((line, i) => (
              <div
                key={`${i}-${line.slice(0, 12)}`}
                className="text-[var(--terminal-green)]/75"
              >
                {line}
              </div>
            ))}
            <div className="text-[var(--terminal-green-bright)]/85">
              [{clock}] {partial}
              <span className="cursor-blink inline-block w-[7px] bg-[var(--terminal-green)]/60">
                &nbsp;
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
