import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import ToolBar from "./Layout/ToolBar";
import LoginScreen from "./Screens/LoginScreen";
import PlanScreen from "./Screens/PlanScreen";
import DashboardScreen from "./Screens/DashboardScreen";
import type { RootState } from "../store";

export const App = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  return (
    <div className="flex min-h-screen">
      {isLoggedIn && <ToolBar />}

      <main className={`flex-1 ${isLoggedIn ? "md:ml-5" : ""} p-4`}>
        <Routes>
          {!isLoggedIn ? (
            // Public Routes
            <Route path="*" element={<LoginScreen />} />
          ) : (
            // Protected Routes
            <>
              <Route path="/dashboard" element={<DashboardScreen />} />
              <Route path="/plans" element={<PlanScreen />} />
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </>
          )}
        </Routes>
      </main>
    </div>
  );
};
