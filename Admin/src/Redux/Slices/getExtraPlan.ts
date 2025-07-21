import axios from "axios";
import type { CustomPlan } from "../../Interface/Interfaces";
import { extraplanApi } from "../../API/API";
interface CustomPlanRespnose {
  custom: CustomPlan[];
}

export const fetchExtraPlans = async (): Promise<CustomPlan[]> => {
  const response = await axios.get<CustomPlanRespnose>(
    extraplanApi
  );
  return response.data.custom;
};
