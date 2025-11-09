import axios from "axios";
import type { AdsFormData } from "../../Interface/Interfaces";
import { getAdsApi } from "../../API/API";

interface PlansResponse {
  ads: AdsFormData[];
}

export const fetchAds = async (): Promise<AdsFormData[]> => {
  const response = await axios.get<PlansResponse>(
    getAdsApi
  );
  return response.data.ads;
};
