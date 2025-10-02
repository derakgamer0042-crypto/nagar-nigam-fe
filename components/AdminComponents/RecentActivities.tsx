"use client";

import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  AlertCircle,
  Building,
  CheckCircle,
  Clock,
  Database,
  DollarSign,
  Edit2,
  Eye,
  MapPin,
  Trash2,
  User,
  UserCheck,
  UserPlus,
  Users,
  Search,
  Filter,
  RefreshCw,
  MoreHorizontal,
  Archive,
} from "lucide-react";
import timeAgo from "@/lib/timesAgo";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge as BadgeComponent } from "../ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

enum SelectTypes {
  Survey = "survey",
  Activities = "activities",
}

// Response for Survey/Property
interface Property {
  _id: string;
  houseNumber: string;
  interviewerName: string;
  ward: string;
  locality: string;
  createdAt: string;
  isVerified: boolean;
  surveyor?: {
    name: string;
    email: string;
    isSurveyorActive: boolean;
  };
}

type ToggleResponseMap = {
  [SelectTypes.Activities]: any[];
  [SelectTypes.Survey]: Property[];
};

const RecentActivities = ({ fadeInUp }: any) => {
  const [recentActivities, setRecentActivities] = useState<
    ToggleResponseMap[SelectTypes]
  >([]);
  const [select, setSelect] = useState<SelectTypes>(SelectTypes.Activities);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [expandedActivity, setExpandedActivity] = useState<string | null>(null);

  const getEventIcon = (event: string) => {
    switch (event) {
      case "INSERTED":
        return <UserPlus className="w-5 h-5 text-white" />;
      case "UPDATED":
        return <Edit2 className="w-5 h-5 text-white" />;
      case "DELETED":
        return <Trash2 className="w-5 h-5 text-white" />;
      case "VIEWED":
        return <Eye className="w-5 h-5 text-white" />;
      default:
        return <Database className="w-5 h-5 text-white" />;
    }
  };

  const getEventColor = (event: string) => {
    switch (event) {
      case "INSERTED":
        return "bg-emerald-500";
      case "UPDATED":
        return "bg-blue-500";
      case "DELETED":
        return "bg-red-500";
      case "VIEWED":
        return "bg-purple-500";
      default:
        return "bg-gray-500";
    }
  };

  const getSchemaIcon = (schemaModel: string) => {
    switch (schemaModel) {
      case "User":
        return <Users className="w-4 h-4 text-muted-foreground" />;
      case "Surveyor":
        return <UserCheck className="w-4 h-4 text-muted-foreground" />;
      case "Property":
        return <Building className="w-4 h-4 text-muted-foreground" />;
      case "RATE":
        return <DollarSign className="w-4 h-4 text-muted-foreground" />;
      default:
        return <Database className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const filteredAndSortedActivities = useMemo(() => {
    let filtered = recentActivities;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter((item) => {
        if (select === SelectTypes.Activities) {
          const activity = item;
          return (
            activity.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
            activity.performedByUserData.name
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            activity.schemaModel
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
          );
        } else {
          const property = item as Property;
          return (
            property.ward.toLowerCase().includes(searchTerm.toLowerCase()) ||
            property.locality
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            property.interviewerName
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
          );
        }
      });
    }

    // Event/Status filter
    if (filterBy !== "all") {
      if (select === SelectTypes.Activities) {
        filtered = filtered.filter(
          (activity) => activity.event.toLowerCase() === filterBy.toLowerCase()
        );
      } else {
        filtered = filtered.filter((property) => {
          if (filterBy === "verified") return property.isVerified;
          if (filterBy === "pending") return !property.isVerified;
          return true;
        });
      }
    }

    // Sort
    filtered.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortBy === "newest" ? dateB - dateA : dateA - dateB;
    });

    return filtered;
  }, [recentActivities, searchTerm, filterBy, sortBy, select]);

  const fetchRecentActivities = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = (
        await axios({
          url: `${process.env.NEXT_PUBLIC_BACKEND_URL}${process.env.NEXT_PUBLIC_ADMIN_ROUTES}/get-recent-activities`,
          method: "post",
          data: { selected: select },
        })
      ).data;

      setRecentActivities(res.data);
    } catch (err) {
      console.log("[ERROR] while fetching recent activities : ", err);
      setError("Failed to fetch activities. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("inside the useEffect");
    fetchRecentActivities();
  }, [select]);

  const handleActivityAction = (activityId: string, action: string) => {
    console.log(`Performing ${action} on activity ${activityId}`);
    // Add your action logic here
  };

  const getActivityStats = () => {
    if (select !== SelectTypes.Activities) return null;

    const activities = recentActivities;
    const stats = {
      total: activities.length,
      inserted: activities.filter((a) => a.event === "INSERTED").length,
      updated: activities.filter((a) => a.event === "UPDATED").length,
      deleted: activities.filter((a) => a.event === "DELETED").length,
    };

    return stats;
  };

  const stats = getActivityStats();

  console.log("current select is : ", select);

  return (
    <motion.div {...fadeInUp} id="recent-activities" >
      <Card className="border-0 shadow-lg">
        <CardHeader className="pb-4">
          <div className="flex flex-col md:flex-1  md:flex-row gap-5 w-full items-center justify-between">
            <div className="">
              <CardTitle className="flex items-center text-foreground text-xl">
                <Building className="h-5 w-5 mr-2 text-primary" />
                {select === SelectTypes.Activities
                  ? "Recent Activities"
                  : "Recent Surveys"}
              </CardTitle>
              <CardDescription>
                {select === SelectTypes.Activities
                  ? "Latest system activities and updates"
                  : "Recent property surveys and verifications"}
              </CardDescription>
            </div>

            <div className="flex md:flex-row flex-col items-center gap-4 w-full md:w-fit">
              <div className="flex gap-[10px] bg-muted w-full rounded-lg p-1 justify-around md:justify-center">
                <Button
                  variant={
                    select === SelectTypes.Activities ? "default" : "ghost"
                  }
                  size="sm"
                  onClick={() =>
                    select != SelectTypes.Activities
                      ? [setLoading(true), setSelect(SelectTypes.Activities)]
                      : undefined
                  }
                  className="text-xs cursor-pointer"
                >
                  <Building className="w-3 h-3 mr-1" />
                  Activities
                </Button>
                <Button
                  variant={select === SelectTypes.Survey ? "default" : "ghost"}
                  size="sm"
                  onClick={() =>
                    select != SelectTypes.Survey
                      ? [setLoading(true), setSelect(SelectTypes.Survey)]
                      : undefined
                  }
                  className="text-xs cursor-pointer"
                >
                  <Building className="w-3 h-3 mr-1" />
                  Surveys
                </Button>
              </div>
              <Button
                variant={"secondary"}
                // size="sm"
                onClick={fetchRecentActivities}
                disabled={loading}
                className="cursor-pointer md:w-8 md:h-8 w-6 h-6"
              >
                <RefreshCw
                  className={`md:w-4 md:h-4 w-2 h-2 ${loading ? "animate-spin" : ""}`}
                />
              </Button>
            </div>
          </div>

          {select === SelectTypes.Activities && stats && (
            <div className="grid grid-cols-4 gap-4 mt-4">
              <div className="bg-muted/50 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-foreground">
                  {stats.total}
                </div>
                <div className="text-xs text-muted-foreground">Total</div>
              </div>
              <div className="bg-emerald-50 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-emerald-600">
                  {stats.inserted}
                </div>
                <div className="text-xs text-emerald-600">Created</div>
              </div>
              <div className="bg-blue-50 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {stats.updated}
                </div>
                <div className="text-xs text-blue-600">Updated</div>
              </div>
              <div className="bg-red-50 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-red-600">
                  {stats.deleted}
                </div>
                <div className="text-xs text-red-600">Deleted</div>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder={`Search ${
                  select === SelectTypes.Activities ? "activities" : "surveys"
                }...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-[10px]">
              <Select value={filterBy} onValueChange={setFilterBy}>
                <SelectTrigger className="w-[160px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">
                    All{" "}
                    {select === SelectTypes.Activities ? "Events" : "Status"}
                  </SelectItem>
                  {select === SelectTypes.Activities ? (
                    <>
                      <SelectItem value="inserted">Created</SelectItem>
                      <SelectItem value="updated">Updated</SelectItem>
                      <SelectItem value="deleted">Deleted</SelectItem>
                    </>
                  ) : (
                    <>
                      <SelectItem value="verified">Verified</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>

        <CardContent
        className="p-0"
        >
          {loading && (
            <div className="flex items-center justify-center py-8">
              <RefreshCw className="w-6 h-6 animate-spin text-muted-foreground" />
              <span className="ml-2 text-muted-foreground">Loading...</span>
            </div>
          )}

          {error && (
            <div className="flex items-center justify-center py-8 text-red-500">
              <AlertCircle className="w-5 h-5 mr-2" />
              {error}
            </div>
          )}

          {!loading && !error && (
            <AnimatePresence mode="wait">
              {select === SelectTypes.Survey && (
                <motion.div
                  key="surveys"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-3"
                >
                  {(filteredAndSortedActivities as Property[]).map(
                    (property: Property, index) => (
                      <motion.div
                        key={property._id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-muted/30 to-muted/10 hover:from-muted/50 hover:to-muted/20 transition-all duration-200 border border-muted/20"
                      >
                        <div className="flex items-center space-x-4">
                          <div
                            className={`p-2 rounded-lg ${
                              property.isVerified
                                ? "bg-emerald-100 text-emerald-600"
                                : "bg-amber-100 text-amber-600"
                            }`}
                          >
                            {property.isVerified ? (
                              <CheckCircle className="h-4 w-4" />
                            ) : (
                              <Clock className="h-4 w-4" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-foreground">
                              {property.isVerified
                                ? "Property Verified"
                                : "Property Submitted for Verification"}
                            </p>
                            <div className="flex items-center space-x-2 mt-1">
                              <MapPin className="h-3 w-3 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">
                                {property.ward}, {property.locality}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                • House #{property.houseNumber}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2 mt-1">
                              <User className="h-3 w-3 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">
                                by {property?.surveyor?.name}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <BadgeComponent
                            variant={
                              property.isVerified ? "default" : "secondary"
                            }
                          >
                            {property.isVerified ? "Verified" : "Pending"}
                          </BadgeComponent>
                          <span className="text-sm text-muted-foreground bg-white/50 px-3 py-1 rounded-full">
                            {timeAgo(property.createdAt)}
                          </span>
                        </div>
                      </motion.div>
                    )
                  )}
                </motion.div>
              )}

              {select === SelectTypes.Activities && (
                <motion.div
                  key="activities"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-3 w-full"
                >
                  {(filteredAndSortedActivities as any[]).map(
                    (activity: any, index) => (
                      <motion.div
                        key={activity._id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card className="hover:shadow-md w-full transition-all duration-200 border-l-4 border-l-transparent hover:border-l-primary">
                          <CardContent className="p-4">
                            <div className="flex items-start gap-4">
                              <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${getEventColor(
                                  activity.event
                                )}`}
                              >
                                {getEventIcon(activity.event)}
                              </div>

                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-4">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                      <h3 className="font-medium text-foreground text-sm leading-5">
                                        {activity.message}
                                      </h3>
                                      <BadgeComponent
                                        variant="outline"
                                        className="text-xs"
                                      >
                                        {activity.event}
                                      </BadgeComponent>
                                    </div>

                                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                                      {getSchemaIcon(activity.schemaModel)}
                                      <span className="font-medium">
                                        {activity.schemaModel}
                                      </span>
                                      <span className="mx-1">•</span>
                                      <User className="w-3 h-3" />
                                      <span>
                                        {activity.performedByUserData.name}
                                      </span>
                                      <span className="mx-1">•</span>
                                      <BadgeComponent
                                        variant="secondary"
                                        className="text-xs"
                                      >
                                        {activity.performedByUserData.role}
                                      </BadgeComponent>
                                    </div>

                                    <AnimatePresence>
                                      {expandedActivity === activity._id && (
                                        <motion.div
                                          initial={{ opacity: 0, height: 0 }}
                                          animate={{
                                            opacity: 1,
                                            height: "auto",
                                          }}
                                          exit={{ opacity: 0, height: 0 }}
                                          className="mt-3 p-3 bg-muted/30 rounded-lg"
                                        >
                                          <div className="grid grid-cols-2 gap-2 text-xs">
                                            <div>
                                              <span className="font-medium">
                                                Schema ID:
                                              </span>
                                              <span className="ml-1 font-mono">
                                                {activity.schemaId}
                                              </span>
                                            </div>
                                            <div>
                                              <span className="font-medium">
                                                User Email:
                                              </span>
                                              <span className="ml-1">
                                                {
                                                  activity.performedByUserData
                                                    .email
                                                }
                                              </span>
                                            </div>
                                          </div>
                                        </motion.div>
                                      )}
                                    </AnimatePresence>
                                  </div>

                                  <div className="flex items-center gap-2">
                                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                                      {timeAgo(activity.createdAt)}
                                    </span>

                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          className="h-8 w-8 p-0"
                                        >
                                          <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>
                                          Actions
                                        </DropdownMenuLabel>
                                        <DropdownMenuItem
                                        className="cursor-pointer hover:text-white"
                                          onClick={() =>
                                            setExpandedActivity(
                                              expandedActivity === activity._id
                                                ? null
                                                : activity._id
                                            )
                                          }
                                        >
                                          <Eye className="mr-2 h-4 w-4 hover:text-white" />
                                          {expandedActivity === activity._id
                                            ? "Hide"
                                            : "View"}{" "}
                                          Details
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                        className="cursor-pointer hover:text-white"
                                          onClick={() =>
                                            handleActivityAction(
                                              activity._id,
                                              "archive"
                                            )
                                          }
                                        >
                                          <Archive className="mr-2 h-4 w-4 hover:text-white " />
                                          Archive
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem
                                        className="cursor-pointer hover:text-white"
                                          onClick={() =>
                                            navigator.clipboard.writeText(
                                              activity._id
                                            )
                                          }
                                        >
                                          Copy ID
                                        </DropdownMenuItem>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    )
                  )}
                </motion.div>
              )}

              {filteredAndSortedActivities.length === 0 && !loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                    {select === SelectTypes.Activities ? (
                      <Building className="w-8 h-8 text-muted-foreground" />
                    ) : (
                      <Building className="w-8 h-8 text-muted-foreground" />
                    )}
                  </div>
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    No{" "}
                    {select === SelectTypes.Activities
                      ? "activities"
                      : "surveys"}{" "}
                    found
                  </h3>
                  <p className="text-muted-foreground">
                    {searchTerm || filterBy !== "all"
                      ? "Try adjusting your search or filters"
                      : `No recent ${
                          select === SelectTypes.Activities
                            ? "activities"
                            : "surveys"
                        } to display`}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default RecentActivities;
