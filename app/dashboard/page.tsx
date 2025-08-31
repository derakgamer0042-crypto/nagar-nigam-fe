"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
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
} from "lucide-react"
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
} from "recharts"
import Link from "next/link"
import LineChartCust from "@/components/Charts/LineChartCust"
import BarChartCust from "@/components/Charts/BarChartCust"
import PieChartCust from "@/components/Charts/PieChartCust"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}


const weeklyData = [
  { day: "Monday", formsSubmitted: 120 },
  { day: "Tuesday", formsSubmitted: 98 },
  { day: "Wednesday", formsSubmitted: 135 },
  { day: "Thursday", formsSubmitted: 150 },
  { day: "Friday", formsSubmitted: 165 },
  { day: "Saturday", formsSubmitted: 80 },
  { day: "Sunday", formsSubmitted: 90 }
];


const performanceData = [
  { month: "Jan", efficiency: 85, accuracy: 92 },
  { month: "Feb", efficiency: 88, accuracy: 94 },
  { month: "Mar", efficiency: 91, accuracy: 96 },
  { month: "Apr", efficiency: 89, accuracy: 93 },
  { month: "May", efficiency: 93, accuracy: 97 },
  { month: "Jun", efficiency: 95, accuracy: 98 },
]

const recentActivities = [
  { id: 1, action: "New survey submitted", zone: "Sirsaganj", time: "2 minutes ago", status: "pending", icon: Clock },
  {
    id: 2,
    action: "Property verification completed",
    zone: "Ward 12",
    time: "15 minutes ago",
    status: "completed",
    icon: CheckCircle,
  },
  {
    id: 3,
    action: "Data export generated",
    zone: "All Zones",
    time: "1 hour ago",
    status: "completed",
    icon: CheckCircle,
  },
  { id: 4, action: "Survey form updated", zone: "Ward 8", time: "2 hours ago", status: "updated", icon: AlertCircle },
  { id: 5, action: "New user registered", zone: "Zone C", time: "3 hours ago", status: "new", icon: Users },
]

const surveySubmissions = [
  {
    id: "SUR001",
    zone: "Sirsaganj",
    ward: "Ward 12",
    locality: "Sector A",
    status: "Completed",
    date: "2024-08-17",
    surveyor: "Raj Kumar",
    priority: "high",
  },
  {
    id: "SUR002",
    zone: "Sirsaganj",
    ward: "Ward 8",
    locality: "Sector B",
    status: "Pending",
    date: "2024-08-17",
    surveyor: "Priya Singh",
    priority: "medium",
  },
  {
    id: "SUR003",
    zone: "Zone B",
    ward: "Ward 15",
    locality: "Market Area",
    status: "In Progress",
    date: "2024-08-16",
    surveyor: "Amit Sharma",
    priority: "high",
  },
  {
    id: "SUR004",
    zone: "Zone C",
    ward: "Ward 22",
    locality: "Residential",
    status: "Completed",
    date: "2024-08-16",
    surveyor: "Sunita Devi",
    priority: "low",
  },
  {
    id: "SUR005",
    zone: "Zone A",
    ward: "Ward 5",
    locality: "Commercial",
    status: "Pending",
    date: "2024-08-15",
    surveyor: "Vikash Gupta",
    priority: "medium",
  },
]


// sending data to line chart
const chartData = [
    { ward: "Ward 1", Residential: 54, Commercial: 12, Mixed: 9 },
    { ward: "Ward 2", Residential: 48, Commercial: 15, Mixed: 7 },
    { ward: "Ward 3", Residential: 62, Commercial: 7, Mixed: 11 },
    { ward: "Ward 4", Residential: 55, Commercial: 16, Mixed: 6 },
    { ward: "Ward 5", Residential: 68, Commercial: 14, Mixed: 13 }
  ];

