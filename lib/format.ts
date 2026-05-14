export function formatPrice(value: number | null | undefined): string {
  if (!value || value <= 0) return "Pricing TBD";
  if (value >= 1_000_000) {
    const m = value / 1_000_000;
    return m === Math.floor(m) ? `$${m.toFixed(0)}M` : `$${m.toFixed(1)}M`;
  }
  return `$${Math.round(value / 1_000)}K`;
}

export function titleCase(value: string | null | undefined): string {
  if (!value) return "";
  return value
    .split(/\s+/)
    .map((w) => (w.length > 1 && w === w.toUpperCase() ? w : w[0].toUpperCase() + w.slice(1).toLowerCase()))
    .join(" ");
}

export function whatsappUrl(e164: string, message: string): string {
  const cleaned = e164.replace(/\D/g, "");
  const params = new URLSearchParams({ text: message });
  return `https://wa.me/${cleaned}?${params.toString()}`;
}
