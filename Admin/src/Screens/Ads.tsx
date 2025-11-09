import { useState } from "react";
import PlanModal from "../Components/Models/PlanModal";
import AdsModal from "../Components/Models/AdsModal";
import AdsGrid from "../Components/AdsCard";


const Ads = () => {
      const [planOpen, setPlanOpen] = useState(false);
      const openPlanModal = () => setPlanOpen(true);
  return (
    <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="font-bold text-2xl text-[var(--black)]">
            Ads Managment
          </h1>
          <button
            onClick={openPlanModal}
            className="bg-[var(--mainred)] text-[var(--white)] px-4 py-2 rounded-lg shadow-md hover:brightness-90 transition"
          >
            + Add Ads
          </button>
        </div>
      <AdsGrid />




<AdsModal open={planOpen} onClose={() => setPlanOpen(false)} />

    </div>
  )
}

export default Ads