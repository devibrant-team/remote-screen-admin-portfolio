import { Pencil, Check } from "lucide-react";

const PlanCard = () => {
  return (
    <div className="bg-[var(--white)] p-6 rounded-2xl shadow-xl border border-gray-300 hover:shadow-xl transition">
      {/* Plan Title and Actions */}
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-[var(--black)]">
          Basic Plan
        </h3>
        <div className="flex gap-2">
          <button className="text-blue-600 hover:text-blue-800 transition">
            <Pencil size={18} />
          </button>
        </div>
      </div>

      {/* Price */}
      <div className="mb-4">
        <h2 className="text-lg font-bold text-[var(--mainred)]">
          $9.99 / 5 years
        </h2>
      </div>

      {/* Features */}
      <ul className="text-gray-700 text-sm space-y-2 mb-4">
        {["5 Screens", "10Gb Storage"].map((item, idx) => (
          <li key={idx} className="flex items-center gap-2">
            <Check size={16} className="text-[var(--mainred)]" />
            {item}
          </li>
        ))}
      </ul>

      {/* Active Users */}
      <p className="text-sm text-gray-600 font-medium">
        Active Users: <span className="font-bold text-[var(--black)]">847</span>
      </p>
    </div>
  );
};

export default PlanCard;
