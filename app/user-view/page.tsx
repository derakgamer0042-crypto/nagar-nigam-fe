"use client";

import { useState } from "react";
import {
  Search,
  MapPin,
  FileText,
  Users,
  Building,
  Phone,
  Mail,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Droplets, Edit, CreditCard, Home} from "lucide-react"
import { Label } from "@/components/ui/label"
import axios from "axios";

// Mock data for demonstration
const mockResults = [
  {
    id: 1,
    title: "Property Tax Payment",
    description: "Pay your annual property tax online with ease",
    category: "Tax Services",
    status: "Active",
    location: "Zone A - Central District",
    contact: "+91 98765 43210",
    email: "tax@nagarnigam.gov.in",
    lastUpdated: "2 days ago",
  },
  {
    id: 2,
    title: "Birth Certificate Application",
    description: "Apply for birth certificate registration and download",
    category: "Civil Registration",
    status: "Active",
    location: "Zone B - North District",
    contact: "+91 98765 43211",
    email: "civil@nagarnigam.gov.in",
    lastUpdated: "1 week ago",
  },
  {
    id: 3,
    title: "Water Connection Request",
    description: "New water connection application and bill payment",
    category: "Utilities",
    status: "Processing",
    location: "Zone C - South District",
    contact: "+91 98765 43212",
    email: "water@nagarnigam.gov.in",
    lastUpdated: "3 days ago",
  },
  {
    id: 4,
    title: "Building Permission",
    description: "Apply for construction and renovation permits",
    category: "Development",
    status: "Active",
    location: "Zone A - Central District",
    contact: "+91 98765 43213",
    email: "building@nagarnigam.gov.in",
    lastUpdated: "5 days ago",
  },
];

export default function UserViewPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [results, setResults] = useState(mockResults);
  const [isSearching, setIsSearching] = useState(false);

  const [searchForm, setSearchForm] = useState({
    email: "",
    name: "",
    wardNumber: "",
    address: "",
    aadharNumber: "",
    phoneNumber: "",
    fatherName: "",
    ownerName: "",
  });

  const services = [
    {
      name: "Tax Payment",
      icon: CreditCard,
      description: "Pay your property tax online",
      color: "bg-blue-50 hover:bg-blue-100 border-blue-200",
    },
    {
      name: "Water Connection",
      icon: Droplets,
      description: "Apply for new water connection",
      color: "bg-cyan-50 hover:bg-cyan-100 border-cyan-200",
    },
    {
      name: "Detail Updation",
      icon: Edit,
      description: "Update your property details",
      color: "bg-green-50 hover:bg-green-100 border-green-200",
    },
    {
      name: "Property Registration",
      icon: Home,
      description: "Register new property",
      color: "bg-orange-50 hover:bg-orange-100 border-orange-200",
    },
    {
      name: "Transfer of Ownership",
      icon: Users,
      description: "Transfer property ownership",
      color: "bg-purple-50 hover:bg-purple-100 border-purple-200",
    },
    {
      name: "Support & Help",
      icon: Phone,
      description: "Get assistance with services",
      color: "bg-gray-50 hover:bg-gray-100 border-gray-200",
    },
  ];

  const handleInputChange = (field: string, value: string) => {
    setSearchForm((prev) => ({ ...prev, [field]: value }));
  };

//   const handleSearch = () => {
//     console.log("Searching for tax records with:", searchForm);
//     // Add search logic here
//   };

//   const handleSearch = async () => {
//     setIsSearching(true);
//     // Simulate API call
//     setTimeout(() => {
//       const filtered = mockResults.filter(
//         (item) =>
//           item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           (selectedCategory !== "all" && item.category === selectedCategory)
//       );
//       setResults(filtered);
//       setIsSearching(false);
//     }, 1000);
//   };

