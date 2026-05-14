"use client";

import { useState } from "react";

type FaqEntry = { q: string; a: string };

export default function FaqAccordion({ items }: { items: FaqEntry[] }) {
  const [open, setOpen] = useState<number | null>(0);
  if (!items.length) return null;

  return (
    <div className="border border-(--color-border) rounded-md bg-(--color-card) divide-y divide-(--color-border)">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              className="w-full flex items-center justify-between text-left p-5 hover:bg-(--color-background)/50 transition"
            >
              <span className="font-medium pr-4">{item.q}</span>
              <span
                className={`text-(--color-muted) transition-transform ${isOpen ? "rotate-45" : ""}`}
                aria-hidden
              >
                +
              </span>
            </button>
            {isOpen && (
              <div className="px-5 pb-5 text-(--color-subtle) text-sm leading-relaxed">
                {item.a}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
