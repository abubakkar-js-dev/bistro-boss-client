import { NavLink, Outlet } from "react-router-dom";
import Loading from "../components/Loading/Loading";
import useCarts from "../hooks/useCarts";
import {
  FaAd,
  FaBars,
  FaCalendar,
  FaHome,
  FaList,
  FaMoneyBill,
  FaUser,
  FaUtensils,
} from "react-icons/fa";
import { MdEmail, MdReviews, MdShop } from "react-icons/md";
import { FaCartShopping } from "react-icons/fa6";
import { TbBrandBooking } from "react-icons/tb";
import useAdmin from "../hooks/useAdmin";

const Dashboard = () => {
  const { carts: cartItems, isLoading } = useCarts();
  console.log(cartItems);
  // TODO: get isAdmin value from the database
  const {isAdmin} = useAdmin();
  // console.log(isAdmin,"from dashboard");
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
          {isAdmin ? (
            <>
              <li className="hover:bg-black hover:text-white px-8 py-2 rounded-lg">
                <NavLink
                  className="flex items-center space-x-4 uppercase"
                  to="/dashboard/admin-home"
                >
                  <FaHome />
                  <span className="text-base">Admin Home</span>
                </NavLink>
              </li>
              <li className="hover:bg-black hover:text-white px-8 py-2 rounded-lg">
                <NavLink
                  className="flex items-center space-x-4 uppercase"
                  to="/dashboard/add-items"
                >
                  <FaUtensils />
                  <span className="text-base">Add Items</span>
                </NavLink>
              </li>
              <li className="hover:bg-black hover:text-white px-8 py-2 rounded-lg">
                <NavLink
                  className="flex items-center space-x-4 uppercase"
                  to="/dashboard/manage-items"
                >
                  <FaList />
                  <span className="text-base"> Manage Items</span>
                </NavLink>
              </li>
              <li className="hover:bg-black hover:text-white px-8 py-2 rounded-lg">
                <NavLink
                  className="flex items-center space-x-4 uppercase"
                  to="/dashboard/manage-bookings"
                >
                  <FaAd />
                  <span className="text-base">Manage Bookings</span>
                </NavLink>
              </li>
              <li className="hover:bg-black hover:text-white px-8 py-2 rounded-lg">
                <NavLink
                  className="flex items-center space-x-4 uppercase"
                  to="/dashboard/all-users"
                >
                  <FaUser />
                  <span className="text-base">All Users</span>
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li className="hover:bg-black hover:text-white px-8 py-2 rounded-lg">
                <NavLink
                  to="/dashboard/user-home"
                  className="flex items-center space-x-4 uppercase"
                >
                  <FaHome className="text-2xl" />
                  <span className="text-base ">user Home</span>
                </NavLink>
              </li>
              <li className="hover:bg-black hover:text-white px-8 py-2 rounded-lg">
                <NavLink
                  to="/reservation"
                  className="flex items-center space-x-4 uppercase"
                >
                  <FaCalendar className="text-2xl" />
                  <span className="text-base ">reservation</span>
                </NavLink>
              </li>
              <li className="hover:bg-black hover:text-white px-8 py-2 rounded-lg">
                <NavLink
                  to="/dashboard/payment-history"
                  className="flex items-center space-x-4 uppercase"
                >
                  <FaMoneyBill className="text-2xl" />
                  <span className="text-base ">payment history</span>
                </NavLink>
              </li>
              <li className="hover:bg-black hover:text-white px-8 py-2 rounded-lg">
                <NavLink
                  to="/dashboard/carts"
                  className="flex items-center space-x-4 uppercase"
                >
                  <FaCartShopping className="text-2xl" />
                  <span className="text-base ">My carts ({cartItems.length})</span>
                </NavLink>
              </li>
              <li className="hover:bg-black hover:text-white px-8 py-2 rounded-lg">
                <NavLink
                  to="/add-review"
                  className="flex items-center space-x-4 uppercase"
                >
                  <MdReviews className="text-2xl" />
                  <span className="text-base ">Add review</span>
                </NavLink>
              </li>
              <li className="hover:bg-black hover:text-white px-8 py-2 rounded-lg">
                <NavLink
                  to="/my booking"
                  className="flex items-center space-x-4 uppercase"
                >
                  <TbBrandBooking className="text-2xl" />
                  <span className="text-base ">my booking</span>
                </NavLink>
              </li>
            </>
          )}
          {/* shared/common */}
          <li className="px-8 py-2 rounded-lg">
            <div className="divider before:bg-white after:bg-white"></div>
          </li>

          <li className="hover:bg-black hover:text-white px-8 py-2 rounded-lg">
            <NavLink
              to="/"
              className="flex items-center space-x-4 uppercase"
            >
              <FaHome className="text-2xl" />
              <span className="text-base ">Home</span>
            </NavLink>
          </li>
          <li className="hover:bg-black hover:text-white px-8 py-2 rounded-lg">
            <NavLink
              to="/menu"
              className="flex items-center space-x-4 uppercase"
            >
              <FaBars className="text-2xl" />
              <span className="text-base ">menu</span>
            </NavLink>
          </li>
          <li className="hover:bg-black hover:text-white px-8 py-2 rounded-lg">
            <NavLink
              to="/shop"
              className="flex items-center space-x-4 uppercase"
            >
              <MdShop className="text-2xl" />
              <span className="text-base ">shop</span>
            </NavLink>
          </li>
          <li className="hover:bg-black hover:text-white px-8 py-2 rounded-lg">
            <NavLink
              to="/contact"
              className="flex items-center space-x-4 uppercase"
            >
              <MdEmail className="text-2xl" />
              <span className="text-base ">Contact</span>
            </NavLink>
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
