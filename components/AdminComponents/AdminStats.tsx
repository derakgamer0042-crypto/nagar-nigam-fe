import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Building, Building2, Globe, Home, Shield, Target, TrendingUp, TrendingDown ,  Users, Zap , FileText , CheckCircle , AlertCircle } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import axios from "axios";

interface AdminStatsType {
  totalProperties: any;
  totalResidentialProperty: any;
  totalCommercialProperty: any;
  totalMixedProperty: any;
  surveyStats : any,
  verificationStats: any,
  taxStats : any,
}

const AdminStats = ({ fadeInUp, staggerContainer ,  setAdminStatsParent}: any) => {
  const [adminStats, setAdminStats] = useState<AdminStatsType>();
  const [statsLoading, setStatsLoading] = useState<boolean>(true);

  const fetchAdminStats = async () => {
    try {
      setStatsLoading(true);
      const res = (
        await axios({
          url: `${process.env.NEXT_PUBLIC_BACKEND_URL}${process.env.NEXT_PUBLIC_ADMIN_ROUTES}/stats`,
          method: "post",
          data: {},
        })
      ).data;

      setAdminStats(res?.data);
      setAdminStatsParent(res?.data);
    } catch (err: any) {
      console.log("[ERROR] in fetching admin stats : ", err.message);
    } finally {
      setStatsLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminStats();
  }, []);

  return (
    <div id="property-classification" className="scroll-margin">
      {!statsLoading && (
        <>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {[
              {
                title: "Total Properties",
                // value: "13,704",
                value: adminStats?.totalProperties,
                icon: Building2,
                change: "+2.5%",
                gradient: "from-primary to-primary/80",
                bgGradient: "from-primary/5 via-primary/10 to-primary/5",
                borderGradient: "from-primary/20 to-primary/10",
              },
              {
                title: "Residential",
                // value: "11,295",
                value: adminStats?.totalResidentialProperty,
                icon: Home,
                change: "+1.8%",
                gradient: "from-chart-1 to-chart-1/80",
                bgGradient: "from-chart-1/5 via-chart-1/10 to-chart-1/5",
                borderGradient: "from-chart-1/20 to-chart-1/10",
              },
              {
                title: "Non-Residential",
                // value: "514",
                value: adminStats?.totalCommercialProperty,
                icon: Building,
                change: "-5.2%",
                gradient: "from-secondary to-secondary/80",
                bgGradient: "from-secondary/5 via-secondary/10 to-secondary/5",
                borderGradient: "from-secondary/20 to-secondary/10",
              },
              {
                title: "Mixed Properties",
                // value: "1,895",
                value: adminStats?.totalMixedProperty,
                icon: Users,
                change: "+3.1%",
                gradient: "from-chart-3 to-chart-3/80",
                bgGradient: "from-chart-3/5 via-chart-3/10 to-chart-3/5",
                borderGradient: "from-chart-3/20 to-chart-3/10",
              },
            ].map((stat, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card
                  className={`border-0 shadow-xl hover:shadow-2xl transition-all duration-500 bg-gradient-to-br ${stat.bgGradient} hover:scale-105 relative overflow-hidden`}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${stat.borderGradient} opacity-50`}
                  />
                  <CardContent className="p-8 relative">
                    <div className="flex items-center justify-between">
                      <div className="space-y-3">
                        <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                          {stat.title}
                        </p>
                        <p className="text-4xl font-bold text-foreground">
                          {stat.value}
                        </p>
                        <div className="flex items-center space-x-2">
                          {stat.change.startsWith("+") ?  <TrendingUp className="h-4 w-4 text-emerald-600" /> : <TrendingDown className="h-4 w-4 text-red-600" />}
                          <span className={`text-sm font-semibold ${stat.change.startsWith("+") ? "text-emerald-600" : "text-red-600" }`}>
                            {stat.change}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            vs last month
                          </span>
                        </div>
                      </div>
                      <div
                        className={`p-4 rounded-2xl bg-gradient-to-br ${stat.gradient} shadow-xl`}
                      >
                        <stat.icon className="h-8 w-8 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-[25px]"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {[
              {
                title: "Total Tax",
                // value: "13,704",
                value: adminStats?.taxStats.totalTax,
                icon: FileText,
                change: "+5.5%",
                gradient: "from-accent to-accent/80",
                bgGradient: "from-primary/5 via-primary/10 to-primary/5",
                borderGradient: "from-primary/20 to-primary/10",
              },
              {
                title: "Total Tax Paid",
                // value: "11,295",
                value: adminStats?.taxStats.totalTaxPaid,
                icon: CheckCircle,
                change: "-4.2%",
                gradient: "from-primary to-chart-1/80",
                bgGradient: "from-chart-1/5 via-chart-1/10 to-chart-1/5",
                borderGradient: "from-chart-1/20 to-chart-1/10",
              },
              {
                title: "Total Tax Left",
                // value: "514",
                value: adminStats?.taxStats?.totalTaxLeft,
                icon: AlertCircle,
                change: "+3.8%",
                gradient: "from-chart-3 to-chart-3/80",
                bgGradient: "from-secondary/5 via-secondary/10 to-secondary/5",
                borderGradient: "from-secondary/20 to-secondary/10",
              },
              
            ].map((stat, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card
                  className={`border-0 shadow-xl hover:shadow-2xl transition-all duration-500 bg-gradient-to-br ${stat.bgGradient} hover:scale-105 relative overflow-hidden`}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${stat.borderGradient} opacity-50`}
                  />
                  <CardContent className="p-8 relative">
                    <div className="flex items-center justify-between">
                      <div className="space-y-3">
                        <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                          {stat.title}
                        </p>
                        <p className="text-4xl font-bold text-foreground">
                          {stat.value}
                        </p>
                        <div className="flex items-center space-x-2">
                          {stat.change.startsWith("+") ?  <TrendingUp className="h-4 w-4 text-emerald-600" /> : <TrendingDown className="h-4 w-4 text-red-600" />}
                          <span className={`text-sm font-semibold ${stat.change.startsWith("+") ? "text-emerald-600" : "text-red-600" }`}>
                            {stat.change}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            vs last month
                          </span>
                        </div>

                      </div>
                      <div
                        className={`p-4 rounded-2xl bg-gradient-to-br ${stat.gradient} shadow-xl`}
                      >
                        <stat.icon className="h-8 w-8 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div {...fadeInUp}>
            <div className="grid lg:grid-cols-4 gap-6 mt-[25px]">
              {[
                {
                  title: "Total Survery Done",
                //   value: "95%",
                  value: adminStats?.surveyStats?.total,
                  icon: Target,
                  color: "text-emerald-600",
                  bg: "bg-emerald-50",
                },
                {
                  title: "Total Successfull Survey",
                //   value: "98%",
                  value: adminStats?.surveyStats?.verified,
                  icon: Shield,
                  color: "text-blue-600",
                  bg: "bg-blue-50",
                },
                {
                  title: "Verification Window",
                //   value: "2.3h",
                  value: adminStats?.verificationStats?.formattedVerification,
                  icon: Zap,
                  color: "text-amber-600",
                  bg: "bg-amber-50",
                },
                {
                  title: "Success Rate RN",
                //   value: "87%",
                  value: `${adminStats?.surveyStats?.verifiedPercent}%`,
                  icon: Globe,
                  color: "text-purple-600",
                  bg: "bg-purple-50",
                },
              ].map((kpi, index) => (
                <Card
                  key={index}
                  className="border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          {kpi.title}
                        </p>
                        <p className="text-2xl font-bold text-foreground mt-1">
                          {kpi.value}
                        </p>
                      </div>
                      <div className={`p-3 rounded-xl ${kpi.bg}`}>
                        <kpi.icon className={`h-6 w-6 ${kpi.color}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
};

export default AdminStats;
