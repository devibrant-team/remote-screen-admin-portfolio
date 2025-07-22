import axios from "axios";
import { ScreensOverviewApi } from "../../API/API";
import type { ScreensOverview } from "../../Interface/Interfaces";

export const fetchScreensoverview = async (): Promise<{ name: string; value: number }[]> => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Token not found");
  }

  try {
    const response = await axios.get<ScreensOverview>(ScreensOverviewApi, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Return only the data array (list of name/value pairs)
    return response.data.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch dashboard overview");
  }
};
