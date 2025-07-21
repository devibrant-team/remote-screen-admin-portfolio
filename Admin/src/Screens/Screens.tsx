import { useQuery } from "@tanstack/react-query";
import type { ScreensOverview, ScreenStatusoverview } from "../Interface/Interfaces";
import { fetchScreensoverview } from "../Redux/Slices/screentypeSlice";
import { fetchScreenStatusOverview } from "../Redux/Slices/ScreenStatusSlice";

const Screens = () => {
  const { data, isLoading, isError } = useQuery<ScreensOverview>({
    queryKey: ["dashboard-overview"],
    queryFn: fetchScreensoverview,
  });

  const {
    data: screenData,
    isLoading: screenLoading,
    isError: screenIsError,
  } = useQuery<ScreenStatusoverview>({
    queryKey: ["screensstatus"],
    queryFn: fetchScreenStatusOverview,
  });

  const loading = isLoading || screenLoading;
  const error = isError || screenIsError;

  return (
    <div className="p-4 sm:p-6 md:p-8 min-h-screen bg-[var(--white-200)]">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[var(--black)] mb-6">
        Screens Dashboard
      </h1>

      {loading && (
        <div className="text-center text-gray-500">Loading dashboard data...</div>
      )}

      {error && (
        <div className="text-center text-red-600">Failed to load data.</div>
      )}

      {!loading && !error && (
        <>
          {/* Screen Type Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-10">
            {[
              { label: "Total Screens", value: data?.total },
              { label: "Windows Screens", value: data?.windows },
              { label: "Android Screens", value: data?.android },
              { label: "LED Screens", value: data?.android_stick },
            ].map((item, i) => (
              <div key={i} className="bg-[var(--white)] rounded-2xl shadow p-4 sm:p-5">
                <p className="text-xs sm:text-sm text-gray-500">{item.label}</p>
                <h2 className="text-2xl sm:text-3xl font-bold text-[var(--black)]">
                  {item.value ?? 0}
                </h2>
              </div>
            ))}
          </div>

          {/* Screen Status Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-6">
            <div className="bg-[var(--white)] rounded-2xl shadow p-4 sm:p-5">
              <p className="text-xs sm:text-sm text-gray-500">Active Screens</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-green-600">
                {screenData?.active ?? 0}
              </h2>
            </div>
            <div className="bg-[var(--white)] rounded-2xl shadow p-4 sm:p-5">
              <p className="text-xs sm:text-sm text-gray-500">Inactive Screens</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-[var(--mainred)]">
                {screenData?.not_active ?? 0}
              </h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Screens;
