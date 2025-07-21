import axios from "axios";
import type { Screen } from "../../Interface/Interfaces";
import { getuserscreenApi } from "../../API/API";

export const fetchUserScreens = async (user_id: number): Promise<Screen[]> => {
  const token = localStorage.getItem("token"); 

  const response = await axios.get<{ screens: Screen[] }>(
    `${getuserscreenApi}/${user_id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    }
  );
  return response.data.screens;
};
