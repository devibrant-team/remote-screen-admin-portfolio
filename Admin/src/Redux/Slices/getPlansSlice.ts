import axios from "axios";
import type { Plan } from "../../Interface/Interfaces";

interface PlansResponse {
  plans: Plan[];
}

export const fetchPlans = async (): Promise<Plan[]> => {
  const response = await axios.get<PlansResponse>(
    "http://192.168.10.107:8000/api/getplan"
  );
  return response.data.plans;
};
