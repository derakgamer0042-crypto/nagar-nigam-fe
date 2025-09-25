"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  Home,
  Building,
  Users,
  TrendingUp,
  Search,
  Filter,
  Bell,
  LogOut,
  BarChart3,
  PieChart as RechartsPieChartIcon,
  Activity,
  MapPin,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  Target,
  Zap,
  Shield,
  Globe,
} from "lucide-react";
import {
  PieChart as RechartsPieChart,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Pie,
  Area,
  AreaChart,
  LineChart,
  Line,
} from "recharts";
import Link from "next/link";
import LineChartCust from "@/components/Charts/LineChartCust";
import BarChartCust from "@/components/Charts/BarChartCust";
import PieChartCust from "@/components/Charts/PieChartCust";
import SurveyorData from "@/components/AdminComponents/SurveyorData";
import { formatDate } from "@/lib/formatDate";
import RecentActivities from "@/components/AdminComponents/RecentActivities";
import AdminStats from "@/components/AdminComponents/AdminStats";
import { useEffect, useState } from "react";
import axios from "axios";
import WardTaxDonutChart from "@/components/Charts/TaxChart";
import Navbar from "@/components/AdminComponents/Navbar";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const weeklyData = [
  { day: "Monday", formsSubmitted: 120 },
  { day: "Tuesday", formsSubmitted: 98 },
  { day: "Wednesday", formsSubmitted: 135 },
  { day: "Thursday", formsSubmitted: 150 },
  { day: "Friday", formsSubmitted: 165 },
  { day: "Saturday", formsSubmitted: 80 },
  { day: "Sunday", formsSubmitted: 90 },
];

const performanceData = [
  { month: "Jan", efficiency: 85, accuracy: 92 },
  { month: "Feb", efficiency: 88, accuracy: 94 },
  { month: "Mar", efficiency: 91, accuracy: 96 },
  { month: "Apr", efficiency: 89, accuracy: 93 },
  { month: "May", efficiency: 93, accuracy: 97 },
  { month: "Jun", efficiency: 95, accuracy: 98 },
];

// sending data to line chart
const chartData = [
  { ward: "Ward 1", Residential: 54, Commercial: 12, Mixed: 9 },
  { ward: "Ward 2", Residential: 48, Commercial: 15, Mixed: 7 },
  { ward: "Ward 3", Residential: 62, Commercial: 7, Mixed: 11 },
  { ward: "Ward 4", Residential: 55, Commercial: 16, Mixed: 6 },
  { ward: "Ward 5", Residential: 68, Commercial: 14, Mixed: 13 },
];

// sending data to piechart
const propertyData = [
  { name: "Residential", value: 11295, color: "#0891b2" },
  { name: "Non-Residential", value: 514, color: "#d97706" },
  { name: "Mixed", value: 1895, color: "#475569" },
];

// sending the data to bar chart
const zoneData = [
  { zone: "Zone A", properties: 3200, surveys: 2890, completionPercentage: 90 },
  { zone: "Zone B", properties: 2800, surveys: 2650, completionPercentage: 95 },
  { zone: "Zone C", properties: 4100, surveys: 3800, completionPercentage: 93 },
  { zone: "Zone D", properties: 2600, surveys: 2400, completionPercentage: 88 },
  { zone: "Zone E", properties: 1700, surveys: 1550, completionPercentage: 91 },
  { zone: "Zone F", properties: 2500, surveys: 2300, completionPercentage: 92 },
  { zone: "Zone G", properties: 3000, surveys: 2850, completionPercentage: 95 },
  { zone: "Zone H", properties: 1950, surveys: 1900, completionPercentage: 97 },
  { zone: "Zone I", properties: 3350, surveys: 3100, completionPercentage: 93 },
  { zone: "Zone J", properties: 1600, surveys: 1575, completionPercentage: 98 },
];

