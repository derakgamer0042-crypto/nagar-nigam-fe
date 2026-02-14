"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const images = [
  "/ghiror-hero.png",
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
    <section className="relative w-full md:h-[82vh] sm:h-[65vh] h-[35vh] overflow-hidden">

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
          className="absolute inset-0 w-full h-full object-fit"
        />
      </AnimatePresence>

      {/* DARK OVERLAY */}
      {/* <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" /> */}
      {/* ------ CONTENT OVERLAY ------ */}
      {/* <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 text-center px-4 w-full max-w-3xl">



</div> */}

    </section>
  );
}
