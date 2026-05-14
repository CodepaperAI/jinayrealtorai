"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import type { GalleryImage } from "@/lib/types";

export default function Gallery({ images, projectName }: { images: GalleryImage[]; projectName: string }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (openIdx === null) return;
      if (e.key === "Escape") setOpenIdx(null);
      if (e.key === "ArrowRight") setOpenIdx((i) => (i === null ? null : (i + 1) % images.length));
      if (e.key === "ArrowLeft") setOpenIdx((i) => (i === null ? null : (i - 1 + images.length) % images.length));
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIdx, images.length]);

  if (!images?.length) return null;

  return (
    <section className="mx-auto max-w-6xl px-6 mt-14">
      <div className="flex items-end justify-between mb-6">
        <h2 className="font-display text-3xl font-bold tracking-tight">The project</h2>
        <span className="text-sm text-(--color-muted)">
          {images.length} {images.length === 1 ? "image" : "images"}
        </span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {images.map((img, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setOpenIdx(i)}
            className={
              "relative aspect-[4/3] overflow-hidden rounded-md bg-(--color-background) group focus:outline-none focus:ring-2 focus:ring-(--color-accent) " +
              (i === 0 ? "sm:col-span-2 sm:row-span-2 sm:aspect-square" : "")
            }
            aria-label={`Open image ${i + 1}: ${img.caption || img.category}`}
          >
            <Image
              src={img.url}
              alt={img.caption || `${projectName} – ${img.category}`}
              fill
              sizes={i === 0 ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 50vw, 33vw"}
              className="object-cover group-hover:scale-105 transition duration-500"
            />
            {img.caption && (
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-white text-sm opacity-0 group-hover:opacity-100 transition">
                {img.caption}
              </div>
            )}
            <div className="absolute top-2 right-2 text-[10px] uppercase tracking-wider bg-black/50 backdrop-blur text-white px-1.5 py-0.5 rounded">
              {img.category}
            </div>
          </button>
        ))}
      </div>

      {openIdx !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setOpenIdx(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setOpenIdx(null);
            }}
            className="absolute top-4 right-4 text-white text-2xl hover:text-(--color-accent) z-10"
            aria-label="Close"
          >
            ✕
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setOpenIdx((openIdx - 1 + images.length) % images.length);
            }}
            className="absolute left-4 text-white text-4xl hover:text-(--color-accent) z-10"
            aria-label="Previous"
          >
            ‹
          </button>
          <div className="relative w-full max-w-5xl aspect-video">
            <Image
              src={images[openIdx].url}
              alt={images[openIdx].caption || `Image ${openIdx + 1}`}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setOpenIdx((openIdx + 1) % images.length);
            }}
            className="absolute right-4 text-white text-4xl hover:text-(--color-accent) z-10"
            aria-label="Next"
          >
            ›
          </button>
          {images[openIdx].caption && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white text-center max-w-2xl px-4">
              {images[openIdx].caption}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
