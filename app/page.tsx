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

const locationCategories = [
  { id: "all", name: "All Locations", icon: MapPin, count: 156 },
  { id: "government", name: "Government Offices", icon: Building, count: 24 },
  { id: "schools", name: "Schools & Colleges", icon: GraduationCap, count: 45 },
  { id: "hospitals", name: "Hospitals & Clinics", icon: Heart, count: 18 },
  { id: "parks", name: "Parks & Recreation", icon: Trees, count: 32 },
  { id: "transport", name: "Transport Hubs", icon: Bus, count: 12 },
]

const mockBuildings = {
  all: [
    {
      id: 1,
      name: "Noida Metro Station",
      category: "Transport",
      address: "Sector 16, Noida",
      rating: 4.2,
      status: "Active",
    },
    {
      id: 2,
      name: "District Collectorate",
      category: "Government",
      address: "Sector 27, Noida",
      rating: 4.0,
      status: "Active",
    },
    {
      id: 3,
      name: "Amity University",
      category: "Education",
      address: "Sector 125, Noida",
      rating: 4.5,
      status: "Active",
    },
    {
      id: 4,
      name: "Fortis Hospital",
      category: "Healthcare",
      address: "Sector 62, Noida",
      rating: 4.3,
      status: "Active",
    },
  ],
  government: [
    {
      id: 2,
      name: "District Collectorate",
      category: "Government",
      address: "Sector 27, Noida",
      rating: 4.0,
      status: "Active",
    },
    {
      id: 5,
      name: "Municipal Corporation Office",
      category: "Government",
      address: "Sector 6, Noida",
      rating: 3.8,
      status: "Active",
    },
    {
      id: 6,
      name: "Police Station Sector 20",
      category: "Government",
      address: "Sector 20, Noida",
      rating: 3.9,
      status: "Active",
    },
  ],
  schools: [
    {
      id: 3,
      name: "Amity University",
      category: "Education",
      address: "Sector 125, Noida",
      rating: 4.5,
      status: "Active",
    },
    {
      id: 7,
      name: "Delhi Public School",
      category: "Education",
      address: "Sector 30, Noida",
      rating: 4.4,
      status: "Active",
    },
    {
      id: 8,
      name: "Jaypee Institute of Technology",
      category: "Education",
      address: "Sector 62, Noida",
      rating: 4.2,
      status: "Active",
    },
  ],
  hospitals: [
    {
      id: 4,
      name: "Fortis Hospital",
      category: "Healthcare",
      address: "Sector 62, Noida",
      rating: 4.3,
      status: "Active",
    },
    {
      id: 9,
      name: "Max Super Speciality Hospital",
      category: "Healthcare",
      address: "Sector 19, Noida",
      rating: 4.1,
      status: "Active",
    },
    {
      id: 10,
      name: "Kailash Hospital",
      category: "Healthcare",
      address: "Sector 27, Noida",
      rating: 4.0,
      status: "Active",
    },
  ],
  parks: [
    { id: 11, name: "City Park", category: "Recreation", address: "Sector 46, Noida", rating: 4.2, status: "Active" },
    {
      id: 12,
      name: "Botanical Garden",
      category: "Recreation",
      address: "Sector 38A, Noida",
      rating: 4.6,
      status: "Active",
    },
    { id: 13, name: "Golf Course", category: "Recreation", address: "Sector 38, Noida", rating: 4.4, status: "Active" },
  ],
  transport: [
    {
      id: 1,
      name: "Noida Metro Station",
      category: "Transport",
      address: "Sector 16, Noida",
      rating: 4.2,
      status: "Active",
    },
    { id: 14, name: "ISBT Noida", category: "Transport", address: "Sector 37, Noida", rating: 3.8, status: "Active" },
    {
      id: 15,
      name: "Noida City Centre Metro",
      category: "Transport",
      address: "Sector 32, Noida",
      rating: 4.1,
      status: "Active",
    },
  ],
}

