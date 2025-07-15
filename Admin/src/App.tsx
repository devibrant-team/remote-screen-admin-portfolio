import { useSelector } from "react-redux";
import ToolBar from "./Layout/ToolBar";
import LoginScreen from "./Screens/LoginScreen";
import PlanScreen from "./Screens/PlanScreen";
import type { RootState } from "../store";

export const App = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  console.log(isLoggedIn);
  return (
    <div className="flex min-h-screen">
      {isLoggedIn && <ToolBar />}
      <main className={`flex-1 ${isLoggedIn ? "md:ml-5" : ""} p-4`}>
        {!isLoggedIn ? <LoginScreen /> : <PlanScreen />}
      </main>
    </div>
  );
};
