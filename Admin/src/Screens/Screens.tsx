import { useEffect, useState } from "react";
import { fetchScreensoverview } from "../Redux/Slices/screentypeSlice";
import { fetchScreenStatusOverview } from "../Redux/Slices/ScreenStatusSlice";
import type { ScreenStatusoverview } from "../Interface/Interfaces";

type ScreenItem = { name: string; value: number };

const Screens = () => {
  const [screensData, setScreensData] = useState<ScreenItem[] | null>(null);
  const [screenStatusData, setScreenStatusData] =
    useState<ScreenStatusoverview | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      setError(null);
      try {
        const screens = await fetchScreensoverview();
        const status = await fetchScreenStatusOverview();
        setScreensData(screens);
        setScreenStatusData(status);
      } catch (err: any) {
        setError(err.message || "Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  const skeletonCard = (
    <div className="bg-white rounded-2xl shadow p-4 sm:p-5 animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-1/3 mb-3"></div>
      <div className="h-7 bg-gray-300 rounded w-1/2"></div>
    </div>
  );

  return (
    <div className="p-4 sm:p-6 md:p-8 min-h-screen bg-[var(--white-200)]">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[var(--black)] mb-6">
        Screens Dashboard
      </h1>

      {loading && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-10">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i}>{skeletonCard}</div>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-6">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i}>{skeletonCard}</div>
            ))}
          </div>
        </>
      )}

      {error && (
        <div className="text-center text-red-600 bg-red-100 p-4 rounded-md mt-4">
          {error}
        </div>
      )}

      {!loading && !error && (
        <>
          {/* Screen Type Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-10">
            {screensData?.map(({ name, value }) => (
              <div
                key={name}
                className="
        bg-white 
        rounded-3xl 
        shadow-md 
        p-6 
        sm:p-8 
        flex flex-col justify-center items-start
        hover:shadow-lg 
        transition-shadow 
        duration-300
        cursor-default
      "
              >
                <h4 className="font-semibold text-lg text-gray-600 mb-2 tracking-wide">
                  {name}
                </h4>
                <p className="text-2xl font-extrabold text-gray-900">{value}</p>
              </div>
            ))}
          </div>

          {/* Screen Status Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-6">
            <div className="bg-[var(--white)] rounded-2xl shadow p-4 sm:p-5">
              <p className="text-xs sm:text-sm text-gray-500">Active Screens</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-green-600">
                {screenStatusData?.active}
              </h2>
            </div>
            <div className="bg-[var(--white)] rounded-2xl shadow p-4 sm:p-5">
              <p className="text-xs sm:text-sm text-gray-500">
                Inactive Screens
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-[var(--mainred)]">
                {screenStatusData?.not_active}
              </h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Screens;
