import axios from "axios";
import type { Plan } from "../../Interface/Interfaces";
import { getplanApi } from "../../API/API";

interface PlansResponse {
  plans: Plan[];
}

export const fetchPlans = async (): Promise<Plan[]> => {
  const response = await axios.get<PlansResponse>(
    getplanApi
  );
  return response.data.plans;
};
