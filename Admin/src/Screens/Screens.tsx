const Screens = () => {
  return (
    <div className="p-8 min-h-screen bg-[var(--white-200)]">
      <h1 className="text-2xl font-bold text-[var(--black)] mb-6">
        Screens Dashboard
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-[var(--white)] shadow rounded-lg p-4">
          <p className="text-sm text-gray-500">Total Screens</p>
          <h2 className="text-3xl font-bold text-[var(--black)]">42</h2>
        </div>
        <div className="bg-[var(--white)] shadow rounded-lg p-4">
          <p className="text-sm text-gray-500">Windows Screens</p>
          <h2 className="text-3xl font-bold text-[var(--black)]">18</h2>
        </div>
        <div className="bg-[var(--white)] shadow rounded-lg p-4">
          <p className="text-sm text-gray-500">Android Screens</p>
          <h2 className="text-3xl font-bold text-[var(--black)]">14</h2>
        </div>
        <div className="bg-[var(--white)] shadow rounded-lg p-4">
          <p className="text-sm text-gray-500">EXE Screens</p>
          <h2 className="text-3xl font-bold text-[var(--black)]">10</h2>
        </div>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
        <div className="bg-[var(--white)] shadow rounded-lg p-4">
          <p className="text-sm text-gray-500">Active Screens</p>
          <h2 className="text-2xl font-bold text-green-600">36</h2>
        </div>
        <div className="bg-[var(--white)] shadow rounded-lg p-4">
          <p className="text-sm text-gray-500">Inactive Screens</p>
          <h2 className="text-2xl font-bold text-[var(--mainred)]">6</h2>
        </div>
        <div className="bg-[var(--white)] shadow rounded-lg p-4">
          <p className="text-sm text-gray-500">Extra Screens</p>
          <h2 className="text-2xl font-bold text-blue-600">4</h2>
        </div>
        <div className="bg-[var(--white)] shadow rounded-lg p-4">
          <p className="text-sm text-gray-500">Last Sync Time</p>
          <h2 className="text-md font-medium text-[var(--black)]">
            July 18, 2025 - 14:45 PM
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Screens;
