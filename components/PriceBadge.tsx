import { formatPrice } from "@/lib/format";

export default function PriceBadge({ price }: { price: number | null | undefined }) {
  return (
    <div className="text-xs uppercase tracking-wider text-(--color-muted)">
      Starting at <span className="text-(--color-foreground) font-medium">{formatPrice(price)}</span>
    </div>
  );
}