const handleUserSearchData = async()=>{
	try{

		const res = (await axios({
			url : `${process.env.NEXT_PUBLIC_BACKEND_URL}${process.env.NEXT_PUBLIC_ADMIN_ROUTES}/user-view`,
			method : "post",
			data : searchForm
		})).data

		console.log("response is : " , res)

	}catch(err : any){
		console.log("[ERROR] in handleUserSearchData function : " , err.message)
	}
}

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 border-green-200";
      case "Processing":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Inactive":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-secondary/30">
      {/* Header */}
      <header className="relative overflow-hidden bg-gradient-to-r from-primary via-secondary to-accent p-8 text-center">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-secondary/90 to-accent/90"></div>
        <div className="relative z-10">
          <div className="float-animation inline-block">
            <Building className="mx-auto mb-4 h-16 w-16 text-primary-foreground" />
          </div>
          <h1 className="mb-2 text-4xl font-bold text-primary-foreground md:text-6xl">
            नगर निगम सेवा केंद्र
          </h1>
          <p className="text-lg text-primary-foreground/90 md:text-xl">
            {"Your Digital Gateway to Municipal Services"}
          </p>
        </div>
        <div className="absolute -bottom-4 -right-4 h-32 w-32 rounded-full bg-white/10 blur-xl"></div>
        <div className="absolute -top-4 -left-4 h-24 w-24 rounded-full bg-white/10 blur-xl"></div>
      </header>

      <div className="text-center space-y-2  mt-10">
        <h1 className="text-3xl font-bold text-foreground">
          Tax Information Portal
        </h1>
        <p className="text-muted-foreground">
          Search your tax records and access municipal services
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search Your Tax Records
          </CardTitle>
          <CardDescription>
            Enter your details to find your tax information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 gap-y-12 mb-6 p-10">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
			   className="text-emerald-500 bg-gray-100 border-emerald-500 focus:border-emerald-700 focus:ring focus:ring-blue-200"
                id="email"
                type="email"
                placeholder="Enter your email"
                value={searchForm.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
			  className="text-emerald-500 bg-gray-100 border-emerald-500 focus:border-emerald-700 focus:ring focus:ring-blue-200"
                id="name"
                placeholder="Enter your full name"
                value={searchForm.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ward">Ward Number</Label>
              <Input
			  className="text-emerald-500 bg-gray-100 border-emerald-500 focus:border-emerald-700 focus:ring focus:ring-blue-200"
                id="ward"
                placeholder="Enter ward number"
                value={searchForm.wardNumber}
                onChange={(e) => handleInputChange("wardNumber", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location/Address</Label>
              <Input
			  className="text-emerald-500 bg-gray-100 border-emerald-500 focus:border-emerald-700 focus:ring focus:ring-blue-200"
                id="location"
                placeholder="Enter your location"
                value={searchForm.address}
                onChange={(e) => handleInputChange("location", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="aadhar">Aadhar Number</Label>
              <Input
			  className="text-emerald-500 bg-gray-100 border-emerald-500 focus:border-emerald-700 focus:ring focus:ring-blue-200"
                id="aadhar"
                placeholder="Enter Aadhar number"
                value={searchForm.aadharNumber}
                onChange={(e) =>
                  handleInputChange("aadharNumber", e.target.value)
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
			  className="text-emerald-500 bg-gray-100 border-emerald-500 focus:border-emerald-700 focus:ring focus:ring-blue-200"
                id="phone"
                placeholder="Enter phone number"
                value={searchForm.phoneNumber}
                onChange={(e) =>
                  handleInputChange("phoneNumber", e.target.value)
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="father">Father's Name</Label>
              <Input
			  className="text-emerald-500 bg-gray-100 border-emerald-500 focus:border-emerald-700 focus:ring focus:ring-blue-200"
                id="father"
                placeholder="Enter father's name"
                value={searchForm.fatherName}
                onChange={(e) =>
                  handleInputChange("fatherName", e.target.value)
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="owner">Owner Name</Label>
              <Input
			  className="text-emerald-500 bg-gray-100 border-emerald-500 focus:border-emerald-700 focus:ring focus:ring-blue-200"
                id="owner"
                placeholder="Enter owner name"
                value={searchForm.ownerName}
                onChange={(e) => handleInputChange("ownerName", e.target.value)}
              />
            </div>
          </div>

		  <div className="w-full flex justify-center items-center">
			 <Button onClick={handleUserSearchData} className="w-full md:w-auto cursor-pointer">
            <Search className="h-4 w-4 mr-2" />
            Search Tax Records
          </Button>
		  </div>
         
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Available Services</CardTitle>
          <CardDescription>Request municipal services online</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={service.name}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${service.color}`}
                >
                  <div className="flex items-start gap-3">
                    <IconComponent className="h-6 w-6 mt-1 text-foreground" />
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {service.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Search Section */}
      {/* <section className="px-4 py-12">
        <div className="mx-auto max-w-4xl">
          <Card className="pulse-glow border-2 border-primary/20 bg-card/80 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-primary">{"Search Municipal Services"}</CardTitle>
              <CardDescription className="text-lg">
                {"Find information about taxes, certificates, utilities, and more"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col gap-4 md:flex-row">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search for services, documents, or information..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 text-lg h-12 border-2 border-primary/20 focus:border-primary"
                    onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                  />
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full md:w-48 h-12 border-2 border-primary/20">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Tax Services">Tax Services</SelectItem>
                    <SelectItem value="Civil Registration">Civil Registration</SelectItem>
                    <SelectItem value="Utilities">Utilities</SelectItem>
                    <SelectItem value="Development">Development</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  onClick={handleSearch}
                  disabled={isSearching}
                  className="h-12 px-8 text-lg font-semibold bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 transform transition-all duration-200 hover:scale-105"
                >
                  {isSearching ? "Searching..." : "Search"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section> */}

      {/* Results Section */}
      <section className="px-4 pb-12 mt-10">
        <div className="mx-auto max-w-6xl">
          {results.length > 0 && (
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-bold text-foreground">
                {"Recommended For You"} ({results.length})
              </h2>
            </div>
          )}

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {results.map((result, index) => (
              <Card
                key={result.id}
                className={`slide-up transform transition-all duration-300 hover:scale-105 hover:shadow-xl border-2 border-primary/10 hover:border-primary/30 bg-card/90 backdrop-blur-sm`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg font-bold text-primary line-clamp-2">{result.title}</CardTitle>
                    <Badge className={`ml-2 ${getStatusColor(result.status)}`}>{result.status}</Badge>
                  </div>
                  <Badge variant="outline" className="w-fit text-xs">
                    {result.category}
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription className="text-sm leading-relaxed">{result.description}</CardDescription>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4 text-secondary" />
                      <span>{result.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="h-4 w-4 text-secondary" />
                      <span>{result.contact}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="h-4 w-4 text-secondary" />
                      <span className="truncate">{result.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-4 w-4 text-secondary" />
                      <span>Updated {result.lastUpdated}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button
                      size="sm"
                      className="flex-1 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      {"View Details"}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 border-primary/20 hover:bg-primary/10 bg-transparent"
                    >
                      <Users className="mr-2 h-4 w-4" />
                      {"Contact"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {results.length === 0 && !isSearching && (
            <div className="text-center py-12">
              <div className="float-animation inline-block mb-4">
                <Search className="h-16 w-16 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">{"No results found"}</h3>
              <p className="text-muted-foreground">{"Try adjusting your search terms or category filter"}</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-primary via-secondary to-accent p-8 text-center text-primary-foreground">
        <div className="mx-auto max-w-4xl">
          <h3 className="mb-4 text-2xl font-bold">{"Need Help?"}</h3>
          <p className="mb-4 text-primary-foreground/90">
            {"Contact our support team for assistance with municipal services"}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              variant="secondary"
              className="bg-white/20 hover:bg-white/30 text-primary-foreground border-white/30"
            >
              {"Call Support"}
            </Button>
            <Button
              variant="secondary"
              className="bg-white/20 hover:bg-white/30 text-primary-foreground border-white/30"
            >
              {"Email Us"}
            </Button>
            <Button
              variant="secondary"
              className="bg-white/20 hover:bg-white/30 text-primary-foreground border-white/30"
            >
              {"Visit Office"}
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
}
