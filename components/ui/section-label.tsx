export default function SectionLabel({
  index,
  children,
}: {
  index: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-headline text-[10px] font-bold tracking-[0.3em] text-[#ec5b13]">{index}</span>
      <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted">{children}</span>
      <div className="h-px flex-1 bg-[var(--glass-border)]" />
    </div>
  );
}