export default function DashboardPage() {
  const [chartStats, setChartStats] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const [adminStatsParent, setAdminStatsParent] = useState();

  const fetchGraphStats = async () => {
    try {
      setIsLoading(true);
      const res = (
        await axios({
          url: `${process.env.NEXT_PUBLIC_BACKEND_URL}${process.env.NEXT_PUBLIC_ADMIN_ROUTES}/graph-stats-detail`,
          method: "post",
          data: {},
        })
      ).data;

      setChartStats(res.data);
    } catch (err) {
      console.log("[ERROR] in fetchGraphStats : ", err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGraphStats();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card/30 to-muted/40">
      {/* <motion.header
        className="border-b border-border/30 bg-white/95 backdrop-blur-xl sticky top-0 z-50 shadow-sm"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="px-8 py-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-to-br from-primary via-primary to-secondary rounded-2xl shadow-lg">
                <Building2 className="h-7 w-7 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Nagar Nigam
                </span>
                <p className="text-sm text-muted-foreground font-medium -mt-1">
                  Admin Dashboard
                </p>
              </div>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="relative hover:bg-primary/10"
            >
              <Bell className="h-5 w-5 text-primary" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-secondary rounded-full text-xs flex items-center justify-center text-white font-bold">
                3
              </span>
            </Button>
            <Link href="/login">
              <Button
                // variant="outline"
                size="sm"
                // className="border-primary/30 hover:bg-primary hover:text-primary-foreground bg-transparent font-medium"
                className="border-primary cursor-pointer text-primary hover:bg-primary hover:text-primary-foreground bg-transparent flex items-center space-x-2 px-4 py-2 shadow-md"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </Link>
          </div>
        </div>
      </motion.header> */}

      <Navbar />

      {!isLoading && (
        <div className="p-8 space-y-10 max-w-7xl mx-auto">
          <motion.div {...fadeInUp} className="text-center space-y-6">
            <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-primary/10 to-secondary/10 text-primary px-6 py-3 rounded-full text-sm font-semibold border border-primary/20">
              <Calendar className="h-4 w-4" />
              <span>Today, {formatDate(new Date(), true)}</span>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-foreground to-secondary bg-clip-text text-transparent">
              Welcome back, Admin
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Monitor your property surveys, track progress across zones, and
              manage your team's activities from this comprehensive dashboard.
            </p>
          </motion.div>

          <AdminStats
            fadeInUp={fadeInUp}
            staggerContainer={staggerContainer}
            setAdminStatsParent={setAdminStatsParent}
          />

          <div
            id="total-tax-classification"
            className="flex justify-center items-center w-full"
          >
            <WardTaxDonutChart
              data={chartStats?.map((c) => ({
                ward: c.ward,
                totalTaxPerWard: c.totalTaxPerWard,
              }))}
            />
          </div>

          <div className="flex flex-col justify-center items-center gap-[10px] w-full">
            <div className="grid lg:grid-cols-2 gap-[10px] w-full">
              {adminStatsParent && (
                <PieChartCust propertyData={adminStatsParent} />
              )}
              {/* <BarChartCust genderData={chartStats?.map(c=> ({ [c.ward] :  c.genderData}))} /> */}
              <LineChartCust
                chartData={chartStats?.map((c) => ({
                  ward: c.ward,
                  ...c?.perWardPropertyClassification,
                }))}
              />
            </div>

            <div className="w-full">
              {adminStatsParent && (
              <PieChartCust propertyData={adminStatsParent} />
            )}
            </div>
            {/* <BarChartCust zoneData={zoneData} /> */}
            <BarChartCust
              genderData={chartStats?.map((c: any) => ({
                [c.ward.toLowerCase().startsWith("ward")
                  ? c.ward
                  : `Ward ${c.ward}`]: c.genderData,
              }))}
            />

            <motion.div {...fadeInUp} className="w-full" >
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-foreground">
                  <Activity className="h-5 w-5 mr-2 text-secondary" />
                  Weekly Trends
                </CardTitle>
                <CardDescription>Daily survey activity</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="formsSubmitted"
                      stroke="#6366f1"
                      fill="#6366f1"
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          </div>

          {/* Weekly Trends */}
          

          <SurveyorData fadeInUp={fadeInUp} />

          <RecentActivities fadeInUp={fadeInUp} />
        </div>
      )}
    </div>
  );
}
