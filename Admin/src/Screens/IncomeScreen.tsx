import { useState } from "react";
import IncomeCard from "../Components/IncomeCard";

const IncomeScreen = () => {
  const [selectedStatType, setSelectedStatType] = useState("month");

  const statOptions = [
    { label: "Day", value: "day" },
    { label: "Week", value: "week" },
    { label: "Month", value: "month" },
  ];

  return (
    <div
      id="dashboard"
      className="relative p-4 sm:p-6 lg:p-10 bg-[var(--white-200)] min-h-screen"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h1 className="font-bold text-3xl text-[var(--black)]">
          Income's Overview
        </h1>

        {/* Stat Range Toggle */}
        <div className="flex space-x-2 bg-[var(--white)] border border-[var(--white-200)] rounded-md p-1 shadow-sm">
          {statOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setSelectedStatType(option.value)}
              className={`px-4 py-1.5 text-sm font-medium rounded-md ${
                selectedStatType === option.value
                  ? "bg-[var(--mainred)] text-white"
                  : "text-gray-600 hover:bg-[var(--white-200)]"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        <IncomeCard />
        <IncomeCard />
        <IncomeCard />
        <IncomeCard />
      </div>

      {/* Income by Plan - Full Width Section */}
      <div className="w-full bg-[var(--white)] shadow-md rounded-xl p-6 sm:p-8 border border-[var(--white-200)]">
        <h2 className="text-xl font-bold text-[var(--black)] mb-6">
          Income by Plan
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-10 text-sm">
          {/* Basic Plan */}
          <div className="flex items-start gap-4">
            <div className="h-3 w-3 mt-1 rounded-full bg-blue-500" />
            <div>
              <div className="text-gray-600 font-medium">Basic Plan</div>
              <div className="text-[var(--black)] text-lg font-semibold">
                $28,470
              </div>
            </div>
          </div>

          {/* Standard Plan */}
          <div className="flex items-start gap-4">
            <div className="h-3 w-3 mt-1 rounded-full bg-green-500" />
            <div>
              <div className="text-gray-600 font-medium">Standard Plan</div>
              <div className="text-[var(--black)] text-lg font-semibold">
                $45,230
              </div>
            </div>
          </div>

          {/* Premium Plan */}
          <div className="flex items-start gap-4">
            <div className="h-3 w-3 mt-1 rounded-full bg-purple-600" />
            <div>
              <div className="text-gray-600 font-medium">Premium Plan</div>
              <div className="text-[var(--black)] text-lg font-semibold">
                $78,910
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncomeScreen;
