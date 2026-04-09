import { TopNav } from "@/components/nav/top-nav";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TopNav />
      <main>{children}</main>
    </>
  );
}
