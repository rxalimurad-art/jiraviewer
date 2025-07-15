"use client";
import React, { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import DateRangeFilter from "@/components/DateRangeFilter";
import WorklogChart from "@/components/WorklogChart";
import SummaryCards from "@/components/SummaryCards";
import WorklogTable from "@/components/WorklogTable";

export default function DashboardPage() {
  const {
    credentials,
    isAuthenticated,
    worklogData,
    chartData,
    summary,
    loading,
    fetchWorklogs,
  } = useAuth();
  const router = useRouter();

  // Handle fetching worklogs with scroll to top
  const handleFetchWorklogs = async () => {
    await fetchWorklogs();
    // Scroll to top after data is loaded
    const mainContent = document.getElementById("main-content");
    if (mainContent) {
      mainContent.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Fixed Header */}
      <Header username={credentials.email} />

      {/* Content Area (Sidebar + Main Content) */}
      <div className="flex flex-1 overflow-hidden">
        {/* Fixed Sidebar */}
        <div className="flex-shrink-0">
          <DateRangeFilter onApply={handleFetchWorklogs} loading={loading} />
        </div>

        {/* Scrollable Main Content */}
        <div id="main-content" className="flex-1 overflow-y-auto">
          <div className="p-6">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Worklogs
              </h1>
              <p className="text-gray-600">
                View and manage your worklog entries.
              </p>
            </div>

            <WorklogChart chartData={chartData} />
            <SummaryCards summary={summary} />
            <WorklogTable worklogs={worklogData} />
          </div>
        </div>
      </div>
    </div>
  );
}
