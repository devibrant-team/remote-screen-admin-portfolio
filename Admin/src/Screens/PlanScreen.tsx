import PlanModal from "../Components/PlanModal";
import PlanCard from "../Components/PlanCard";
import { useState } from "react";

const PlanScreen = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"plan" | "storage">("plan");

  const openPlanModal = () => {
    setModalType("plan");
    setModalOpen(true);
  };

  const openStorageModal = () => {
    setModalType("storage");
    setModalOpen(true);
  };

  return (
   <div className="relative">
  {/* Content wrapper with blur when modal is open */}
  <div className={`transition-all duration-300 ${modalOpen ? "blur-sm pointer-events-none" : ""}`}>
    {/* Header */}
    <div className="flex justify-between items-center mb-6">
      <h1 className="font-bold text-2xl text-[var(--black)]">Plans Management</h1>
      <button
        onClick={openPlanModal}
        className="bg-[var(--mainred)] text-[var(--white)] px-4 py-2 rounded-lg shadow-md hover:brightness-90 transition"
      >
        + Add Plan
      </button>
    </div>

    {/* Plans Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <PlanCard />
      <PlanCard />
      <PlanCard />
    </div>

    <div className="flex justify-between items-center mt-8">
      <h1 className="font-bold text-2xl text-[var(--black)]">Extra Storage Pricing</h1>
      <button
        onClick={openStorageModal}
        className="bg-[var(--mainred)] text-[var(--white)] px-4 py-2 rounded-lg shadow-md hover:brightness-90 transition"
      >
        + Add
      </button>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      <PlanCard />
      <PlanCard />
      <PlanCard />
    </div>
  </div>

  {/* Modal */}
  <PlanModal open={modalOpen} onClose={() => setModalOpen(false)} type={modalType} />
</div>

  );
};

export default PlanScreen;
