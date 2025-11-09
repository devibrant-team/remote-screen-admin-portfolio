// src/Redux/Slices/updateAd.ts
import axios from "axios";
import { UpdateAd } from "../../API/API";

// Update an ad by id using POST with FormData
// Final URL: `${UpdateAd}/${id}`
export const updateAdApi = async (id: number | string, formData: FormData) => {
  const token = localStorage.getItem("token");

  const res = await axios.post(`${UpdateAd}/${id}`, formData, {
    headers: {
      // Let axios set the boundary for FormData automatically
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  return res.data;
};
