import axios from "axios";
import { getplanApi } from "../API/API";



export const fetchPlans = async () => {
  const response = await axios.get(
    "http://192.168.10.107/remote-screen-backend/public/api/getplan"
  );
  return response.data.plans;
};
