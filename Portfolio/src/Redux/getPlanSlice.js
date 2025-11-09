import axios from "axios";
import { getplanApi } from "../API/API";



export const fetchPlans = async () => {
  const response = await axios.get(
   getplanApi
  );
  return response.data.plans;
};
