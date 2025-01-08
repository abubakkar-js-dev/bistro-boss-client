import { FaPen, FaTrashAlt } from "react-icons/fa";
import Loading from "../../../components/Loading/Loading";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useMenu from "../../../hooks/useMenu";

const ManageItems = () => {
  const [menu, loading] = useMenu();
  console.log(menu, "menu from manage items");
  if (loading) {
    return <Loading></Loading>;
  }
  
  const handleDeleteItem = (item) => {
    console.log(item._id,"item from manage items");

  }

  
  return (
    <div>
      <SectionTitle
        heading="Manage All Items"
        subHeading="Hurry up!"
      ></SectionTitle>
      <div className="overflow-x-auto w-full ml-10">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Item Name</th>
              <th>Price</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {menu.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={item.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div></div>
                  </div>
                </td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>
                <button
                //   onClick={() => handleUpdateItem(item)}
                  className="btn !h-5 outline-none border-none bg-orange-300 "
                >
                  <FaPen className="text-white text-xs" />
                </button>
                </td>
                <td>
                  <button
                    onClick={() => handleDeleteItem(item)}
                    className="btn btn-ghost btn-lg"
                  >
                    <FaTrashAlt className="text-red-600"></FaTrashAlt>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageItems;
