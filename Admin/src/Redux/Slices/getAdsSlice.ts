// src/Redux/Slices/getAdsSlice.ts
import axios from "axios";
import type { AdsFormData } from "../../Interface/Interfaces";
import { getAdsApi } from "../../API/API";

// This is what comes from your API response
interface PlansResponse {
  ads: AdsFormData[];
}

// This is what your UI (AdsGrid/AdsCard) actually needs
export interface Ad extends AdsFormData {
  id: number;
}

// React Query fetcher – now returns Ad[]
export const fetchAds = async (): Promise<Ad[]> => {
  const response = await axios.get<PlansResponse>(getAdsApi);

  // If your backend does NOT send an id, we generate one for React keys:
  return response.data.ads.map((ad, index) => ({
    ...ad,
    id: ad.id, 
  }));
};
