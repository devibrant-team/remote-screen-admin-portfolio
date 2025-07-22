import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setStatType } from "../Redux/Slices/statTypeSlice";
import { fetchIncomeOverview } from "../Redux/Slices/incomeSlice";
import type { RootState, AppDispatch } from "../../store";
import IncomeCard from "../Components/IncomeCard";
import { useQuery } from "@tanstack/react-query";
import type { IncomebyPlan } from "../Interface/Interfaces";
import { fetchIncomebyPlan } from "../Redux/Slices/getIncomebyPlan";

const IncomeScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedStatType = useSelector(
    (state: RootState) => state.statType.selected
  );

  const {
    data: incomebyplan,
    isLoading: screenLoading,
    isError: screenIsError,
    error,
  } = useQuery<IncomebyPlan[]>({
    queryKey: ["incomebyplan"],
    queryFn: fetchIncomebyPlan,
  });

  const statOptions = [
    { label: "Day", value: "day" },
    { label: "Month", value: "month" }, // backend not handled yet
    { label: "Year", value: "year" },
  ];

  const getDateParams = (type: string) => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();

    if (type === "day") return { day };
    if (type === "month") return { month };
    if (type === "year") return { year };
    return {};
  };

  useEffect(() => {
    const params = getDateParams(selectedStatType);
    dispatch(fetchIncomeOverview(params));
  }, [selectedStatType, dispatch]);

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
              onClick={() =>
                dispatch(setStatType(option.value as "day" | "month" | "year"))
              }
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
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-5 mb-10 justify-center">
        <IncomeCard />
      </div>

      {/* Income by Plan */}
      <div className="w-full bg-[var(--white)] shadow-md rounded-xl p-6 sm:p-8 border border-[var(--white-200)]">
        <h2 className="text-xl font-bold text-[var(--black)] mb-6">
          Income by Plan
        </h2>

        {/* Loading */}
        {screenLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-10">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex items-start gap-4 animate-pulse">
                <div className="h-3 w-3 mt-1 rounded-full bg-gray-300" />
                <div className="space-y-2 w-full">
                  <div className="h-3 w-2/3 bg-gray-200 rounded" />
                  <div className="h-5 w-1/3 bg-gray-300 rounded" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {screenIsError && (
          <div className="text-red-600 bg-red-100 px-4 py-3 rounded-md text-sm">
            Failed to load income by plan.{" "}
            {typeof error === "string"
              ? error
              : (error as Error)?.message || ""}
          </div>
        )}

        {/* Success */}
        {!screenLoading && !screenIsError && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-10 text-sm">
            {incomebyplan && incomebyplan.length > 0 ? (
              incomebyplan.map((plan) => (
                <div key={plan.id} className="flex items-start gap-4">
                  <div className="h-3 w-3 mt-1 rounded-full bg-blue-500" />
                  <div>
                    <div className="text-gray-600 font-medium">{plan.name}</div>
                    <div className="text-[var(--black)] text-lg font-semibold">
                      ${plan.total_income.toLocaleString()}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 col-span-full">No data found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default IncomeScreen;
