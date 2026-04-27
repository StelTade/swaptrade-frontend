import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const db = getDb();

  try {
    // Get total bonuses from users table (cached)
    const user = db.prepare("SELECT points FROM users WHERE id = ?").get(id) as { points: number } | undefined;

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    interface BonusAdjustment {
      id: string;
      delta: number;
      action: string;
      reason: string;
      createdAt: number;
    }

    // Get detailed history from points_adjustments
    const history = db.prepare(`
      SELECT id, delta, action, reason, created_at as createdAt 
      FROM points_adjustments 
      WHERE user_id = ? AND (action = 'trading_bonus' OR action = 'bonus')
      ORDER BY created_at DESC
    `).all(id) as BonusAdjustment[];

    // Calculate real-time total from adjustments to ensure accuracy
    const calculatedTotal = history.reduce((sum, adj) => sum + adj.delta, 0);

    return NextResponse.json({
      totalBonuses: calculatedTotal,
      history: history,
      lastUpdated: Date.now()
    });
  } catch (error: unknown) {
    console.error("Failed to fetch bonuses:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
