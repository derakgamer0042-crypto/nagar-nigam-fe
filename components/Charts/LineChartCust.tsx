import React from 'react'
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
  Legend,
} from "recharts"
import Link from "next/link"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}







const LineChartCust = ({chartData}:any) => {



   chartData = [
    { ward: "Ward 1", residential: 54, commercial: 12, mixed: 9 },
    { ward: "Ward 2", residential: 48, commercial: 15, mixed: 7 },
    { ward: "Ward 3", residential: 62, commercial: 7, mixed: 11 },
    { ward: "Ward 4", residential: 55, commercial: 16, mixed: 6 },
    { ward: "Ward 5", residential: 68, commercial: 14, mixed: 13 }
  ];



  return (
    <div>
      <motion.div {...fadeInUp} className='h-full' >
        <Card className="border-0 shadow-xl h-full">
          <CardHeader className="pb-6">
            <CardTitle className="flex items-center text-foreground text-lg">
              <Activity className="h-6 w-6 mr-3 text-primary" />
              Performance Trends
            </CardTitle>
            <CardDescription className="text-base">Monthly efficiency & accuracy</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="4 4" stroke="#e5e7eb" />
                <XAxis dataKey="ward" />
                <YAxis domain={[0, 80]} />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="residential"
                  stroke="#164e63"
                  strokeWidth={3}
                  dot={{ stroke: "#164e63", strokeWidth: 2, r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="commercial"
                  stroke="#d97706"
                  strokeWidth={3}
                  dot={{ stroke: "#d97706", strokeWidth: 2, r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="mixed"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ stroke: "#10b981", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default LineChartCust
