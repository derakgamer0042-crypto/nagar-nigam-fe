"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Building2,
  ArrowRight,
  MapPin,
  Search,
  Facebook,
  Instagram,
  Linkedin,
  MessageCircle,
  ChevronDown,
  User,
  Building,
  GraduationCap,
  Heart,
  Trees,
  Bus,
} from "lucide-react"
import Link from "next/link"
import { useState, useRef, useEffect } from "react"
import HeroSection from "@/components/HeroSection"
import Navbar from "@/components/Navbar"
import LocationListings from "@/components/HomePageComponents/LocationListings"



const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}



export default function LandingPage() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <motion.header
        className="sticky top-0 z-50"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Top Bar */}
        <div className="bg-slate-800 text-white py-2 px-4">
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span className="text-sm font-medium">Noida</span>
            </div>
            <div className="flex items-center space-x-3">
              <Instagram className="h-4 w-4 hover:text-primary cursor-pointer transition-colors" />
              <Facebook className="h-4 w-4 hover:text-primary cursor-pointer transition-colors" />
              <Linkedin className="h-4 w-4 hover:text-primary cursor-pointer transition-colors" />
              <MessageCircle className="h-4 w-4 hover:text-primary cursor-pointer transition-colors" />
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <Navbar/>

      </motion.header>

      {/* Hero Section */}
      {/* <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <motion.div {...fadeInUp}>
            <Badge variant="secondary" className="mb-4 bg-accent/10 text-accent border-accent/20">
              Property Management Platform
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
              Streamline Your
              <span className="text-primary block">Municipal Surveys</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Comprehensive property management and survey administration platform designed for modern municipal
              operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  View Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
              >
                Learn More
              </Button>
            </div>
          </motion.div>
        </div>
      </section> */}
      <HeroSection/>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-7xl">
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="bg-primary/10 p-2 rounded-lg">
                <Building2 className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">Survey Components</h2>
            </div>
            <div className="w-16 h-1 bg-[#CD5C08] mx-auto mb-6"></div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive data collection and management across all municipal sectors.
            </p>
          </motion.div>

          <div className="relative">
            <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-4">
              {[
                {
                  title: "Property Management",
                  description: "Track residential, non-residential, and mixed properties with detailed categorization.",
                  image: "/sunset-city-silhouettes.png",
                },
                {
                  title: "Data Visualization",
                  description: "Interactive charts and graphs to visualize survey data and property statistics.",
                  image: "/modern-office-workspace-charts.png",
                },
                {
                  title: "Survey Administration",
                  description: "Manage survey submissions with zone, ward, and locality-based filtering.",
                  image: "/mountain-road-green-valley.png",
                },
                {
                  title: "Municipal Analytics",
                  description: "Comprehensive insights and reporting for informed decision making.",
                  image: "/modern-office-workspace-charts.png",
                },
                {
                  title: "Secure Access",
                  description: "Role-based access control with secure authentication for administrators.",
                  image: "/security-shield-digital-lock.png",
                },
                {
                  title: "Real-time Updates",
                  description: "Live activity feeds and instant updates on survey submissions and changes.",
                  image: "/real-time-dashboard-notifications.png",
                },
                {
                  title: "Easy Integration",
                  description: "Seamless integration with existing municipal systems and databases.",
                  image: "/system-integration-network.png",
                },
                {
                  title: "Quality Assurance",
                  description: "Automated validation and quality checks for all survey data submissions.",
                  image: "/placeholder-7ngv4.png",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex-shrink-0 w-80 h-96"
                  variants={fadeInUp}
                  whileHover={{
                    y: -8,
                    transition: {
                      type: "spring",
                      stiffness: 300,
                      damping: 25,
                    },
                  }}
                >
                  <Card className="bg-[#C1D8C3]/30 shadow-lg border-0 rounded-2xl overflow-hidden h-full hover:shadow-xl transition-all duration-300 p-0">
                    <div className="h-48 overflow-hidden rounded-t-2xl">
                      <img
                        src={feature.image || "/placeholder.svg"}
                        alt={feature.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-6 h-48 flex flex-col justify-between">
                      <div>
                        <CardTitle className="text-xl font-bold text-[#6A9C89] mb-3 leading-tight">
                          {feature.title}
                        </CardTitle>
                        <CardDescription className="text-gray-600 leading-relaxed text-sm">
                          {feature.description}
                        </CardDescription>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="w-2 h-2 rounded-full bg-[#6A9C89]/30 hover:bg-[#6A9C89]/60 transition-colors duration-200"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            className="grid md:grid-cols-3 gap-8 text-center"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                number: "50K+",
                label: "Properties Surveyed",
                bgColor: "bg-primary/10",
                numberColor: "text-primary",
                borderColor: "border-primary/20",
              },
              {
                number: "25+",
                label: "Zones Covered",
                bgColor: "bg-accent/15",
                numberColor: "text-accent",
                borderColor: "border-accent/30",
              },
              {
                number: "99.9%",
                label: "System Uptime",
                bgColor: "bg-secondary/20",
                numberColor: "text-secondary-foreground",
                borderColor: "border-secondary/30",
              },
            ].map((stat, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card
                  className={`${stat.bgColor} border-2 ${stat.borderColor} hover:shadow-lg transition-all duration-300 backdrop-blur-sm`}
                >
                  <CardContent className="pt-8 pb-6">
                    <div className={`text-5xl font-bold ${stat.numberColor} mb-3`}>{stat.number}</div>
                    <div className="text-muted-foreground font-medium">{stat.label}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Location Filtering and Map Section */}
      <LocationListings fadeInUp={fadeInUp} />

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary/5">
        <div className="container mx-auto text-center max-w-3xl">
          <motion.div {...fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
              Ready to Transform Your Municipal Operations?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join the modern era of property management and survey administration.
            </p>
            <Link href="/dashboard">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                Get Started Today
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/30 py-8 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Building2 className="h-6 w-6 text-primary" />
            <span className="font-semibold text-foreground">Nagar Nigam Survey Platform</span>
          </div>
          <p className="text-muted-foreground">© 2024 Municipal Survey Administration. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
