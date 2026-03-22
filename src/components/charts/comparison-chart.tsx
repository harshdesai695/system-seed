"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  LineChart,
  Line,
} from "recharts";

interface ComparisonChartProps {
  title?: string;
  data: Record<string, string | number>[];
  bars: { dataKey: string; color: string; label?: string }[];
  xAxisKey?: string;
}

export function ComparisonBarChart({
  title,
  data,
  bars,
  xAxisKey = "name",
}: ComparisonChartProps) {
  return (
    <div className="my-6 rounded-lg border border-border bg-card p-4">
      {title && (
        <h4 className="text-sm font-medium text-foreground mb-4">{title}</h4>
      )}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis
            dataKey={xAxisKey}
            tick={{ fontSize: 12 }}
            stroke="hsl(var(--muted-foreground))"
          />
          <YAxis
            tick={{ fontSize: 12 }}
            stroke="hsl(var(--muted-foreground))"
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
              fontSize: "12px",
            }}
          />
          <Legend />
          {bars.map((bar) => (
            <Bar
              key={bar.dataKey}
              dataKey={bar.dataKey}
              fill={bar.color}
              name={bar.label ?? bar.dataKey}
              radius={[4, 4, 0, 0]}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

interface PerformanceLineChartProps {
  title?: string;
  data: Record<string, string | number>[];
  lines: { dataKey: string; color: string; label?: string }[];
  xAxisKey?: string;
}

export function PerformanceLineChart({
  title,
  data,
  lines,
  xAxisKey = "name",
}: PerformanceLineChartProps) {
  return (
    <div className="my-6 rounded-lg border border-border bg-card p-4">
      {title && (
        <h4 className="text-sm font-medium text-foreground mb-4">{title}</h4>
      )}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis
            dataKey={xAxisKey}
            tick={{ fontSize: 12 }}
            stroke="hsl(var(--muted-foreground))"
          />
          <YAxis
            tick={{ fontSize: 12 }}
            stroke="hsl(var(--muted-foreground))"
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
              fontSize: "12px",
            }}
          />
          <Legend />
          {lines.map((line) => (
            <Line
              key={line.dataKey}
              type="monotone"
              dataKey={line.dataKey}
              stroke={line.color}
              name={line.label ?? line.dataKey}
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
