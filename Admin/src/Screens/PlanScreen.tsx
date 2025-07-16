import PlanModal from "../Components/Models/PlanModal";
import StorageModal from "../Components/Models/StorageModal";
import PlanCard from "../Components/PlanCard";
import { useState } from "react";

const PlanScreen = () => {
const [planOpen, setPlanOpen] = useState(false);
  const [storageOpen, setStorageOpen] = useState(false);

  const openPlanModal = () => {
    setPlanOpen(true);
  };

  const openStorageModal = () => {
    setStorageOpen(true);
  };

  return (
    <div id="plans" className="relative">
      {/* Content wrapper with blur when modal is open */}
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
        <div>
          <PlanCard />
        </div>

        {/* Extra Storage Header */}
        <div className="flex justify-between items-center mt-10 mb-5">
          <h1 className="font-bold text-2xl text-[var(--black)]">
            Extra Storage Pricing
          </h1>
          <button
            onClick={openStorageModal}
            className="bg-[var(--mainred)] text-[var(--white)] px-5 py-2.5 rounded-lg shadow-md hover:brightness-90 transition-all"
          >
            + Add
          </button>
        </div>

        {/* Extra Storage Grid */}
        <div className="flex justify-items-start">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-3xl">
            <div className="bg-white p-5 rounded-xl shadow border border-gray-200 flex flex-col items-center text-center">
              <h2 className="text-lg font-semibold text-gray-500 mb-2">
                Storage Option
              </h2>
              <p className="text-[var(--black)] font-bold text-2xl">$12</p>
            </div>

            <div className="bg-white p-5 rounded-xl shadow border border-gray-200 flex flex-col items-center text-center">
              <h2 className="text-lg font-semibold text-gray-500 mb-2">
                Screen Package
              </h2>
              <p className="text-[var(--black)] font-bold text-2xl">$20</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <PlanModal open={planOpen} onClose={() => setPlanOpen(false)} />
      <StorageModal open={storageOpen} onClose={() => setStorageOpen(false)} />
    </div>
  );
};

export default PlanScreen;
