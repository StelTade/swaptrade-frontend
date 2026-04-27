"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import BonusDashboard from "@/components/BonusDashboard";
import Navbar from "@/components/Navbar";

export default function BonusPage() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const id = localStorage.getItem("swaptrade_user_id");
    if (!id) {
      router.replace("/?auth=required");
    } else {
      setUserId(id);
    }
    setChecking(false);
  }, [router]);

  if (checking) return null;
  if (!userId) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-[family-name:var(--font-geist-sans)]">
      <Navbar currentPath="/dashboard/bonuses" />
      <BonusDashboard userId={userId} />
    </div>
  );
}
