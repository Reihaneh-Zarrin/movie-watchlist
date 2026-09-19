export default function RankBadge({ index }: { index: number }) {
  return (
    <div className="absolute top-0 right-0 z-10 w-10 h-10 bg-green-900 [clip-path:polygon(100%_0,0_0,100%_100%)] flex items-start justify-end">
      <span className="absolute top-1 right-1 text-xs text-black font-serif font-black">
        {String(index + 1).padStart(2, "0")}
      </span>
    </div>
  );
}
