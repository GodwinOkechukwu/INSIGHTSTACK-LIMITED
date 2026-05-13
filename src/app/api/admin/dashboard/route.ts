import { NextRequest, NextResponse } from "next/server";
import { query } from "@src/lib/db";
import { requireAdmin } from "../_lib/requireAdmin";
import { T } from "@src/lib/tables";

export async function GET(req: NextRequest) {
  const admin = await requireAdmin(req);
  if (!admin) return NextResponse.json({ message: "Forbidden" }, { status: 403 });

  try {
    const [
      ordersCount,
      revenueResult,
      productsCount,
      customersCount,
      recentOrders,
      statusCounts,
      monthlySales,
    ] = await Promise.all([
      query(`SELECT COUNT(*) AS total FROM ${T.orders}`),
      query(`SELECT COALESCE(SUM(total), 0) AS total FROM ${T.orders} WHERE status != 'cancelled'`),
      query(`SELECT COUNT(*) AS total FROM ${T.products} WHERE status = 'publish'`),
      query(`SELECT COUNT(*) AS total FROM ${T.users} WHERE role = 'customer'`),
      query(
        `SELECT o.id, o.status, o.total, o.created_at, o.billing,
                u.first_name, u.last_name, u.email
         FROM ${T.orders} o
         LEFT JOIN ${T.users} u ON u.id = o.customer_id
         ORDER BY o.created_at DESC LIMIT 5`,
      ),
      query(
        `SELECT status, COUNT(*) AS count FROM ${T.orders} GROUP BY status`,
      ),
      query(
        `SELECT DATE_TRUNC('month', created_at) AS month,
                COUNT(*) AS orders,
                COALESCE(SUM(total), 0) AS revenue
         FROM ${T.orders}
         WHERE created_at >= NOW() - INTERVAL '6 months'
         GROUP BY month ORDER BY month`,
      ),
    ]);

    const statusMap = statusCounts.reduce((acc: any, row: any) => {
      acc[row.status] = parseInt(row.count, 10);
      return acc;
    }, {} as Record<string, number>);

    return NextResponse.json({
      totalOrders: parseInt(ordersCount[0].total, 10),
      totalRevenue: parseFloat(revenueResult[0].total),
      totalProducts: parseInt(productsCount[0].total, 10),
      totalCustomers: parseInt(customersCount[0].total, 10),
      recentOrders: recentOrders.map((o: any) => ({
        id: o.id,
        status: o.status,
        total: o.total,
        date: o.created_at,
        customer: o.email ?? `${o.first_name ?? ""} ${o.last_name ?? ""}`.trim(),
      })),
      ordersByStatus: {
        pending: statusMap.pending ?? 0,
        processing: statusMap.processing ?? 0,
        completed: statusMap.completed ?? 0,
        cancelled: statusMap.cancelled ?? 0,
        "on-hold": statusMap["on-hold"] ?? 0,
      },
      monthlySales: monthlySales.map((m: any) => ({
        month: m.month,
        orders: parseInt(m.orders, 10),
        revenue: parseFloat(m.revenue),
      })),
    });
  } catch (error) {
    console.error("Dashboard error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
