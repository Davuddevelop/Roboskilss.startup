function Shimmer({ className }: { className?: string }) {
  return (
    <div
      className={`relative overflow-hidden rounded-md bg-elevated ${className ?? ""}`}
    >
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.4s_infinite] bg-gradient-to-r from-transparent via-line to-transparent" />
    </div>
  );
}

export default function Loading() {
  return (
    <div>
      <div className="border-b border-line px-6 py-7">
        <Shimmer className="h-7 w-48" />
        <Shimmer className="mt-2 h-4 w-72" />
      </div>
      <div className="space-y-8 px-6 py-8">
        <div className="grid gap-4 sm:grid-cols-3">
          <Shimmer className="h-24" />
          <Shimmer className="h-24" />
          <Shimmer className="h-24" />
        </div>
        <Shimmer className="h-48" />
      </div>
    </div>
  );
}
