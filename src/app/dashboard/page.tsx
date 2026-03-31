"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ReferralDashboard from "@/components/ReferralDashboard";
import Navbar from "@/components/Navbar";

export default function DashboardPage() {
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
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
      <Navbar currentPath="/dashboard" />
      <ReferralDashboard userId={userId} />
    </div>
  );
}
