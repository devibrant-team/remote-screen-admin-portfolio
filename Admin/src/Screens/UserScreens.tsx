import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useFilterUsersQuery } from "../Redux/Slices/getuserSlice";
import { fetchUserScreens } from "../Redux/Slices/userScreenSlice";
import type { User } from "../Interface/Interfaces";
import BaseModal from "../Components/Models/BaseModal";
import { useSearchUsersQuery } from "../Redux/Slices/userSearchSlice";
import { useDebounce } from "../Redux/Slices/hooks/useDebounce";
import { fetchFilteredPlans } from "../Redux/Slices/getPlansFilter";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../store";
const Screens = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [plan_id, setPlan] = useState("0");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  useEffect(() => {
    dispatch(fetchFilteredPlans());
  }, [dispatch]);
  const {
    data: plans,
    loading,
    error,
  } = useSelector((state: RootState) => state.filteredplans);

  const join = useMemo(() => {
    if (year || month) return `${year}-${month.padStart(2, "0")}`;
    return undefined;
  }, [year, month]);

  const { data, isLoading } = useFilterUsersQuery({ plan_id, join, page });

  const users = data?.users ?? [];
  const lastPage = data?.last_page ?? 1;

  const {
    data: searchResult,
    isLoading: isSearchLoading,
    error: searchError,
  } = useSearchUsersQuery(
    { query: debouncedSearch.trim() },
    { skip: !debouncedSearch.trim() }
  );

  const {
    data: screens = [],
    isLoading: screensLoading,
    isError: screensError,
  } = useQuery({
    queryKey: ["screens", selectedUser?.id],
    queryFn: () => fetchUserScreens(selectedUser!.id),
    enabled: !!selectedUser,
  });

  const handleCheckScreens = (user: User) => {
    setSelectedUser(user);
    setModalOpen(true);
  };
  const UserSkeletonRow = () => (
    <tr className="animate-pulse">
      <td className="p-2 border">
        <div className="h-4 bg-gray-300 rounded w-8 mx-auto" />
      </td>
      <td className="p-2 border">
        <div className="h-4 bg-gray-300 rounded w-24 mx-auto" />
      </td>
      <td className="p-2 border">
        <div className="h-4 bg-gray-300 rounded w-20 mx-auto" />
      </td>
      <td className="p-2 border">
        <div className="h-4 bg-gray-300 rounded w-20 mx-auto" />
      </td>
      <td className="p-2 border">
        <div className="h-8 bg-gray-300 rounded w-16 mx-auto" />
      </td>
    </tr>
  );

  return (
    <div className="p-4">
      {/* Search + Filters */}
      <div className="flex flex-wrap justify-between items-center gap-4 my-10">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search users by name or email"
          className="border p-2 rounded flex-1 min-w-[200px]"
        />

        <div className="flex gap-4">
          <select
            value={plan_id}
            onChange={(e) => setPlan(e.target.value)}
            className="border p-2 rounded-md shadow-sm text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[var(--mainred)]"
          >
            <option value="0">All Plans</option>
            {plans?.map((plan) => (
              <option key={plan.id} value={plan.id}>
                {plan.name}
              </option>
            ))}
          </select>

          <select
            value={year}
            onChange={(e) => {
              setYear(e.target.value);
              setMonth("");
            }}
            className="border p-2 rounded-md shadow-sm text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[var(--mainred)]"
          >
            <option value="">Year</option>
            {[2023, 2024, 2025].map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>

          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="border p-2 rounded-md shadow-sm text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[var(--mainred)]"
            disabled={!year}
          >
            <option value="">Month</option>
            {Array.from({ length: 12 }, (_, i) => ({
              label: new Date(0, i).toLocaleString("default", {
                month: "long",
              }),
              value: String(i + 1).padStart(2, "0"),
            })).map(({ label, value }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* User Table */}
      {debouncedSearch.trim() ? (
        isSearchLoading ? (
          <p>Searching...</p>
        ) : searchError ? (
          <p className="text-[var(--mainred)]">Error while searching users.</p>
        ) : searchResult?.user?.length ? (
          <table className="w-full border">
            <thead className="bg-[var(--white-200)]">
              <tr>
                <th className="p-2 border">ID</th>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Plan</th>
              </tr>
            </thead>
            <tbody>
              {searchResult.user.map((u: any, i: number) => (
                <tr key={u.id} className={i % 2 ? "bg-[var(--white-200)]" : ""}>
                  <td className="p-2 border">{u.id}</td>
                  <td className="p-2 border">{u.name}</td>
                  <td className="p-2 border">{u.email}</td>
                  <td className="p-2 border">{u.plan}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500">No users found for this search.</p>
        )
      ) : isLoading ? (
        <table className="w-full border">
          <thead className="bg-[var(--white-200)]">
            <tr>
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Plan</th>
              <th className="p-2 border">Joined</th>
              <th className="p-2 border">Screens</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, idx) => (
              <UserSkeletonRow key={idx} />
            ))}
          </tbody>
        </table>
      ) : (
        <table className="w-full border">
          <thead className="bg-[var(--white-200)]">
            <tr>
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Plan</th>
              <th className="p-2 border">Joined</th>
              <th className="p-2 border">Screens</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="p-2 border">{user.id}</td>
                <td className="p-2 border">{user.name}</td>
                <td className="p-2 border">{user.plan_name}</td>
                <td className="p-2 border">{user.joined}</td>
                <td className="p-2 border">
                  <button
                    onClick={() => handleCheckScreens(user)}
                    className="w-full h-full bg-[var(--mainred)] text-[var(--white)] px-3 py-1 rounded hover:bg-[var(--mainred)] cursor-pointer"
                  >
                    Check
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Pagination (only when not searching) */}
      {!debouncedSearch.trim() && (
        <div className="flex items-center justify-between mt-4">
          <button
            onClick={() => setPage((p) => p - 1)}
            disabled={page <= 1}
            className="px-3 py-1 border rounded"
          >
            Prev
          </button>
          <span>
            Page {page} of {lastPage}
          </span>
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={page >= lastPage}
            className="px-3 py-1 border rounded"
          >
            Next
          </button>
        </div>
      )}

      {/* Modal */}
      <BaseModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="User Screens"
      >
        {screensLoading ? (
          <p>Loading screens...</p>
        ) : screensError ? (
          <p className="text-red-500">Failed to load screens.</p>
        ) : screens.length > 0 ? (
          <table className="w-full border text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">ID</th>
                <th className="p-2 border">Type</th>
                <th className="p-2 border">Ratio</th>
                <th className="p-2 border">Is Extra</th>
              </tr>
            </thead>
            <tbody>
              {screens.map((screen, idx) => (
                <tr
                  key={screen.id}
                  className={`${
                    idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-blue-50 transition duration-150`}
                >
                  <td className="p-3 border text-center font-medium text-sm text-gray-700">
                    {screen.id}
                  </td>
                  <td className="p-3 border text-center text-sm text-gray-600">
                    {screen.type}
                  </td>
                  <td className="p-3 border text-center text-sm text-gray-600">
                    {screen.ratio}
                  </td>
                  <td className="p-3 border text-center text-sm">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${
                        screen.isExtra
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-200 text-red-600"
                      }`}
                    >
                      {screen.isExtra ? "Yes" : "No"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No screens assigned to this user.</p>
        )}
      </BaseModal>
    </div>
  );
};

export default Screens;
