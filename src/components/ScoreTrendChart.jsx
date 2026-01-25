import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function ScoreTrendChart({ data }) {
  // Transform backend data
  const chartData = data
    .slice()
    .reverse()
    .map(item => ({
      date: new Date(item.createdAt).toLocaleDateString(),
      score: item.matchScore
    }));

  return (
    <div className="border border-neutral-800 p-6">
      <p className="text-xs tracking-[0.3em] text-neutral-500 uppercase mb-4">
        Score Trend
      </p>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <XAxis
              dataKey="date"
              tick={{ fill: "#737373", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              domain={[0, 100]}
              tick={{ fill: "#737373", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#000",
                border: "1px solid #262626",
                color: "#fff",
                fontSize: "12px"
              }}
            />
            <Line
              type="monotone"
              dataKey="score"
              stroke="#ffffff"
              strokeWidth={2}
              dot={{ r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
