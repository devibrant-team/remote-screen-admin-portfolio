import { Users } from "lucide-react"
const DashboardCard = () => {
  return (
       <div className="bg-white rounded-xl shadow-xl p-6 max-w-sm w-full ">
          <h2 className="text-gray-500 text-sm mb-2">Total Users</h2>
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-bold text-3xl text-[var(--black)]">2</h3>
            <Users size={28} className="text-[var(--mainred)]" />
          </div>
          <p className="text-sm text-gray-500">
            <span className="text-[var(--mainred)] font-medium">+12%</span> from
            last month
          </p>
        </div>
  )
}

export default DashboardCard