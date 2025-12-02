"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const images = [
  "/heroposter.jpg",
  "/hero-modi.jpg",
  "/karhalChairman.jpg",
  "/karhalEO.jpg",
  "/bhagidari_karhal.png",
  "/nagar_karhal.png"
];

export default function HeroSection() {
  const [index, setIndex] = useState(0);

  // Auto slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[82vh] overflow-hidden">

      {/* ------ BACKGROUND CAROUSEL ------ */}
      <AnimatePresence>
        <motion.img
          key={index}
          src={images[index]}
          alt="Background"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 w-full h-full object-contain"
        />
      </AnimatePresence>

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
<Badge className="relative z-10 w-fit bg-white/20 border-white/30">
          Property Management Platform
        </Badge>
      {/* ------ CONTENT OVERLAY ------ */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 text-center px-4 w-full max-w-3xl">


  <h2 className="text-4xl font-bold leading-tight">
    Streamline Your Muncipal Survey
  </h2>

  <p className="mt-2 text-white/80">
    Comprehensive property management and survey administration platform
    designed for modern municipal operations.
  </p>

</div>

    </section>
  );
}
