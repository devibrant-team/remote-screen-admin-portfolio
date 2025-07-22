import axios from "axios";
import { GetIncomebyPlanApi } from "../../API/API";
import type { IncomebyPlan } from "../../Interface/Interfaces";

export const fetchIncomebyPlan = async (): Promise<IncomebyPlan[]> => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Token not found");
  }

  try {
    // Tell axios response data is an object with a 'plans' property
    const response = await axios.get<{ plans: IncomebyPlan[] }>(GetIncomebyPlanApi, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Return the inner array
    return response.data.plans;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch dashboard overview");
  }
};


