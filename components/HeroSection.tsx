"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

export default function HeroSection() {
  return (
    <section className="py-16 px-4 lg:py-24">
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content Column - Left Side */}
          <motion.div {...fadeInUp} className="space-y-6">
            <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20 w-fit">
              Property Management Platform
            </Badge>

            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-serif font-bold text-foreground leading-tight">
              Streamline Your
              <span className="text-primary block">Municipal Surveys</span>
            </h1>

            <p className="text-lg lg:text-xl text-muted-foreground max-w-lg leading-relaxed">
              Comprehensive property management and survey administration platform designed for modern municipal
              operations.
            </p>

            <div className="flex flex-col justify-center items-center md:justify-start md:flex-row gap-4 md:gap-10 py-2 md:w-fit">
              <Link href="/dashboard">
                <Button size="lg" className="bg-primary cursor-pointer hover:bg-primary/90 text-primary-foreground shadow-lg">
                  View Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Button
                // variant="outline"
                size="lg"
                className="border-primary/20 cursor-pointer text-primary hover:bg-primary/5 bg-transparent shadow-md"
              >
                Learn More
              </Button>
            </div>
          </motion.div>

          {/* Image Column - Right Side */}
          <motion.div {...fadeInUp} transition={{ duration: 0.6, delay: 0.2 }} className="relative h-full flex justify-center items-center">
            <div className="relative rounded-2xl overflow-hidden bg-card">
              <img
                src="/hero-modi.jpg"
                alt="Property management platform dashboard interface"
                className="max-h-[400px] object-fill"
              />
              {/* Subtle overlay for depth */}
              {/* <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent" /> */}
            </div>

            {/* Decorative element */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-accent/10 rounded-full blur-xl" />
            <div className="absolute -top-4 -left-4 w-16 h-16 bg-primary/10 rounded-full blur-lg" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
