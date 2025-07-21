import axios from "axios";
import { PlanOverviewApi } from "../../API/API";
import type { PlanOverview } from "../../Interface/Interfaces";

export const fetchPlanOverview =
  async (): Promise<PlanOverview> => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token not found");
    }

    try {
      const response = await axios.get<PlanOverview>(
        PlanOverviewApi,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch PlanOverview "
      );
    }
  };
