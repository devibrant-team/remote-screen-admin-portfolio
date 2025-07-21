import axios from "axios";
import { ScreensOverviewApi } from "../../API/API";
import type { ScreensOverview } from "../../Interface/Interfaces";
import { data } from "react-router-dom";

export const fetchScreensoverview = async (): Promise<ScreensOverview> => {
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

    console.log(data)
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch dashboard overview");
  }
};


