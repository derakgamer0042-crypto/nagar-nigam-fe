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
	Label,
} from "recharts"
import Link from "next/link"

const fadeInUp = {
	initial: { opacity: 0, y: 20 },
	animate: { opacity: 1, y: 0 },
	transition: { duration: 0.5 },
}

// const zoneData = [
// 	{ zone: "Zone A", properties: 3200, surveys: 2890, completion: 90 },
// 	{ zone: "Zone B", properties: 2800, surveys: 2650, completion: 95 },
// 	{ zone: "Zone C", properties: 4100, surveys: 3800, completion: 93 },
// 	{ zone: "Zone D", properties: 2600, surveys: 2400, completion: 92 },
// 	{ zone: "Zone E", properties: 1004, surveys: 964, completion: 96 },
// ]

const BarChartCust = ({zoneData}) => {
	return (
		<motion.div {...fadeInUp} className='h-full'>
			<Card className="border-0 shadow-xl h-full">
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
							<Bar dataKey="completionPercentage" fill="#164e63" radius={[4, 4, 0, 0]} />
						</BarChart>
					</ResponsiveContainer>
					<p className="text-center text-sm text-gray-500 mt-2">
						Zone Properties - Surveys Completion Percentage
					</p>
				</CardContent>
			</Card>
		</motion.div>
	)
}

export default BarChartCust