// sending data to piechart
const propertyData = [
		{ name: "Residential", value: 11295, color: "#0891b2" },
		{ name: "Non-Residential", value: 514, color: "#d97706" },
		{ name: "Mixed", value: 1895, color: "#475569" },
	]

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
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card/30 to-muted/40">
      <motion.header
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
                <p className="text-sm text-muted-foreground font-medium -mt-1">Admin Dashboard</p>
              </div>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="relative hover:bg-primary/10">
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
      </motion.header>

      <div className="p-8 space-y-10 max-w-7xl mx-auto">
        <motion.div {...fadeInUp} className="text-center space-y-6">
          <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-primary/10 to-secondary/10 text-primary px-6 py-3 rounded-full text-sm font-semibold border border-primary/20">
            <Calendar className="h-4 w-4" />
            <span>Today, August 17, 2024</span>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-foreground to-secondary bg-clip-text text-transparent">
            Welcome back, Admin
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Monitor your property surveys, track progress across zones, and manage your team's activities from this
            comprehensive dashboard.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {[
            {
              title: "Total Properties",
              value: "13,704",
              icon: Building2,
              change: "+2.5%",
              gradient: "from-primary to-primary/80",
              bgGradient: "from-primary/5 via-primary/10 to-primary/5",
              borderGradient: "from-primary/20 to-primary/10",
            },
            {
              title: "Residential",
              value: "11,295",
              icon: Home,
              change: "+1.8%",
              gradient: "from-chart-1 to-chart-1/80",
              bgGradient: "from-chart-1/5 via-chart-1/10 to-chart-1/5",
              borderGradient: "from-chart-1/20 to-chart-1/10",
            },
            {
              title: "Non-Residential",
              value: "514",
              icon: Building,
              change: "+5.2%",
              gradient: "from-secondary to-secondary/80",
              bgGradient: "from-secondary/5 via-secondary/10 to-secondary/5",
              borderGradient: "from-secondary/20 to-secondary/10",
            },
            {
              title: "Mixed Properties",
              value: "1,895",
              icon: Users,
              change: "+3.1%",
              gradient: "from-chart-3 to-chart-3/80",
              bgGradient: "from-chart-3/5 via-chart-3/10 to-chart-3/5",
              borderGradient: "from-chart-3/20 to-chart-3/10",
            },
          ].map((stat, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <Card
                className={`border-0 shadow-xl hover:shadow-2xl transition-all duration-500 bg-gradient-to-br ${stat.bgGradient} hover:scale-105 relative overflow-hidden`}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${stat.borderGradient} opacity-50`} />
                <CardContent className="p-8 relative">
                  <div className="flex items-center justify-between">
                    <div className="space-y-3">
                      <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                        {stat.title}
                      </p>
                      <p className="text-4xl font-bold text-foreground">{stat.value}</p>
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="h-4 w-4 text-emerald-600" />
                        <span className="text-sm font-semibold text-emerald-600">{stat.change}</span>
                        <span className="text-xs text-muted-foreground">vs last month</span>
                      </div>
                    </div>
                    <div className={`p-4 rounded-2xl bg-gradient-to-br ${stat.gradient} shadow-xl`}>
                      <stat.icon className="h-8 w-8 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div {...fadeInUp}>
          <div className="grid lg:grid-cols-4 gap-6">
            {[
              {
                title: "Survey Efficiency",
                value: "95%",
                icon: Target,
                color: "text-emerald-600",
                bg: "bg-emerald-50",
              },
              { title: "Data Accuracy", value: "98%", icon: Shield, color: "text-blue-600", bg: "bg-blue-50" },
              { title: "Response Time", value: "2.3h", icon: Zap, color: "text-amber-600", bg: "bg-amber-50" },
              { title: "Coverage Rate", value: "87%", icon: Globe, color: "text-purple-600", bg: "bg-purple-50" },
            ].map((kpi, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{kpi.title}</p>
                      <p className="text-2xl font-bold text-foreground mt-1">{kpi.value}</p>
                    </div>
                    <div className={`p-3 rounded-xl ${kpi.bg}`}>
                      <kpi.icon className={`h-6 w-6 ${kpi.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>


        {/* need to be uncommented */}
        {/* -----------> form here */}
        {/* <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8"> */}
        {/* <motion.div {...fadeInUp}>
            <Card className="border-0 shadow-xl">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center text-foreground text-lg">
                  <RechartsPieChartIcon className="h-6 w-6 mr-3 text-primary" />
                  Property Distribution
                </CardTitle>
                <CardDescription className="text-base">Breakdown by property type</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={280}>
                  <RechartsPieChart>
                    <Pie
                      data={propertyData}
                      cx="50%"
                      cy="50%"
                      outerRadius={70}
                      dataKey="value"
                      label={({ name, percent }) => `${name[0]} ${(percent * 100).toFixed(0)}%`}
                    >
                      {propertyData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div> */}
        {/* <PieChartCust/> */}

        {/* <motion.div {...fadeInUp}>
            <Card className="border-0 shadow-xl">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center text-foreground text-lg">
                  <BarChart3 className="h-6 w-6 mr-3 text-primary" />
                  Zone Progress
                </CardTitle>
                <CardDescription className="text-base">Survey completion by zone</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={zoneData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="zone" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="completion" fill="#164e63" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div> */}
        {/* <BarChartCust/> */}

        {/* <motion.div {...fadeInUp}>
            <Card className="border-0 shadow-xl">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center text-foreground text-lg">
                  <Activity className="h-6 w-6 mr-3 text-primary" />
                  Performance Trends
                </CardTitle>
                <CardDescription className="text-base">Monthly efficiency & accuracy</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={280}>
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="efficiency" stroke="#164e63" strokeWidth={3} />
                    <Line type="monotone" dataKey="accuracy" stroke="#d97706" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div> */}
        {/* <LineChartCust/> */}
        {/* </div> */}
        {/* ----------> to here */}

        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
          <PieChartCust propertyData={propertyData} />
          <BarChartCust zoneData={zoneData.slice(0,5)}/>
          <LineChartCust chartData={chartData} />
        </div>

        {/* Property Distribution */}
        <motion.div {...fadeInUp}>
          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-foreground">
                <RechartsPieChartIcon className="h-5 w-5 mr-2 text-secondary" />
                Property Distribution
              </CardTitle>
              <CardDescription>Breakdown by property type</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <RechartsPieChart>
                  <Pie
                    data={propertyData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {propertyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Zone Progress */}
        {/* <motion.div {...fadeInUp}>
          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-foreground">
                <BarChart3 className="h-5 w-5 mr-2 text-secondary" />
                Zone Progress
              </CardTitle>
              <CardDescription>Survey completion by zone</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={zoneData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="zone" type="category" width={60} />
                  <Tooltip />
                  <Bar dataKey="completion" fill="#6366f1" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div> */}
        <BarChartCust zoneData={zoneData} />

        {/* Weekly Trends */}
        <motion.div {...fadeInUp}>
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

        <motion.div {...fadeInUp}>
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-foreground text-xl">Recent Survey Submissions</CardTitle>
                  <CardDescription>Latest property survey data and status updates</CardDescription>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search submissions..." className="pl-10 w-64 border-0 bg-muted/50" />
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-secondary/20 text-secondary hover:bg-secondary hover:text-secondary-foreground bg-transparent font-medium"
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-4 px-4 font-semibold text-foreground">Survey ID</th>
                      <th className="text-left py-4 px-4 font-semibold text-foreground">Location</th>
                      <th className="text-left py-4 px-4 font-semibold text-foreground">Status</th>
                      <th className="text-left py-4 px-4 font-semibold text-foreground">Priority</th>
                      <th className="text-left py-4 px-4 font-semibold text-foreground">Date</th>
                      <th className="text-left py-4 px-4 font-semibold text-foreground">Surveyor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {surveySubmissions.map((submission) => (
                      <tr key={submission.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                        <td className="py-4 px-4 font-medium text-foreground">{submission.id}</td>
                        <td className="py-4 px-4">
                          <div className="space-y-1">
                            <p className="font-medium text-foreground">{submission.zone}</p>
                            <p className="text-sm text-muted-foreground">
                              {submission.ward}, {submission.locality}
                            </p>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <Badge
                            variant="outline"
                            className={
                              submission.status === "Completed"
                                ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                                : submission.status === "Pending"
                                  ? "border-red-200 bg-red-50 text-red-700"
                                  : "border-amber-200 bg-amber-50 text-amber-700"
                            }
                          >
                            {submission.status === "Completed" && <CheckCircle className="h-3 w-3 mr-1" />}
                            {submission.status === "Pending" && <XCircle className="h-3 w-3 mr-1" />}
                            {submission.status === "In Progress" && <Clock className="h-3 w-3 mr-1" />}
                            {submission.status}
                          </Badge>
                        </td>
                        <td className="py-4 px-4">
                          <Badge
                            variant="outline"
                            className={
                              submission.priority === "high"
                                ? "border-red-200 bg-red-50 text-red-700"
                                : submission.priority === "medium"
                                  ? "border-amber-200 bg-amber-50 text-amber-700"
                                  : "border-gray-200 bg-gray-50 text-gray-700"
                            }
                          >
                            {submission.priority}
                          </Badge>
                        </td>
                        <td className="py-4 px-4 text-muted-foreground">{submission.date}</td>
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-2">
                            <div className="h-8 w-8 bg-gradient-to-br from-secondary to-secondary/80 rounded-full flex items-center justify-center">
                              <span className="text-xs font-medium text-white">
                                {submission.surveyor
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </span>
                            </div>
                            <span className="text-foreground">{submission.surveyor}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div {...fadeInUp}>
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-foreground text-xl">
                <Activity className="h-5 w-5 mr-2 text-secondary" />
                Recent Activities
              </CardTitle>
              <CardDescription>Latest system activities and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-muted/30 to-muted/10 hover:from-muted/50 hover:to-muted/20 transition-all duration-200"
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className={`p-2 rounded-lg ${activity.status === "completed"
                            ? "bg-emerald-100 text-emerald-600"
                            : activity.status === "pending"
                              ? "bg-amber-100 text-amber-600"
                              : activity.status === "new"
                                ? "bg-blue-100 text-blue-600"
                                : "bg-gray-100 text-gray-600"
                          }`}
                      >
                        <activity.icon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{activity.action}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{activity.zone}</span>
                        </div>
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground bg-white/50 px-3 py-1 rounded-full">
                      {activity.time}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
