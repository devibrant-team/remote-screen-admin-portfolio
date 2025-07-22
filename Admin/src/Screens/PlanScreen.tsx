import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import PlanModal from "../Components/Models/PlanModal";
import StorageModal from "../Components/Models/StorageModal";
import PlanCard from "../Components/PlanCard";
import type { CustomPlan } from "../Interface/Interfaces";
import { fetchExtraPlans } from "../Redux/Slices/getExtraPlan";

const PlanScreen = () => {
  const [planOpen, setPlanOpen] = useState(false);
  const [storageOpen, setStorageOpen] = useState(false);
  const [selectedStorageId, setSelectedStorageId] = useState<number | null>(null);

  const openPlanModal = () => setPlanOpen(true);

  const openStorageModal = (id: number) => {
    setSelectedStorageId(id);
    setStorageOpen(true);
  };

  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery<CustomPlan[]>({
    queryKey: ["custom"],
    queryFn: fetchExtraPlans,
  });

  return (
    <div id="plans" className="relative">
      {/* Blur wrapper */}
      <div
        className={`transition-all duration-300 ${
          planOpen || storageOpen ? "blur-sm pointer-events-none" : ""
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="font-bold text-2xl text-[var(--black)]">
            Plans Management
          </h1>
          <button
            onClick={openPlanModal}
            className="bg-[var(--mainred)] text-[var(--white)] px-4 py-2 rounded-lg shadow-md hover:brightness-90 transition"
          >
            + Add Plan
          </button>
        </div>

        {/* Plans Grid */}
        <PlanCard />

        {/* Extra Storage Header */}
        <div className="flex justify-between items-center mt-10 mb-5">
          <h1 className="font-bold text-2xl text-[var(--black)]">
            Extra Storage Pricing
          </h1>
        </div>

        {/* Extra Storage Grid */}
        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-3xl">
            {isLoading &&
              Array.from({ length: 2 }).map((_, idx) => (
                <div
                  key={idx}
                  className="animate-pulse bg-gray-100 p-5 rounded-xl shadow flex flex-col items-center text-center"
                >
                  <div className="h-4 w-1/3 bg-gray-300 rounded mb-2" />
                  <div className="h-6 w-1/2 bg-gray-300 rounded mb-4" />
                  <div className="h-10 w-24 bg-gray-300 rounded" />
                </div>
              ))}

            {isError && (
              <div className="bg-red-100 text-red-800 border border-red-300 p-4 rounded-xl shadow-md w-full col-span-2 text-center">
                <p className="font-semibold">Failed to load extra storage plans:</p>
                <p className="text-sm">{(error as Error).message}</p>
              </div>
            )}

            {data?.map((extraplan) => (
              <div
                key={extraplan.id}
                className="bg-[var(--white)] p-5 rounded-xl shadow border border-[var(--white-200)] flex flex-col items-center text-center"
              >
                <h2 className="text-lg font-semibold text-gray-500 mb-2">
                  {extraplan.quantity} {extraplan.type}
                </h2>
                <p className="text-[var(--black)] font-bold text-2xl mb-4">
                  ${extraplan.price}
                </p>
                <button
                  onClick={() => openStorageModal(extraplan.id)}
                  className="bg-[var(--mainred)] text-[var(--white)] px-5 py-2.5 rounded-lg shadow-md hover:brightness-90 transition-all"
                >
                  Edit
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modals */}
      <PlanModal open={planOpen} onClose={() => setPlanOpen(false)} />

      {selectedStorageId !== null && (
        <StorageModal
          open={storageOpen}
          onClose={() => {
            setStorageOpen(false);
            setSelectedStorageId(null);
          }}
          id={selectedStorageId}
        />
      )}
    </div>
  );
};

export default PlanScreen;
