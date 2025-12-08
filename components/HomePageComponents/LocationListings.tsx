"use client"

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Building, Bus, GraduationCap, Heart, MapPin, Trees , Store } from "lucide-react";
import { Button } from "../ui/button";

import dynamic from "next/dynamic";
import axios from "axios";
const LocationMap = dynamic(()=> import("../mapComponent/map") , {ssr : false} )

// import LocationMap from "../mapComponent/map";


interface LocationCategoriesType{
  allLocations? : any
  governmentOffices? : any
  schoolsAndColleges? : any
  hospitalsAndClinics? : any
  parksAndRecreation? : any
  transportHubs? : any
  localShops? : any
}


// here we have to map the locationCategoryNameKey with the locatoin Name to display on frontend
const categoryKeyMapping = {
  allLocations : { name : "All Locations" , icon : MapPin  },
  governmentOffices : { name : "Goverment Offices" , icon :  Building },
  schoolsAndColleges : { name : "Schools and Colleges" , icon :  GraduationCap },
  hospitalsAndClinics : { name :  "Hospital and Clinics" , icon : Heart  },
  parksAndRecreation : { name :  "Park and Recreation" , icon : Trees  },
  transportHubs : { name :  "Transport Hubs" , icon : Bus  },
  localShops : { name :  "Local Shops" , icon : Store  }
}


