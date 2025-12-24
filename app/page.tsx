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
const cards = [
  {
    img: "/yogi.jpg",
    name: "योगी आदित्यनाथ",
    post: "माननीय मुख्यमंत्री",
    location:"(उत्तर प्रदेश)",
  },
  {
    img: "/arvind.jpg",
    name: "श्री अरविंद कुमार शर्मा",
    post: "माननीय नगर विकास मंत्री",
    location:"(उत्तर प्रदेश)",
  },
  {
    img: "/deputyminister.jpg",
    name: "श्री केशव प्रसाद मौर्या",
    post: "उप मुख्यमंत्री",
    location:"(उत्तर प्रदेश)",
  },
  {
    img: "/karhalChairman.jpg ",
    name: "चौ0 अब्दुल नईम",
    post: "अध्यक्ष महोदय",
    location:"(नगर पंचायत करहल मैनपुरी)",
  },
  {
    img: "/karhalEO.jpg",
    name: "लेखराज भारती",
    post: "अधिशासी अधिकारी",
    location:"(नगर पंचायत करहल मैनपुरी)",
  },
  {
    img: "/rakesh.jpg",
    name: "श्री राकेश राठौर गुरु",
    post: "माननीय नगर विकास राज्य मंत्री",
    location:"(उत्तर प्रदेश)",
  },
  {
    img: "/guruprasad.jpeg",
    name: "श्री पी0 गुरूप्रसाद",
    post: "प्रमुख सचिव नगर विकास विभाग",
    location:"(उत्तर प्रदेश)",
  },
  {
    img: "/anuj.jpeg",
    name: "श्री अनुज कुमार झा",
    post: "निदेशक स्थानीय निकाय",
    location:"(उत्तर प्रदेश)",
  }
];




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
              <span className="text-sm font-medium">नगर पंचायत करहल मैनपुरी</span>
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
      <section className="py-5 px-4 bg-muted/30">
        <div className="container mx-auto">
          <motion.div className="text-center mb-16" {...fadeInUp}>
{/*<div className="mx-auto max-w-3xl border border-gray-300 bg-white">
  <div className="bg-blue-800 px-6 py-3">
    <h2 className="text-xl font-medium text-white">
      Municipal Survey Management System
    </h2>
  </div>

  <div className="p-8">
    <h3 className="text-2xl font-semibold text-gray-900">
      Streamline Your Municipal Survey
    </h3>

    <p className="mt-4 text-gray-700 leading-relaxed">
      A comprehensive property management and survey administration platform
      designed to support efficient, transparent, and accountable municipal
      operations.
    </p>
  </div>
</div>*/}
            <div className="flex items-center justify-center space-x-3 mb-4 mt-6">
              <div className="bg-primary/10 p-2 rounded-lg">
                <Building2 className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl md:text-4xl font-bold text-foreground">Survey Components</h2>
            </div>
            <div className="w-16 h-1 bg-[#CD5C08] mx-auto mb-6"></div>
            <p className="text-base md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive data collection and management across all municipal sectors.
            </p>
          </motion.div>
<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
  {cards.map((card, i) => (
    <div
      key={i}
      className="bg-neutral-primary-soft w-full border border-default rounded-base shadow-xs"
    >
      <img
        className="rounded-t-base sm:h-55 lg:h-80 w-full object-fill"
        src={card.img}
        alt={card.post}
      />

      <div className="p-3 sm:p-4 text-center">
        <span className="block font-bold px-1.5 py-0.5 whitespace-nowrap text-[clamp(15px,2vw,22px)]">
          {card.name}
        </span>

        <span className="block font-semibold whitespace-nowrap text-[clamp(11.5px,1.7vw,16px)]">
          {card.post}
        </span>
        <span className="font-semibold whitespace-nowrap text-[clamp(11px,1.7vw,12px)]">
          {card.location}
        </span>
      </div>
    </div>
  ))}
</div>


