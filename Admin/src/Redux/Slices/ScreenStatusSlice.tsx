import axios from "axios";
import { ScreenStatusOverviewApi } from "../../API/API";
import type { ScreenStatusoverview } from "../../Interface/Interfaces";

export const fetchScreenStatusOverview =
  async (): Promise<ScreenStatusoverview> => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token not found");
    }

    try {
      const response = await axios.get<ScreenStatusoverview>(
        ScreenStatusOverviewApi,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch dashboard overview"
      );
    }
  };
