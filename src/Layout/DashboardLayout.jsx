import { Link,Outlet } from "react-router-dom";
import Loading from "../components/Loading/Loading";
import useCarts from "../hooks/useCarts";
import { FaBars, FaCalendar, FaHome, FaMoneyBill } from "react-icons/fa";
import { MdEmail,MdReviews, MdShop } from "react-icons/md";
import { FaCartShopping,} from "react-icons/fa6";
import { TbBrandBooking } from "react-icons/tb";

const Dashboard = () => {
    const { carts: cartItems, isLoading } = useCarts();
    console.log(cartItems);
  
    if (isLoading) {
      return <Loading />;
    }




  return (
    <div className="flex">
      {/* dashboard side bar */}
      {/* sidebar */}
      <div className=" w-1/4 max-w-[280px] flex flex-col bg-orange-300 p-4 min-h-screen pt-16">
        <div className="text-center mb-20 px-6">
          <h2 className="uppercase text-black text-2xl lg:text-3xl font-bold">
            bistro boss
          </h2>
          <h4 className="uppercase text-black text-lg   italic tracking-[0.5rem]">
            restaurant
          </h4>
        </div>
        <ul className="flex flex-col space-y-4 mx-auto">
          <li className="hover:bg-black hover:text-white px-8 py-2 rounded-lg">
            <Link to="/carts" className="flex items-center space-x-4 uppercase">
            <FaHome className="text-2xl" />
            <span className="text-base ">user Home</span>
            </Link>
          </li>
          <li className="hover:bg-black hover:text-white px-8 py-2 rounded-lg">
            <Link to="/reservation" className="flex items-center space-x-4 uppercase">
            <FaCalendar className="text-2xl" />
            <span className="text-base ">reservation</span>
            </Link>
          </li>
          <li className="hover:bg-black hover:text-white px-8 py-2 rounded-lg">
            <Link to="/payment-history" className="flex items-center space-x-4 uppercase">
            <FaMoneyBill className="text-2xl" />
            <span className="text-base ">payment history</span>
            </Link>
          </li>
          <li className="hover:bg-black hover:text-white px-8 py-2 rounded-lg">
            <Link to="/dashboard/carts" className="flex items-center space-x-4 uppercase">
            <FaCartShopping className="text-2xl" />
            <span className="text-base ">My carts</span>
            </Link>
          </li>
          <li className="hover:bg-black hover:text-white px-8 py-2 rounded-lg">
            <Link to="/add-review" className="flex items-center space-x-4 uppercase">
            <MdReviews className="text-2xl" />
            <span className="text-base ">Add review</span>
            </Link>
          </li>
          <li className="hover:bg-black hover:text-white px-8 py-2 rounded-lg">
            <Link to="/my booking" className="flex items-center space-x-4 uppercase">
            <TbBrandBooking className="text-2xl" />
            <span className="text-base ">my booking</span>
            </Link>
          </li>
          <li className="px-8 py-2 rounded-lg">
            <div className="divider before:bg-white after:bg-white" ></div>
          </li>


          <li className="hover:bg-black hover:text-white px-8 py-2 rounded-lg">
            <Link to="/carts" className="flex items-center space-x-4 uppercase">
            <FaHome className="text-2xl" />
            <span className="text-base ">Home</span>
            </Link>
          </li>
          <li className="hover:bg-black hover:text-white px-8 py-2 rounded-lg">
            <Link to="/menu" className="flex items-center space-x-4 uppercase">
            <FaBars className="text-2xl" />
            <span className="text-base ">menu</span>
            </Link>
          </li>
          <li className="hover:bg-black hover:text-white px-8 py-2 rounded-lg">
            <Link to="/shop" className="flex items-center space-x-4 uppercase">
            <MdShop className="text-2xl" />
            <span className="text-base ">shop</span>
            </Link>
          </li>
          <li className="hover:bg-black hover:text-white px-8 py-2 rounded-lg">
            <Link to="/contact" className="flex items-center space-x-4 uppercase">
            <MdEmail className="text-2xl" />
            <span className="text-base ">Contact</span>
            </Link>
          </li>
        </ul>
      </div>
      {/* dashboard content */}
      <div className="flex-1 p-8">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
