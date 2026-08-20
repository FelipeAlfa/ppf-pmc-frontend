"use client";

import { useAppContext } from "@/context/AppContext";

export default function Main({ children }: { children: React.ReactNode }) {
  const { scrollBlocked } = useAppContext();

  return (
    <main>
      <div>{children}</div>
    </main>
  );
}
