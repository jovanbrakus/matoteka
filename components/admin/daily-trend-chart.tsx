"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export interface DailyPoint {
  date: string; // YYYY-MM-DD
  count: number;
}

function formatDay(date: string) {
  const [, m, d] = date.split("-");
  return `${parseInt(d, 10)}.${parseInt(m, 10)}.`;
}

export default function DailyTrendChart({
  title,
  icon,
  data,
  color,
}: {
  title: string;
  icon: string;
  data: DailyPoint[];
  color: string;
}) {
  return (
    <div className="glass-card rounded-2xl p-5">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#ec5b13]/10">
          <span className="material-symbols-outlined text-lg text-[#ec5b13]">{icon}</span>
        </div>
        <h3 className="text-sm font-bold text-heading">{title}</h3>
      </div>
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 10, bottom: 0, left: -20 }}>
            <CartesianGrid stroke="var(--glass-border)" strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="date"
              tickFormatter={formatDay}
              tick={{ fontSize: 11, fill: "var(--color-text-secondary)" }}
              tickLine={false}
              axisLine={{ stroke: "var(--glass-border)" }}
              interval="preserveStartEnd"
              minTickGap={24}
            />
            <YAxis
              allowDecimals={false}
              tick={{ fontSize: 11, fill: "var(--color-text-secondary)" }}
              tickLine={false}
              axisLine={false}
              width={48}
            />
            <Tooltip
              labelFormatter={(label) => formatDay(String(label))}
              formatter={(value) => [value as number, title]}
              contentStyle={{
                backgroundColor: "var(--color-card)",
                border: "1px solid var(--glass-border)",
                borderRadius: "12px",
                fontSize: "12px",
              }}
              labelStyle={{ fontWeight: 700, color: "var(--color-heading)" }}
            />
            <Line
              type="monotone"
              dataKey="count"
              stroke={color}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: color }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