<div className="mt-10 space-y-10">

  {/* Category 1 */}
  <div>
    <h2 className="text-2xl font-bold text-[#6A9C89] mb-4">महत्वपूर्ण सूत्र</h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {[
        {
          desc: "ई- नगर सेवा",
          link: "http://e-nagarsewaup.gov.in/",
        },
        {
          desc: "नगर विकास",
          link: "http://urbandevelopment.up.nic.in/",
        },
        {
          desc: "यू० पी० ऑनलाइन",
          link: "http://uponline.up.nic.in/",
        },
        {
          desc: "स्मार्ट सिटिज़",
          link: "https://smartcities.gov.in/",
        },
        {
          desc: "अमृत सिटिज़",
          link: "http://amrut.gov.in/content/",
        },
        {
          desc: "अर्बन सॉफ्ट",
          link: "https://e-nagarsewaup.gov.in/mpr/",
        },
        {
          desc: "स्वच्छ भारत मिशन (शहरी)",
          link: "https://sbmurban.org/",
        },
      ].map((item, i) => (
        <a
          key={i}
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="block p-2 bg-[#C1D8C3]/30 rounded-xl border border-[#6A9C89]/20 
                     hover:bg-[#C1D8C3]/50 hover:shadow-md transition-all cursor-pointer"
        >
          <p className="text-gray-700 text-sm">{item.desc}</p>
        </a>
      ))}
    </div>
  </div>

  {/* Category 2 */}
  <div>
    <h2 className="text-2xl font-bold text-[#6A9C89] mb-4">नागरिक सेवाएं</h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {[
        {
          desc: "जन्म प्रमाण पत्र - सत्यापन",
          link: "https://e-nagarsewaup.gov.in/ulbapps/death_birth/citizenBirthVerification.action",
        },
        {
          desc: "मृत्यु प्रमाण पत्र - सत्यापन",
          link: "https://e-nagarsewaup.gov.in/ulbapps/death_birth/citizenDeathVerification.action",
        },
        {
          desc: "लाइसेंस प्रमाण पत्र - सत्यापन",
          link: "https://e-nagarsewaup.gov.in/ulbapps/licenses/licenses/licenseCheck.action",
        },
        {
          desc: "ई-नगर सेवा से जुड़े हुए अस्पताल",
          link: "https://e-nagarsewaup.gov.in/ulbapps/OnlineUser/hospitallist_dist.jsp",
        },
        {
          desc: "शिकायतें ट्रैक करें",
          link: "https://e-nagarsewaup.gov.in/ulbapps/Grievance/onlineGrievanceStatus.jsp",
        },
        {
          desc: "आर०टी०आई० आवेदन-ट्रैक करें",
          link: "https://e-nagarsewaup.gov.in/ulbapps/OnlineUser/rti_citizen_stat.jsp",
        },
        {
          desc: "Step 1: ऑनलाइन आर टी आई 6(1) भरें",
          link: "https://rtionline.up.gov.in/guidelines.php?lan=M",
        },
        {
          desc: "Step 2: प्रथम अपील 19(1) भरें",
          link: "https://rtionline.up.gov.in/guidelinesappeal.php?lan=M",
        },
        {
          desc: "Step 3: द्वितीय अपील 19(3)/शिकायत 18(1) भरें",
          link: "https://upsic.up.gov.in/cispu/citizen",
        },
      ].map((item, i) => (
        <a
          key={i}
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="block p-2 bg-[#C1D8C3]/30 rounded-xl border border-[#6A9C89]/20 
                     hover:bg-[#C1D8C3]/50 hover:shadow-md transition-all cursor-pointer"
        >
          <p className="text-gray-700 text-sm">{item.desc}</p>
        </a>
      ))}
    </div>
  </div>

  {/* Category 3 */}
  <div>
    <h2 className="text-2xl font-bold text-[#6A9C89] mb-4">सूचनाएं - निदेशालय सम्बंधित</h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {[
        {
          desc: "आदेश",
          link: "https://localbodies.up.nic.in/download-pdfs-one.html",
        },
        {
          desc: "वित्त सम्बंधित",
          link: "https://localbodies.up.nic.in/download-pdfs-two.html",
        },
        {
          desc: "सेवा सम्बंधित",
          link: "https://localbodies.up.nic.in/download-pdfs-three.html",
        },
        {
          desc: "विज्ञापन / नोटिस",
          link: "https://localbodies.up.nic.in/download-pdfs-four.html",
        },
        {
          desc: "अमृत / स्मार्ट सिटिज़",
          link: "https://localbodies.up.nic.in/download-pdfs-six.html",
        },
        {
          desc: "स्वच्छ भारत मिशन (शहरी)",
          link: "https://localbodies.up.nic.in/download-pdfs-seven.html",
        },
        {
          desc: "पी० एम० यू०",
          link: "https://localbodies.up.nic.in/download-pdfs-eight.html",
        },
        {
          desc: "पुराने आदेश",
          link: "https://localbodies.up.nic.in/download-pdfs-nine.html",
        },
        {
          desc: "कार्य कलाप 2017-18 ",
          link: "https://localbodies.up.nic.in/pdf/KaryakalapReport2016-17.pdf",
        },
        {
          desc: "एस० एल० बी० 2017-18",
          link: "https://localbodies.up.nic.in/slb.html",
        },
        {
          desc: "यू पी एस डब्लू एम सैनिटेशन रुल्स 2019",
          link: "https://localbodies.up.nic.in/SWN_NOTICE.html",
        },
      ].map((item, i) => (
        <a
          key={i}
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="block p-2 bg-[#C1D8C3]/30 rounded-xl border border-[#6A9C89]/20 
                     hover:bg-[#C1D8C3]/50 hover:shadow-md transition-all cursor-pointer"
        >
          <p className="text-gray-700 text-sm">{item.desc}</p>
        </a>
      ))}
    </div>
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
            <span className="font-bold text-foreground">Digital ULB |</span>
               <span className="font-semi-bold text-foreground">
                नगर पंचायत करहल मैनपुरी
               </span>
          </div>
          <p className="text-muted-foreground">© 2025-26 APEX INTERNATIONAL. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
