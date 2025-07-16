import DashboardCard from "../Components/DashboardCard";

const DashboardScreen = () => {
  return (
    <div
      id="dashboard"
      className="relative p-4 sm:p-6 lg:p-10 bg-[var(--white-200)] min-h-screen"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-2">
        <h1 className="font-bold text-2xl text-[var(--black)]">
          Dashboard Overview
        </h1>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        <DashboardCard />
        <DashboardCard />
        <DashboardCard />
        <DashboardCard />
      </div>

      {/* Details Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Plan Usage Table */}
        <div className="bg-white shadow-md rounded-lg p-6 overflow-x-auto">
          <h2 className="text-lg font-semibold text-[var(--black)] mb-4">
            Plan Usage
          </h2>
          <table className="min-w-full table-fixed border border-gray-200 text-sm text-[var(--black)]">
            <thead className="bg-gray-100 text-gray-600 font-semibold">
              <tr>
                <th className="border border-gray-200 px-4 py-2 text-left">
                  Plan Name
                </th>
                <th className="border border-gray-200 px-4 py-2 text-left">
                  Number of Customers
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-[var(--white-200)]">
                <td className="border border-gray-200 px-4 py-2">Plan A</td>
                <td className="border border-gray-200 px-4 py-2">202</td>
              </tr>
              <tr className="hover:bg-[var(--white-200)]">
                <td className="border border-gray-200 px-4 py-2">Plan B</td>
                <td className="border border-gray-200 px-4 py-2">721</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Server Details */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-lg font-semibold text-[var(--black)] mb-4">
            Server Details
          </h2>
          <div className="grid grid-cols-2 gap-y-4 text-sm text-[var(--black)]">
            <div className="font-medium text-gray-600"> Name</div>
            <div>Test_Server</div>
            <div className="font-medium text-gray-600"> Storage</div>
            <div>320 GB</div>
            <div className="font-medium text-gray-600"> Free Storage</div>
            <div>128 GB</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardScreen;
