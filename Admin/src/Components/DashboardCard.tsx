import { useQuery } from "@tanstack/react-query";
import { Users, Monitor, DollarSign, Database } from "lucide-react";
import type { DashboardOverView } from "../Interface/Interfaces";
import { fetchDashboardOverView } from "../Redux/Slices/getDashboardOverviewSlice";

const DashboardCard = () => {
  const { data, isLoading, isError, error } = useQuery<DashboardOverView>({
    queryKey: ["dashboard-overview"],
    queryFn: fetchDashboardOverView,
    refetchOnMount: "always",
  });

  const skeletonCard = (
    <div className="bg-white rounded-2xl shadow-md p-6 animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
      <div className="flex items-center justify-between">
        <div className="h-6 bg-gray-300 rounded w-1/3"></div>
        <div className="h-7 w-7 bg-gray-200 rounded-full"></div>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx}>{skeletonCard}</div>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 py-10 bg-red-100 rounded-md mx-4">
        Error loading dashboard data: {(error as Error).message}
      </div>
    );
  }

  const cards = [
    {
      title: "Total Users",
      value: data?.Total_users ?? 0,
      icon: <Users size={28} className="text-[var(--mainred)]" />,
    },
    {
      title: "Total Screens",
      value: data?.Total_Screens ?? 0,
      icon: <Monitor size={28} className="text-[var(--mainred)]" />,
    },
    {
      title: "Total Income",
      value: `$${data?.Total_Income ?? 0}`,
      icon: <DollarSign size={28} className="text-[var(--mainred)]" />,
    },
    {
      title: "Reserved Storage",
      value: `${data?.Total_storage ?? 0} GB`,
      icon: <Database size={28} className="text-[var(--mainred)]" />,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6 w-full"
          >
            <h2 className="text-sm text-gray-500 mb-2">{card.title}</h2>
            <div className="flex items-center justify-between">
              <h3 className="text-3xl font-bold text-[var(--black)]">
                {card.value}
              </h3>
              {card.icon}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardCard;
