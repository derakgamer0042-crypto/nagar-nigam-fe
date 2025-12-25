import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Building2, Search, ChevronDown, User } from "lucide-react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/user-view");
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="border-b border-border bg-card/50 backdrop-blur-sm py-4 px-4 ">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo and Title */}
        <div className="flex items-center space-x-3 flex-1">
          <div className="bg-primary/10 p-2 rounded-lg">
            <Building2 className="md:h-8 md:w-8 w-4 h-4 text-primary" />
          </div>
          <div className="flex flex-wrap flex-col md:flex-row items-center">
            <span className="text-md md:text-xl font-bold text-foreground">
              Digital ULB
            </span>

            {/* Hide separator on mobile */}
            <span className="hidden md:inline font-bold text-muted-foreground mx-2">
              |
            </span>

            {/* Line break only on mobile */}
            {/* <br className="block md:hidden" /> */}

            <span className="text-xs md:text-lg text-foreground font-bold whitespace-nowrap">
              नगर पंचायत करहल मैनपुरी
            </span>
          </div>
        </div>

        <div className="flex md:ml-auto items-center">
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative">
              {/* <Input
							type="text"
							placeholder="Enter PPIN Number"
							className="pl-10 pr-4 py-3 bg-background/80 border-2 border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg transition-all duration-200 placeholder:text-muted-foreground/70"
						/>
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground/70" /> */}

              <Button
                onClick={handleRedirect}
                className="border border-solid border-black cursor-pointer text-sm sm:text-base md:text-lg px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-3 w-full sm:w-auto"
              >
                See your Details
              </Button>
            </div>
          </div>

          <div className="relative" ref={dropdownRef}>
            <Button
              // variant="outline"
              className="border-primary cursor-pointer text-primary hover:bg-primary hover:text-primary-foreground bg-transparent flex items-center space-x-2 px-2 md:px-4 py-2 shadow-md"
              // onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              onClick={() => router.push("https://api.npup.in/karhal/admin/login")}
            >
              <User className="h-4 w-4" />
              <span>Login</span>
              <motion.div
                animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {/* <ChevronDown className="h-4 w-4" /> */}
              </motion.div>
            </Button>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute right-0 mt-2 w-64 bg-background border border-border rounded-lg shadow-lg overflow-hidden z-50"
                >
                  <div className="py-2">
                    <Link
                      href="/login?role=admin"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <div className="flex items-center px-4 py-3 hover:bg-gray-100 transition-colors cursor-pointer group">
                        <User className="h-4 w-4 text-muted-foreground group-hover:text-primary mr-3" />
                        <span className="text-sm font-medium text-foreground group-hover:text-primary">
                          Login as Admin
                        </span>
                      </div>
                    </Link>
                    <Link
                      href="/login?role=official"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <div className="flex items-center px-4 py-3 hover:bg-gray-100 transition-colors cursor-pointer group">
                        <User className="h-4 w-4 text-muted-foreground group-hover:text-primary mr-3" />
                        <span className="text-sm font-medium text-foreground group-hover:text-primary">
                          Login as Nagar Nigam Official
                        </span>
                      </div>
                    </Link>
                    <Link
                      href="/login?role=surveyor"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <div className="flex items-center px-4 py-3 hover:bg-gray-100 transition-colors cursor-pointer group">
                        <User className="h-4 w-4 text-muted-foreground group-hover:text-primary mr-3" />
                        <span className="text-sm font-medium text-foreground group-hover:text-primary">
                          Login as Surveyor
                        </span>
                      </div>
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
		  
        </div>
      </div>
    </div>
  );
}
