import { useQuery } from "@tanstack/react-query";
import { fetchPlans } from "../../Redux/getPlanSlice";
import { motion } from "framer-motion";

const PlanScreen = () => {
  const {
    data: plans,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["plans"],
    queryFn: fetchPlans,
  });

  if (isLoading) return <div className="text-red-500 text-center mt-10">Loading...</div>;
  if (isError) return <div className="text-red-500 text-center mt-10">Error loading plans.</div>;

  return (
    <div className="min-h-screen py-20 bg-gradient-to-b from-rose-50 to-red-100 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h1
            className="text-5xl font-extrabold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Pick Your <span className="bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">Perfect Plan</span>
          </motion.h1>
          <motion.p
            className="text-xl text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            Affordable and scalable pricing built to grow with you.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {plans.map((plan, index) => {
            const isPopular = plan.is_recommended === 1;

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative group transform transition-all duration-500 ${isPopular ? "scale-105 z-10" : ""}`}
              >
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-white text-red-600 font-bold px-4 py-1 rounded-full shadow-md border text-sm">
                      MOST POPULAR
                    </span>
                  </div>
                )}

                <div className={`rounded-2xl p-8 shadow-xl border-2 transition-all ${
                  isPopular
                    ? "bg-gradient-to-br from-red-600 to-red-500 text-white border-white shadow-red-600/30"
                    : "bg-white text-gray-800 border-transparent hover:border-red-300"
                }`}>
                  <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
                  <p className={`text-4xl font-extrabold mb-4`}>
                    ${parseFloat(plan.price).toFixed(2)}
                    <span className="text-base font-normal ml-1">
                      / {plan.plan_time} year{plan.plan_time > 1 ? "s" : ""}
                    </span>
                  </p>

                  <ul className="space-y-3 text-sm mb-6">
                    <li>👥 Screens: {plan.screen_number}</li>
                    <li>💾 Storage: {plan.storage} GB</li>
                    <li>🔓 Access: {plan.access_num} devices</li>
                  </ul>

                  <button className={`w-full py-3 px-6 rounded-xl font-semibold text-lg transition-all duration-300 ${
                    isPopular
                      ? "bg-white text-red-600 hover:bg-gray-100"
                      : "bg-gradient-to-r from-red-600 to-red-500 text-white hover:shadow-lg"
                  }`}>
                    Get Started
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PlanScreen;
