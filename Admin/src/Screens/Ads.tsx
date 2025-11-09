// src/Screens/Ads.tsx
import AdsModal from "../Components/Models/AdsModal";
import AdsGrid from "../Components/AdsCard";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store";
import { openCreateAdsModal } from "../Redux/Slices/adsUiSlice";

const Ads = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleOpenCreate = () => {
    dispatch(openCreateAdsModal());
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-bold text-2xl text-[var(--black)]">
          Ads Managment
        </h1>
        <button
          onClick={handleOpenCreate}
          className="bg-[var(--mainred)] text-[var(--white)] px-4 py-2 rounded-lg shadow-md hover:brightness-90 transition"
        >
          + Add Ads
        </button>
      </div>

      <AdsGrid />

      {/* 👇 No props, Redux controls open/close */}
      <AdsModal />
    </div>
  );
};

export default Ads;
