"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Dummy data
const genderData = {
  "ward 1": { male: 10, female: 20 },
  "ward 2": { male: 190, female: 90 },
  "ward 3": { male: 75, female: 120 },
  "ward 4": { male: 40, female: 60 },
  "ward 5": { male: 130, female: 110 },
  "ward 6": { male: 200, female: 180 },
  "ward 7": { male: 95, female: 105 },
  "ward 8": { male: 60, female: 80 },
  "ward 9": { male: 150, female: 140 },
  "ward 10": { male: 50, female: 70 },
};

export default function BarChartCust({ genderData: obj }: any) {
  // const genderData = obj.reduce((acc, item) => {
  //   const [key, value] = Object.entries(item)[0]; // get key & value
  //   acc[key] = value;
  //   return acc;
  // }, {});

  console.log(obj);

  // Transform data for Recharts
  const chartData = Object.entries(genderData).map(([ward, data]) => ({
    ward,
    male: data.male,
    female: data.female,
  }));

  // Chart colors
  const chartConfig = {
    male: {
      label: "Male",
      color: "#3B82F6", // Bright Blue
    },
    female: {
      label: "Female",
      color: "#F97316", // Vibrant Orange
    },
  };

  return (
    <div
      id="total-property-distribution"
      className="bg-background w-full flex justify-center"
    >
      <Card className="w-full md:max-w-6xl flex flex-col">
        {/* Header */}
        <CardHeader className="flex flex-col items-center md:items-start text-center md:text-left px-4 md:px-6">
          <CardTitle className="text-base md:text-lg font-semibold">
            Gender Distribution by Ward
          </CardTitle>
          <CardDescription className="text-xs md:text-sm mt-1 md:mt-0">
            Population breakdown showing male and female counts across all wards
          </CardDescription>
        </CardHeader>

        {/* Chart */}
        <CardContent className="flex flex-col items-center justify-center w-full">
          <ChartContainer
            config={chartConfig}
            className="h-[280px] md:h-[400px] w-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{
                  top: 10,
                  right: 10,
                  left: 0,
                  bottom: 30,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="ward"
                  tick={{ fontSize: 10, fill: "#6b7280" }}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis tick={{ fontSize: 10, fill: "#6b7280" }} />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      className="!text-xs md:!text-base !font-semibold"
                      formatter={(value, name, props) => {
                        const total =
                          props.payload?.male + props.payload?.female;
                        return [`${value} (${name})`, `Total: ${total}`];
                      }}
                    />
                  }
                />
                <Bar
                  dataKey="male"
                  fill={chartConfig.male.color}
                  name="Male"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="female"
                  fill={chartConfig.female.color}
                  name="Female"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
