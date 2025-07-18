import { useState } from "react";
import { useFilterUsersQuery } from "../Redux/Slices/getuserSlice";

const Screens = () => {
  const [plan_id, setPlan] = useState("0");
  const [join, setJoin] = useState<string | undefined>(undefined);

  const [page, setPage] = useState(1);

  const queryParams = { plan_id, join, page };
  console.log("Sending to API:", queryParams); 

  const { data, isLoading, error } = useFilterUsersQuery(queryParams);

  const users = data?.data || [];
  const lastPage = data?.last_page || 1;

  // Generate join options (YYYY-MM) from 2023 to current month of 2025
  const joinOptions = (() => {
    const options: { value: string; label: string }[] = [];
    for (let year = 2023; year <= 2025; year++) {
      for (let month = 1; month <= 12; month++) {
        const now = new Date();
        const isFuture =
          year === now.getFullYear() && month > now.getMonth() + 1;
        if (year > now.getFullYear() || isFuture) continue;

        const value = `${year}-${String(month).padStart(2, "0")}`;
        const label = `${new Date(0, month - 1).toLocaleString("default", {
          month: "long",
        })} ${year}`;
        options.push({ value, label });
      }
    }
    return options;
  })();

  return (
    <div className="p-4">
      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-4">
        {/* Plan Filter */}
        <select
          value={plan_id}
          onChange={(e) => {
            setPlan(e.target.value);
            setPage(1);
          }}
          className="border p-2 rounded"
        >
          <option value="0">All Plans</option>
          <option value="1">Plan 1</option>
          <option value="2">Plan 2</option>
        </select>

        {/* Joined Date Filter (Year + Month) */}
        <select
          value={join || ""}
          onChange={(e) => {
            const value = e.target.value;
            setJoin(value === "" ? undefined : value);
            setPage(1);
          }}
          className="border p-2 rounded"
        >
          <option value="">All Dates</option>
          {joinOptions.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error loading data</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">ID</th>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Plan</th>
                <th className="p-2 border">Joined Date</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user: any) => (
                <tr key={user.id}>
                  <td className="p-2 border">{user.id}</td>
                  <td className="p-2 border">{user.name}</td>
                  <td className="p-2 border">{user.plan}</td>
                  <td className="p-2 border">{user.joined_date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <button
          disabled={page <= 1}
          onClick={() => setPage((prev) => prev - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span className="mx-2 text-sm">
          Page {page} of {lastPage}
        </span>

        <button
          disabled={page >= lastPage}
          onClick={() => setPage((prev) => prev + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Screens;
