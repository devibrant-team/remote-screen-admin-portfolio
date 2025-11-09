// src/Redux/Slices/deleteAd.ts
import axios from "axios";
import { DeleteAds } from "../../API/API";

// Delete an ad by id
// Final URL => `${DeleteAds}/${id}`
export const deleteAdApi = async (id: number | string) => {
  const token = localStorage.getItem("token");

  const res = await axios.delete(`${DeleteAds}/${id}`, {
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  return res.data;
};

// If your backend expects POST instead of DELETE, change to:
// const res = await axios.post(`${DeleteAds}/${id}`, null, { headers: { ... } });
