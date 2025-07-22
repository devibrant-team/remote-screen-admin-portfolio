import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import { ArrowUp, ArrowDown } from "lucide-react";

const IncomeCard = () => {
  const { data, loading, error } = useSelector(
    (state: RootState) => state.incomeOverview
  );

  const income = data?.total_income ?? 0;
  const change = data?.percent_change ?? 0;
  const isPositive = change >= 0;

  const skeletonBlock = (
    <div className="h-8 bg-gray-200 rounded w-1/2 animate-pulse" />
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
      {/* Total Income */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <h2 className="text-gray-500 text-sm font-medium mb-2">Total Income</h2>
        <div className="flex items-center justify-between">
          {loading ? (
            skeletonBlock
          ) : (
            <h3 className="font-bold text-4xl text-gray-900">
              ${income.toLocaleString()}
            </h3>
          )}
        </div>
        {error && (
          <p className="text-red-500 text-xs mt-2">
            {typeof error === "string" ? error : "Failed to load income data"}
          </p>
        )}
      </div>

      {/* Percent Change */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <h2 className="text-gray-500 text-sm font-medium mb-2">Growth Rate</h2>
        <div className="flex items-center justify-between">
          {loading ? (
            skeletonBlock
          ) : (
            <div className="flex items-center gap-2">
              {isPositive ? (
                <ArrowUp className="text-green-500" />
              ) : (
                <ArrowDown className="text-red-500" />
              )}
              <h3
                className={`font-bold text-3xl ${
                  isPositive ? "text-green-600" : "text-red-600"
                }`}
              >
                {Math.abs(change)}%
              </h3>
            </div>
          )}
        </div>
        {error && (
          <p className="text-red-500 text-xs mt-2">
            {typeof error === "string" ? error : "Failed to load growth rate"}
          </p>
        )}
      </div>
    </div>
  );
};

export default IncomeCard;