const LocationListings = ({fadeInUp} : any) => {




	const[isLoading , setIsLoading] = useState(true)
	const[locationcategories , setLocationCategories] = useState<any>()
	const [selectedLocation, setSelectedLocation] = useState<any>(null)
	const [activeCategory, setActiveCategory] = useState("all")
	// const [selected, setSelected] = useState<any>(null);


  console.log("locationcategories are : " , locationcategories);

	const fetchLocationGroups = async()=>{
		try{
      setIsLoading(true);
			const res = (await axios({
				url : `${process.env.NEXT_PUBLIC_BACKEND_URL}${process.env.NEXT_PUBLIC_PUBLIC_ROUTES}/get-locations`,
				method : "get"
			})).data

			console.log("data is : " , res.data)

			// setLocationCategories(Object.keys(res?.data))
      
      const locationCategoriesDataBuild = Object.entries(res?.data).map(([key , value] : any)=>{
        return {
          locationCategoryNameKey : key,
          locationCategoryNameToDisplay : categoryKeyMapping[key]?.name ,
          totalNumberOfLocations : res?.data[key].length,
          locations : value,
          icon : categoryKeyMapping[key]?.icon
        }
      })

      setLocationCategories(locationCategoriesDataBuild)

      

		}catch(err : any){
			console.log("[ERROR in fetchLocationGroups : " , err.message)
		}finally{
      setIsLoading(false);
    }
	}

	useEffect(()=>{
		fetchLocationGroups()

	},[])

  // const locationCategories = [
  //   { id: "all", name: "All Locations", icon: MapPin, count: 156 },
  //   { id: "government", name: "Government Offices", icon: Building, count: 24 },
  //   {id: "schools",name: "Schools & Colleges",icon: GraduationCap,count: 45,},
  //   { id: "hospitals", name: "Hospitals & Clinics", icon: Heart, count: 18 },
  //   { id: "parks", name: "Parks & Recreation", icon: Trees, count: 32 },
  //   { id: "transport", name: "Transport Hubs", icon: Bus, count: 12 },
  // ];

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
      {
        id: 11,
        name: "City Park",
        category: "Recreation",
        address: "Sector 46, Noida",
        rating: 4.2,
        status: "Active",
      },
      {
        id: 12,
        name: "Botanical Garden",
        category: "Recreation",
        address: "Sector 38A, Noida",
        rating: 4.6,
        status: "Active",
      },
      {
        id: 13,
        name: "Golf Course",
        category: "Recreation",
        address: "Sector 38, Noida",
        rating: 4.4,
        status: "Active",
      },
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
      {
        id: 14,
        name: "ISBT Noida",
        category: "Transport",
        address: "Sector 37, Noida",
        rating: 3.8,
        status: "Active",
      },
      {
        id: 15,
        name: "Noida City Centre Metro",
        category: "Transport",
        address: "Sector 32, Noida",
        rating: 4.1,
        status: "Active",
      },
    ],
  };

  return (
    <section className="py-20 px-4 bg-muted/20">
      <div className="container mx-auto max-w-7xl">

        <motion.div className="text-center mb-16" {...fadeInUp}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Explore Locations & Properties
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Interactive map and comprehensive directory of all surveyed
            locations across Noida.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* Left Sidebar - Location Filters */}
          <motion.div className="lg:col-span-4" {...fadeInUp}>
            <Card className="bg-white shadow-lg border-0 rounded-2xl overflow-hidden">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold text-gray-900">
                  Filter Locations
                </CardTitle>
              </CardHeader>
              { !isLoading &&  <CardContent className="space-y-3 px-6 pb-6">
                {locationcategories?.map((category : any , index  : any) => {
                  const IconComponent = category.icon;
                  const isActive = activeCategory === category.locationCategoryNameKey;
                  return (
                    <motion.button
                      key={index}
                      onClick={() => setActiveCategory(category?.locationCategoryNameKey)}
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
                              : category?.locationCategoryNameKey === "governmentOffices"
                              ? "text-blue-500"
                              : category?.locationCategoryNameKey === "schoolsAndColleges"
                              ? "text-green-500"
                              : category?.locationCategoryNameKey === "hospitalsAndClinics"
                              ? "text-red-500"
                              : category?.locationCategoryNameKey === "parksAndRecreation"
                              ? "text-emerald-500"
                              : category?.locationCategoryNameKey === "transportHubs"
                              ? "text-purple-500"
                              : "text-gray-600"
                          }`}
                        />
                        <span className="font-medium text-left">
                          {category?.locationCategoryNameToDisplay}
                        </span>
                      </div>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          isActive
                            ? "bg-white/20 text-white"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {category?.totalNumberOfLocations}
                      </span>
                    </motion.button>
                  );
                })}
              </CardContent>}
            </Card>

            {/* Location Listings */}
            {/* <motion.div className="mt-6" {...fadeInUp}>
              <Card className="bg-white shadow-lg border-0 rounded-2xl overflow-hidden">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-bold text-gray-900">
                    {locationCategories.find((cat) => cat.id === activeCategory)
                      ?.name || "All Locations"}
                  </CardTitle>
                  <CardDescription className="text-gray-500">
                    {mockBuildings[activeCategory as keyof typeof mockBuildings]
                      ?.length || 0}{" "}
                    locations found
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 max-h-96 overflow-y-auto px-6 pb-6">
                  <AnimatePresence mode="wait">
                    {mockBuildings[
                      activeCategory as keyof typeof mockBuildings
                    ]?.map((building, index) => (
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
                              <h4 className="font-semibold text-gray-900 mb-1 truncate">
                                {building.name}
                              </h4>
                              <p className="text-sm text-gray-500 truncate">
                                {building.address}
                              </p>
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
            </motion.div> */}
          </motion.div>

          {/* Right Side - Interactive Map */}
          <motion.div className="lg:col-span-8" {...fadeInUp}>
            <Card className="bg-background/80 backdrop-blur-sm border-border/50 h-full min-h-[600px]">
              <CardContent className="p-6 h-full">
                <div className="relative h-full bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg overflow-hidden flex justify-center items-center">
                  {/* Map Placeholder */}

				  <LocationMap/>

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
                            <p className="font-semibold text-sm">
                              {selectedLocation.name}
                            </p>
                            <p className="text-xs opacity-90">
                              {selectedLocation.address}
                            </p>
                          </div>
                        </div>
                        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-primary"></div>
                      </div>
                    </motion.div>
                  )}

                  {/* Map Controls */}
                  <div className="absolute top-4 right-4 flex flex-col space-y-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-background/90 backdrop-blur-sm"
                    >
                      +
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-background/90 backdrop-blur-sm"
                    >
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
                              {selectedLocation
                                ? `Viewing: ${selectedLocation.name}`
                                : "Interactive Map"}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {selectedLocation
                                ? `Located at ${selectedLocation.address}`
                                : `Showing ${
                                    mockBuildings[
                                      activeCategory as keyof typeof mockBuildings
                                    ]?.length || 0
                                  } locations`}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div
                              className={`w-3 h-3 rounded-full ${
                                selectedLocation
                                  ? "bg-primary animate-pulse"
                                  : "bg-primary"
                              }`}
                            ></div>
                            <span className="text-xs text-muted-foreground">
                              {selectedLocation
                                ? "Selected Location"
                                : "Active Locations"}
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
  );
};

export default LocationListings;
