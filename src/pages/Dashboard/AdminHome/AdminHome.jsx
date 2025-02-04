import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaTruck, FaUsers } from "react-icons/fa";
import { FaMoneyBill } from "react-icons/fa6";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import Loading from "../../../components/Loading/Loading";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid } from 'recharts';
import { PieChart, Pie, ResponsiveContainer } from 'recharts';


// color for grap chart

const AdminHome = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: stats = {},isPending:statsLoading } = useQuery({
    queryKey: ["admin-stats"],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      return res.data;
    },
  });

  const {data: chartData=[]}= useQuery({
    queryKey: ['order-stats'],
    queryFn: async()=>{
        const res = await axiosSecure.get('/order-stats');
        return res.data;
    }
  })

  console.log(chartData);

  const {  orders, revenue, users } = stats;

  // for grap chart

  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
    ${x + width / 2}, ${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
    Z`;
  };

  const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];


  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;
  
    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };



  //  for pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  


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
          <div className="stat-value">{revenue.toFixed(2) || 0}</div>
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

    {/* charts */}
    <div className="flex flex-col xl:flex-row">
      {/* bar chart */}
      <div className="xl:w-1/2">
      <BarChart
      width={500}
      height={300}
      data={chartData}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="project" />
      <YAxis />
      <Bar dataKey="revenue" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
        {chartData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % 20]} />
        ))}
      </Bar>
    </BarChart>
      </div>
      {/* pie chart */}
      <div className="xl:w-1/2">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="quantity"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      </div>
    </div>
    </div>
  );
};

export default AdminHome;