export default function LandingPage() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState("all")
  const [selectedLocation, setSelectedLocation] = useState<any>(null)
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
      <section className="py-20 px-4 bg-muted/20">
        <div className="container mx-auto max-w-7xl">
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Explore Locations & Properties</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Interactive map and comprehensive directory of all surveyed locations across Noida.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-8">
            {/* Left Sidebar - Location Filters */}
            <motion.div className="lg:col-span-4" {...fadeInUp}>
              <Card className="bg-white shadow-lg border-0 rounded-2xl overflow-hidden">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-bold text-gray-900">Filter Locations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 px-6 pb-6">
                  {locationCategories.map((category) => {
                    const IconComponent = category.icon
                    const isActive = activeCategory === category.id
                    return (
                      <motion.button
                        key={category.id}
                        onClick={() => setActiveCategory(category.id)}
                        className={`w-full flex items-center justify-between p-4 rounded-xl transition-all duration-200 ${
                          isActive
                            ? "bg-gray-900 text-white shadow-md"
                            : "hover:bg-gray-50 text-gray-700 border border-gray-100"
                        }`}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        <div className="flex items-center space-x-3">
                          <IconComponent
                            className={`h-5 w-5 ${
                              isActive
                                ? "text-white"
                                : category.id === "government"
                                  ? "text-blue-500"
                                  : category.id === "schools"
                                    ? "text-green-500"
                                    : category.id === "hospitals"
                                      ? "text-red-500"
                                      : category.id === "parks"
                                        ? "text-emerald-500"
                                        : category.id === "transport"
                                          ? "text-purple-500"
                                          : "text-gray-600"
                            }`}
                          />
                          <span className="font-medium text-left">{category.name}</span>
                        </div>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            isActive ? "bg-white/20 text-white" : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {category.count}
                        </span>
                      </motion.button>
                    )
                  })}
                </CardContent>
              </Card>

              {/* Location Listings */}
              <motion.div className="mt-6" {...fadeInUp}>
                <Card className="bg-white shadow-lg border-0 rounded-2xl overflow-hidden">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-bold text-gray-900">
                      {locationCategories.find((cat) => cat.id === activeCategory)?.name || "All Locations"}
                    </CardTitle>
                    <CardDescription className="text-gray-500">
                      {mockBuildings[activeCategory as keyof typeof mockBuildings]?.length || 0} locations found
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3 max-h-96 overflow-y-auto px-6 pb-6">
                    <AnimatePresence mode="wait">
                      {mockBuildings[activeCategory as keyof typeof mockBuildings]?.map((building, index) => (
                        <motion.div
                          key={building.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          onClick={() => setSelectedLocation(building)}
                          className={`p-4 rounded-xl transition-all duration-200 cursor-pointer ${
                            selectedLocation?.id === building.id
                              ? "bg-gray-50 border-2 border-gray-900 shadow-sm"
                              : "hover:bg-gray-50 border border-gray-100"
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-3 flex-1">
                              <MapPin className="h-4 w-4 text-gray-400 mt-1 flex-shrink-0" />
                              <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-gray-900 mb-1 truncate">{building.name}</h4>
                                <p className="text-sm text-gray-500 truncate">{building.address}</p>
                              </div>
                            </div>
                            {selectedLocation?.id === building.id && (
                              <div className="ml-2 flex-shrink-0">
                                <div className="w-2 h-2 bg-gray-900 rounded-full animate-pulse"></div>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>

            {/* Right Side - Interactive Map */}
            <motion.div className="lg:col-span-8" {...fadeInUp}>
              <Card className="bg-background/80 backdrop-blur-sm border-border/50 h-full min-h-[600px]">
                <CardContent className="p-6 h-full">
                  <div className="relative h-full bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg overflow-hidden flex justify-center items-center">
                    {/* Map Placeholder */}
                    {/* <div className="absolute inset-0 flex items-center justify-center">
                      <img
                        src="/noida-map.jpg"
                        alt="Interactive Map of Noida"
                        className="w-full h-full object-contain rounded-lg"
                      />
                    </div> */}

                    {/* Location Marker Overlay */}
                    {selectedLocation && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                      >
                        <div className="bg-primary text-primary-foreground px-4 py-2 rounded-lg shadow-lg border-2 border-background">
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4" />
                            <div>
                              <p className="font-semibold text-sm">{selectedLocation.name}</p>
                              <p className="text-xs opacity-90">{selectedLocation.address}</p>
                            </div>
                          </div>
                          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-primary"></div>
                        </div>
                      </motion.div>
                    )}

                    {/* Map Controls */}
                    <div className="absolute top-4 right-4 flex flex-col space-y-2">
                      <Button size="sm" variant="outline" className="bg-background/90 backdrop-blur-sm">
                        +
                      </Button>
                      <Button size="sm" variant="outline" className="bg-background/90 backdrop-blur-sm">
                        -
                      </Button>
                    </div>

                    {/* Map Info Panel */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <Card className="bg-background/95 backdrop-blur-sm border-border/50">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-foreground">
                                {selectedLocation ? `Viewing: ${selectedLocation.name}` : "Interactive Map"}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {selectedLocation
                                  ? `Located at ${selectedLocation.address}`
                                  : `Showing ${mockBuildings[activeCategory as keyof typeof mockBuildings]?.length || 0} locations`}
                              </p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div
                                className={`w-3 h-3 rounded-full ${selectedLocation ? "bg-primary animate-pulse" : "bg-primary"}`}
                              ></div>
                              <span className="text-xs text-muted-foreground">
                                {selectedLocation ? "Selected Location" : "Active Locations"}
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
          </div>
        </div>
      </section>

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
