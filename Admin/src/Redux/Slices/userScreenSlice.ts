import axios from "axios";
import type { Screen } from "../../Interface/Interfaces";

export const fetchUserScreens = async (user_id: number): Promise<Screen[]> => {
  const token = localStorage.getItem("token"); 

  const response = await axios.get<{ screens: Screen[] }>(
    `http://192.168.10.107:8000/api/userscreen/${user_id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    }
  );
  return response.data.screens;
};
