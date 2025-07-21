import axios from "axios";
import { dashboardoverviewApi } from "../../API/API";
import type { DashboardOverView } from "../../Interface/Interfaces";

export const fetchDashboardOverView = async (): Promise<DashboardOverView> => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Token not found");
  }

  try {
    const response = await axios.get<DashboardOverView>(dashboardoverviewApi, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch dashboard overview");
  }
};


