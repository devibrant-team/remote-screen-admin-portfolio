import { useState } from "react";
import {
  LayoutDashboard,
  Monitor,
  Users,
  Layers,
  DollarSign,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { logoutUser } from "../Redux/Slices/authSlice";
import type { AppDispatch } from "../../store";

const menuItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { label: "Screens", icon: Monitor, path: "/screens" },
  { label: "Users", icon: Users, path: "/users" },
  { label: "Plans", icon: Layers, path: "/plans" },
  { label: "Income", icon: DollarSign, path: "/income" },
  { label: "Logout", icon: LogOut },
];

const ToolBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname;

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded shadow"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle sidebar"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <nav
        className={`fixed top-0 left-0 z-40 h-screen w-52 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:h-auto`}
      >
        <div className="flex flex-col gap-3 p-4 pt-6 h-full">
          <h1 className="font-bold text-xl pb-5">Admin Dashboard</h1>

          {menuItems.map(({ label, icon: Icon, path }) => {
            const isActive = currentPath.startsWith(path || "") && label !== "Logout";

            return (
              <button
                key={label}
                onClick={() => {
                  if (label === "Logout") {
                    handleLogout();
                  } else if (path) {
                    navigate(path);
                    setIsOpen(false); // close sidebar on mobile
                  }
                }}
                className={`flex items-center gap-3 text-left px-4 py-2 rounded-md font-medium transition-colors ${
                  isActive
                    ? "bg-red-600 text-white"
                    : "bg-gray-100 text-black hover:bg-red-600 hover:text-white"
                }`}
              >
                <Icon size={20} />
                {label}
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default ToolBar;
