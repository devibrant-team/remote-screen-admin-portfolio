import { useQuery } from "@tanstack/react-query";
import DashboardCard from "../Components/DashboardCard";
import type { PlanOverview } from "../Interface/Interfaces";
import { fetchPlanOverview } from "../Redux/Slices/PlanOverViewSlice";
import React from "react";

const DashboardScreen = () => {
  const {
    data: planData,
    isLoading: screenLoading,
    isError: screenIsError,
  } = useQuery<PlanOverview>({
    queryKey: ["planoverview"],
    queryFn: fetchPlanOverview,
    refetchOnMount: "always",
  });

  return (
    <div
      id="dashboard"
      className="relative p-4 sm:p-6 lg:p-10 bg-[var(--white-200)] min-h-screen"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-2">
        <h1 className="font-bold text-2xl text-[var(--black)]">
          Dashboard Overview
        </h1>
      </div>

      <div className="mb-10">
        <DashboardCard />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Plan Usage Table */}
        <div className="bg-white shadow-md rounded-lg p-6 overflow-x-auto">
          <h2 className="text-lg font-semibold text-[var(--black)] mb-4">
            Plan Usage
          </h2>

          {screenLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, idx) => (
                <div key={idx} className="flex justify-between animate-pulse">
                  <div className="h-4 w-1/3 bg-gray-200 rounded"></div>
                  <div className="h-4 w-1/5 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : screenIsError ? (
            <div className="p-4 bg-red-100 text-red-800 rounded text-sm">
              Failed to load plan data. Please try again later.
            </div>
          ) : (
            <table className="min-w-full table-fixed border border-gray-200 text-sm text-[var(--black)]">
              <thead className="bg-gray-100 text-gray-600 font-semibold">
                <tr>
                  <th className="border border-gray-200 px-4 py-2 text-left">
                    Plan Name
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-left">
                    Number of Customers
                  </th>
                </tr>
              </thead>
              <tbody>
                {planData?.plans?.map((plan) => (
                  <tr key={plan.id} className="hover:bg-[var(--white-200)]">
                    <td className="border border-gray-200 px-4 py-2 capitalize">
                      {plan.name}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {plan.user_count}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Server Details */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-lg font-semibold text-[var(--black)] mb-4">
            Server Details
          </h2>
          {screenLoading ? (
            <div className="grid grid-cols-2 gap-y-4 text-sm text-[var(--black)] animate-pulse">
              {["Name", "Storage", "Free Storage"].map((label, idx) => (
                <React.Fragment key={idx}>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </React.Fragment>
              ))}
            </div>
          ) : screenIsError ? (
            <div className="p-4 bg-red-100 text-red-800 rounded text-sm">
              Failed to load server details.
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-y-4 text-sm text-[var(--black)]">
              <div className="font-medium text-gray-600">Name</div>
              <div>Test_Server</div>
              <div className="font-medium text-gray-600">Storage</div>
              <div>320 GB</div>
              <div className="font-medium text-gray-600">Free Storage</div>
              <div>128 GB</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardScreen;
