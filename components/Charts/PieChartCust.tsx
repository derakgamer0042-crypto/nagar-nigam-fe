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
} from "recharts"
import Link from "next/link"

const fadeInUp = {
	initial: { opacity: 0, y: 20 },
	animate: { opacity: 1, y: 0 },
	transition: { duration: 0.5 },
}

const PieChartCust = ({propertyData}) => {

	// const propertyData = [
	// 	{ name: "Residential", value: 11295, color: "#0891b2" },
	// 	{ name: "Non-Residential", value: 514, color: "#d97706" },
	// 	{ name: "Mixed", value: 1895, color: "#475569" },
	// ]

	return (
		<motion.div {...fadeInUp} className='h-full'>
			<Card className="border-0 shadow-xl h-full">
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
					<p className="text-center text-sm text-gray-500 mt-2">
						Residential , Commercial and Mixed Properties area coverage
					</p>
				</CardContent>
			</Card>
		</motion.div>
	)
}

export default PieChartCust
