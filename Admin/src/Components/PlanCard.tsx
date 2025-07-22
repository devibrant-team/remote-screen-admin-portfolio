import { Pencil, Check } from "lucide-react";
import { fetchPlans } from "../Redux/Slices/getPlansSlice";
import type { Plan } from "../Interface/Interfaces";
import { useQuery } from "@tanstack/react-query";

const PlanCard = () => {
  const { data, isLoading, isError, error } = useQuery<Plan[]>({
    queryKey: ["plans"],
    queryFn: fetchPlans,
  });

  if (isLoading) {
    // Skeleton placeholders
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, idx) => (
          <div
            key={idx}
            className="animate-pulse bg-gray-100 p-6 rounded-2xl shadow border border-gray-300"
          >
            <div className="h-5 w-1/2 bg-gray-300 rounded mb-4"></div>
            <div className="h-4 w-1/3 bg-gray-300 rounded mb-2"></div>
            <div className="h-4 w-1/4 bg-gray-300 rounded mb-4"></div>
            <div className="space-y-2">
              <div className="h-3 w-2/3 bg-gray-300 rounded"></div>
              <div className="h-3 w-1/2 bg-gray-300 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-red-100 text-red-800 border border-red-300 p-4 rounded-xl shadow-md max-w-md mx-auto mt-4">
        <p className="font-semibold">Failed to load plans:</p>
        <p>{(error as Error).message}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {data?.map((plan) => (
        <div
          key={plan.id}
          className="bg-[var(--white)] p-6 rounded-2xl shadow-xl border border-gray-300 hover:shadow-xl transition"
        >
          {/* Plan Title and Actions */}
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-semibold text-[var(--black)] capitalize">
              {plan.name}
            </h3>
            {/* <button className="text-blue-600 hover:text-blue-800 transition">
              <Pencil size={18} />
            </button> */}
          </div>

          {/* Price and Duration */}
          <div className="mb-4">
            <h2 className="text-lg font-bold text-[var(--mainred)]">
              ${plan.price} / {plan.plan_time} Year
            </h2>
            {Number(plan.offer) > 0 && (
              <p className="text-sm text-green-600">Offer: -${plan.offer}</p>
            )}
          </div>

          {/* Features */}
          <ul className="text-gray-700 text-sm space-y-2 mb-4">
            <li className="flex items-center gap-2">
              <Check size={16} className="text-[var(--mainred)]" />
              {plan.screen_number} Screens
            </li>
            <li className="flex items-center gap-2">
              <Check size={16} className="text-[var(--mainred)]" />
              {plan.storage} GB Storage
            </li>
          </ul>
        </div>
      ))}
    </div>
  );
};

export default PlanCard;
