"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Generate colors for each ward
const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884D8",
  "#82CA9D",
  "#FFC658",
  "#FF7C7C",
  "#8DD1E1",
  "#D084D0",
];

// Custom tooltip component
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const percentage = ((data.totalTaxPerWard / data.totalTax) * 100).toFixed(
      1
    );
    return (
      <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
        <p className="font-semibold">{`Ward ${data.ward}`}</p>
        <p className="text-sm text-muted-foreground">
          Tax: ₹{data.totalTaxPerWard.toLocaleString()}
        </p>
        <p className="text-sm text-muted-foreground">{percentage}% of total</p>
      </div>
    );
  }
  return null;
};

// Custom label function
const renderLabel = (entry: any) => {
  const percentage = (entry.totalTaxPerWard / entry.totalTax) * 100;
  return percentage > 5 ? `Ward ${entry.ward}` : ""; // Only show label if slice is large enough
};

export default function WardTaxDonutChart({ data }: any) {
  // Calculate total tax for percentage calculations

  //   for temp showcasing..
  data = [
    { ward: "15", totalTaxPerWard: 37265 },
    { ward: "10", totalTaxPerWard: 11057 },
    { ward: "12", totalTaxPerWard: 78344 },
    { ward: "14", totalTaxPerWard: 89342 },
    { ward: "20", totalTaxPerWard: 12990 },
    { ward: "78", totalTaxPerWard: 67123 },
    { ward: "19", totalTaxPerWard: 89234 },
  ];

  const totalTax = data.reduce((sum, item) => sum + item.totalTaxPerWard, 0);
  const dataWithTotal = data.map((item) => ({ ...item, totalTax }));

  return (
    <div className="flex justify-center items-center w-full">
      <Card className="w-full max-w-4xl hidden md:flex">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            Tax Contributions by Ward
          </CardTitle>
          <CardDescription>
            Total Tax Collected: ₹{totalTax.toLocaleString()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[500px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dataWithTotal}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderLabel}
                  outerRadius={180}
                  innerRadius={80}
                  fill="#8884d8"
                  dataKey="totalTaxPerWard"
                  stroke="#fff"
                  strokeWidth={2}
                >
                  {dataWithTotal.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  formatter={(value, entry: any) => (
                    <span style={{ color: entry.color }}>
                      Ward {entry.payload.ward} (₹
                      {entry.payload.totalTaxPerWard.toLocaleString()})
                    </span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Summary stats */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                {" "}
                Highest Contributing Ward{" "}
              </p>
              <p className="font-semibold">
                Ward{" "}
                {
                  data.reduce((max, ward) =>
                    ward.totalTaxPerWard > max.totalTaxPerWard ? ward : max
                  ).ward
                }
              </p>
            </div>
            <div className="text-center p-3 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                Lowest Contributing Ward
              </p>
              <p className="font-semibold">
                Ward{" "}
                {
                  data.reduce((min, ward) =>
                    ward.totalTaxPerWard < min.totalTaxPerWard ? ward : min
                  ).ward
                }
              </p>
            </div>
            <div className="text-center p-3 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">Average Tax</p>
              <p className="font-semibold">
                {" "}
                ₹{Math.round(totalTax / data.length).toLocaleString()}{" "}
              </p>
            </div>
            <div className="text-center p-3 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">Total Wards</p>
              <p className="font-semibold">{data.length}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="w-full max-w-4xl mx-auto block md:hidden ">
        <CardHeader className="text-center px-4">
          <CardTitle className="text-xl md:text-2xl font-bold">
            Tax Contributions by Ward
          </CardTitle>
          <CardDescription className="text-sm md:text-base">
            Total Tax Collected: ₹{totalTax.toLocaleString()}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* Chart */}
          <div className="w-full h-[300px] md:h-[500px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dataWithTotal}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderLabel}
                  outerRadius={120}
                  innerRadius={60}
                  dataKey="totalTaxPerWard"
                  stroke="#fff"
                  strokeWidth={2}
                >
                  {dataWithTotal.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  verticalAlign="bottom"
                  height={40}
                  wrapperStyle={{ fontSize: "12px" }}
                  formatter={(value, entry: any) => (
                    <span style={{ color: entry.color }}>
                      Ward {entry.payload.ward} (₹
                      {entry.payload.totalTaxPerWard.toLocaleString()})
                    </span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Summary stats */}
          <div className="mt-6 flex flex-col md:flex-row md:flex-wrap gap-4">
            <div className="flex-1 flex flex-col items-center justify-center p-3 bg-muted rounded-lg">
              <p className="text-xs md:text-sm text-muted-foreground">
                Highest Contributing Ward
              </p>
              <p className="font-semibold text-sm md:text-base">
                Ward{" "}
                {
                  data.reduce((max, ward) =>
                    ward.totalTaxPerWard > max.totalTaxPerWard ? ward : max
                  ).ward
                }
              </p>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center p-3 bg-muted rounded-lg">
              <p className="text-xs md:text-sm text-muted-foreground">
                Lowest Contributing Ward
              </p>
              <p className="font-semibold text-sm md:text-base">
                Ward{" "}
                {
                  data.reduce((min, ward) =>
                    ward.totalTaxPerWard < min.totalTaxPerWard ? ward : min
                  ).ward
                }
              </p>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center p-3 bg-muted rounded-lg">
              <p className="text-xs md:text-sm text-muted-foreground">
                Average Tax
              </p>
              <p className="font-semibold text-sm md:text-base">
                ₹{Math.round(totalTax / data.length).toLocaleString()}
              </p>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center p-3 bg-muted rounded-lg">
              <p className="text-xs md:text-sm text-muted-foreground">
                Total Wards
              </p>
              <p className="font-semibold text-sm md:text-base">
                {data.length}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
