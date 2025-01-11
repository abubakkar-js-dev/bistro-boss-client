import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaTruck, FaUsers } from "react-icons/fa";
import { FaMoneyBill } from "react-icons/fa6";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import Loading from "../../../components/Loading/Loading";

const AdminHome = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: stats = {},isPending:statsLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      return res.data;
    },
  });

  const { menuItems, orders, payments, revenue, users } = stats;


  if(statsLoading){
    return <Loading />
  }
  return (
    <div>
      <h2 className="text-3xl">
        <span>Hi, Welcome </span>
        {user?.displayName ? user.displayName : "Back"}
      </h2>
      {/* stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
        <div className="stat shadow">
          <div className="stat-figure text-secondary">
            <FaMoneyBill className="text-4xl" />
          </div>
          <div className="stat-value">{revenue.toFixed(2)}</div>
          <div className="stat-title">Revenue</div>
        </div>

        <div className="stat shadow">
          <div className="stat-figure text-secondary">
            <FaUsers className="text-4xl" />
          </div>
          <div className="stat-value">{users}</div>
          <div className="stat-title">Users</div>
        </div>

        <div className="stat shadow">
          <div className="stat-figure text-secondary">
          <MdOutlineProductionQuantityLimits className="text-4xl" />
          </div>
          <div className="stat-value">{orders}</div>
          <div className="stat-title">Products</div>
        </div>
        <div className="stat shadow">
          <div className="stat-figure text-secondary">
            <FaTruck className="text-4xl" />
          </div>
          <div className="stat-value">{orders}</div>
          <div className="stat-title">Orders</div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
