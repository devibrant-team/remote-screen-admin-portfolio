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
import type { AppDispatch } from "../../store";
import { logoutUser } from "../Redux/Slices/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const menuItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { label: "Screens", icon: Monitor },
  { label: "Users", icon: Users },
  { label: "Plans", icon: Layers , path: "/plans" },
  { label: "Income", icon: DollarSign },
  { label: "Logout", icon: LogOut },
];

const ToolBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logoutUser()).then(() => navigate("/login"));
    console.log("DONE");
  };

  return (
    <nav
      className={`bg-white shadow-lg fixed top-0 left-0 h-screen w-52 z-40 md:static md:block ${
        isOpen ? "block" : "hidden"
      } md:h-auto`}
      aria-label="Sidebar navigation"
    >
      <div className="md:hidden flex justify-start p-4 pt-6">
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          className="bg-white p-2 rounded shadow"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div className="flex flex-col gap-3 p-4 pt-0 mt-5 shadow-2xl border-gray-2000 h-full">
        <h1 className="font-bold text-xl pb-5">Admin Dashboard</h1>
        {menuItems.map(({ label, icon: Icon, path }) => (
          <button
            key={label}
            onClick={() => {
              if (label === "Logout") {
                handleLogout();
              } else {
                setSelected(label);
                if (path) navigate(path);
              }
            }}
            className={`flex items-center gap-3 text-left px-4 py-2 rounded-md font-medium transition-colors ${
              selected === label
                ? "bg-red-600 text-white"
                : "bg-gray-100 text-black hover:bg-red-600 hover:text-white"
            }`}
          >
            <Icon size={20} />
            {label}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default ToolBar;
