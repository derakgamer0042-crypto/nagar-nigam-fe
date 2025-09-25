"use client"
import React, { useEffect, useState } from 'react'
import {motion} from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, Clock, Filter, Search, XCircle } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from "@/components/ui/badge"
import {formatDate} from "@/lib/formatDate.ts"
import axios from "axios"

const SurveyorData = ({fadeInUp} : {fadeInUp : any}) => {


// 	const surveySubmissions = [
//   {
//     id: "SUR001",
//     zone: "Sirsaganj",
//     ward: "Ward 12",
//     locality: "Sector A",
//     status: "Completed",
//     date: "2024-08-17",
//     surveyor: "Raj Kumar",
//     priority: "high",
//   },
//   {
//     id: "SUR002",
//     zone: "Sirsaganj",
//     ward: "Ward 8",
//     locality: "Sector B",
//     status: "Pending",
//     date: "2024-08-17",
//     surveyor: "Priya Singh",
//     priority: "medium",
//   },
//   {
//     id: "SUR003",
//     zone: "Zone B",
//     ward: "Ward 15",
//     locality: "Market Area",
//     status: "In Progress",
//     date: "2024-08-16",
//     surveyor: "Amit Sharma",
//     priority: "high",
//   },
//   {
//     id: "SUR004",
//     zone: "Zone C",
//     ward: "Ward 22",
//     locality: "Residential",
//     status: "Completed",
//     date: "2024-08-16",
//     surveyor: "Sunita Devi",
//     priority: "low",
//   },
//   {
//     id: "SUR005",
//     zone: "Zone A",
//     ward: "Ward 5",
//     locality: "Commercial",
//     status: "Pending",
//     date: "2024-08-15",
//     surveyor: "Vikash Gupta",
//     priority: "medium",
//   },
// ]

const [surveySubmissions , setSurverySubmissionss] = useState([])
// const [filteredSurveys , setFilteredSurveys] = useState([])
const[searchValue , setSearchValue] = useState<string>("")

const getSurveyourData = async()=>{
	try{

		const res = (await axios({
			url : `${process.env.NEXT_PUBLIC_BACKEND_URL}${process.env.NEXT_PUBLIC_ADMIN_ROUTES}/surveyor-info`,
			method : "post",
			data : {}
		})).data

		console.log("response is : " , res)
		setSurverySubmissionss(res?.data?.surveyors)
		// setFilteredSurveys(res?.data?.surveyors)

	}catch(err : any){
		console.log("[ERROR] in getSurveyourData : " , err.message)
	}
}

useEffect(()=>{

	(async()=>{
		await getSurveyourData();
	})()

},[])


// const searchByNameOrEmail = (query:string)=>{
	
// 	console.log("query is : " , query)
	
// 	const surveyors =  surveySubmissions.filter((doc : any)=>{
// 		return (doc?.name.toLowerCase().includes(query) || doc?.email.toLowerCase().includes(query))
// 	})

// 	console.log("filtered data : " , surveyors)
// 	setFilteredSurveys(surveyors)

// }


const filterOutSurveyors = (data:any)=>{
	return (data.email.toLowerCase().includes(searchValue.toLowerCase()) || data.name.toLowerCase().includes(searchValue.toLowerCase()))
}

console.log("✅")


	return (
		<motion.div {...fadeInUp} id='recent-survey-submissions' >
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
								<Input value={searchValue} onChange={(e)=> setSearchValue(e.target.value)} placeholder="Search submissions..." className="pl-10 w-64 border-0 bg-muted/50" />
							</div>
							<Button
								// variant="outline"
								size="sm"
								className="cursor-pointer border-secondary/20 text-secondary hover:bg-secondary hover:text-secondary-foreground bg-transparent font-medium"
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
									{/* <th className="text-left py-4 px-4 font-semibold text-foreground">Priority</th> */}
									<th className="text-left py-4 px-4 font-semibold text-foreground">Date</th>
									<th className="text-left py-4 px-4 font-semibold text-foreground">Surveyor</th>
								</tr>
							</thead>
							<tbody>
								{surveySubmissions.filter(filterOutSurveyors).map((submission , index) => (
									<tr key={index} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
										<td className="py-4 px-4 font-medium text-foreground">{submission.surveyorId}</td>
										<td className="py-4 px-4">
											<div className="space-y-1">
												<p className="font-medium text-foreground"> WARD NO: {submission?.ward}</p>
												<p className="text-sm text-muted-foreground">
													{submission?.ward}, {submission?.address}
												</p>
											</div>
										</td>
										<td className="py-4 px-4">
											<Badge
												variant="outline"
												className={
													submission?.isSurveyVerified ? "border-emerald-200 bg-emerald-50 text-emerald-700": "border-red-200 bg-red-50 text-red-700"
															// : "border-amber-200 bg-amber-50 text-amber-700"
												}
											>
												{submission.isSurveyVerified  && <CheckCircle className="h-3 w-3 mr-1" />}
												{!submission.isSurveyVerified && <XCircle className="h-3 w-3 mr-1" />}
												{submission.isSurveyVerified ? "Completed" : "Pending"}
											</Badge>
										</td>
										{/* <td className="py-4 px-4">
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
										</td> */}
										<td className="py-4 px-4 text-muted-foreground">{ formatDate(submission?.surveyDate) }</td>
										<td className="py-4 px-4">
											<div className="flex items-center space-x-2">
												<div className="h-8 w-8 bg-gradient-to-br from-secondary to-secondary/80 rounded-full flex items-center justify-center">
													<span className="text-xs font-medium text-white">
														{submission?.name
															.split(" ")
															.map((n) => n[0])
															.join("")}
													</span>
												</div>
												<span className="text-foreground">{submission?.name}</span>
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
	)
}

export default SurveyorData
