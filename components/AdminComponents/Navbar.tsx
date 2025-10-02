"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Building2, Bell, LogOut, Menu, X } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleClick = (e: any, id: any) => {
    e.preventDefault();
    setIsSidebarOpen(false);
    scrollToComponent(id);
  };

  const scrollToComponent = (id: any) => {
    const element = document.getElementById(id);
    if (!element) return;

    // Get navbar height dynamically
    const navbar = document.getElementById("navbar"); // give your navbar an id
    const navbarHeight = navbar ? navbar.offsetHeight : 0;

    // Scroll smoothly considering navbar height
    const y =
      element.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const router = useRouter();

  const logout = async () => {
    try {
      const res = await axios({
        url: "/api/logout",
        method: "get",
        withCredentials: true,
      });

      console.log("response is : ", res.data);
      router.push("/login");
    } catch (err) {
      console.log("[ERROR] while logging out");
    }
  };

  return (
    <>
      <motion.header
        className="border-b border-border/30 bg-white/95 backdrop-blur-xl sticky top-0 z-50 shadow-sm"
        id="navbar"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="px-4 sm:px-6 md:px-8 py-4 md:py-6 flex items-center justify-between">
          {/* Left section: Menu + Logo */}
          <div className="flex items-center space-x-3 md:space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="hover:bg-primary/10 p-2 md:hidden" // only visible on mobile
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="h-6 w-6 text-primary" />
            </Button>
            <Link href="/" className="flex items-center space-x-2 sm:space-x-3">
              <div className="p-2.5 sm:p-3 bg-gradient-to-br from-primary via-primary to-secondary rounded-2xl shadow-lg">
                <Building2 className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
              </div>
              <div className="hidden md:flex md:flex-col md:justify-center md:items-center">
                <span className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Nagar Nigam
                </span>
                <p className="flex justify-center items-center text-xs sm:text-sm text-muted-foreground font-medium -mt-0.5 sm:-mt-1">
                  Admin Dashboard
                </p>
              </div>
            </Link>
          </div>

          {/* Right section: Notifications + Logout */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="relative hover:bg-primary/10"
            >
              <Bell className="h-5 w-5 text-primary" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-secondary rounded-full text-[10px] sm:text-xs flex items-center justify-center text-white font-bold">
                3
              </span>
            </Button>

            <Button
              size="sm"
              className="border-primary cursor-pointer text-primary hover:bg-primary hover:text-primary-foreground bg-transparent flex items-center px-2 sm:px-4 py-1.5 sm:py-2 shadow-md text-sm sm:text-base"
              onClick={logout}
            >
              <LogOut className="h-4 w-4 mr-1 sm:mr-2" />
              <span className="hidden md:flex">Logout</span>
            </Button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isSidebarOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
            />

            {/* Sidebar */}
            <motion.div
              className="fixed left-0 top-0 h-full w-64 sm:w-72 md:w-80 bg-white shadow-xl z-50 border-r border-border/30"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <div className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-6 sm:mb-8">
                  <h2 className="text-lg sm:text-xl font-semibold text-primary">
                    Menu
                  </h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsSidebarOpen(false)}
                    className="hover:bg-primary/10 p-2"
                  >
                    <X className="h-5 w-5 text-primary" />
                  </Button>
                </div>

                <nav className="space-y-1 sm:space-y-2">
                  <Link
                    onClick={(e) => handleClick(e, "property-classification")}
                    href="#"
                    className="block px-3 sm:px-4 py-2 sm:py-3 rounded-lg hover:bg-primary/10 text-primary font-medium text-sm sm:text-base"
                  >
                    Properties Classification
                  </Link>
                  <Link
                    onClick={(e) => handleClick(e, "total-tax-classification")}
                    href="#"
                    className="block px-3 sm:px-4 py-2 sm:py-3 rounded-lg hover:bg-primary/10 text-primary font-medium text-sm sm:text-base"
                  >
                    Total Tax Classification
                  </Link>
                  <Link
                    onClick={(e) => handleClick(e, "recent-survey-submissions")}
                    href="#"
                    className="block px-3 sm:px-4 py-2 sm:py-3 rounded-lg hover:bg-primary/10 text-primary font-medium text-sm sm:text-base"
                  >
                    Recent Survey Submissions
                  </Link>
                  <Link
                    onClick={(e) => handleClick(e, "recent-activities")}
                    href="#"
                    className="block px-3 sm:px-4 py-2 sm:py-3 rounded-lg hover:bg-primary/10 text-primary font-medium text-sm sm:text-base"
                  >
                    Recent Activities
                  </Link>
                  <Link
                    onClick={(e) => handleClick(e, "chart-analysis")}
                    href="#"
                    className="block px-3 sm:px-4 py-2 sm:py-3 rounded-lg hover:bg-primary/10 text-primary font-medium text-sm sm:text-base"
                  >
                    Chart Analysis
                  </Link>
                  <Link
                    href="#"
                    className="block px-3 sm:px-4 py-2 sm:py-3 rounded-lg hover:bg-primary/10 text-primary font-medium text-sm sm:text-base"
                  >
                    Report Generation
                  </Link>
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
