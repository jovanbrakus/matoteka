export default function SimulationActiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // This layout is used for active simulation pages.
  // The active test page renders its own full-screen UI,
  // but results page needs the normal layout.
  return <>{children}</>;
}
