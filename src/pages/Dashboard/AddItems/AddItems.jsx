import { useForm } from "react-hook-form";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { FaUtensils } from "react-icons/fa";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";


const img_hosting_key = import.meta.env.VITE_imgbbApiKey;
const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`;

const AddItems = () => {
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async(data) => {
    const {name, category, price, description, image} = data;
    console.log(name, category, price, description, image);
    // upload image to imgbb
    const ImgFile = {image: image[0]};
    console.log(ImgFile);
    axiosPublic.post(img_hosting_url, ImgFile,{
        headers: {
            "Content-type": "multipart/form-data"
        },
    })
    .then(async(res)=>{
        const imgURL = res.data.data.display_url;
        console.log(imgURL);
        console.log(res.data);
        if(res.data.success){
            // now send data to the server
            const newItem = {
                name,
                category,
                price: parseFloat(price),
                recipe: description,
                image: imgURL
            }
            const menuRes = await axiosSecure.post("/menu",newItem);
            console.log(menuRes.data);
            if(menuRes.data.insertedId){
                Swal.fire({
                    title: "Success!",
                    text: "Item added successfully",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1500
                });
                reset();
            }


        }
    })
    // reset();
  };

  return (
    <div className="w-full min-h-screen p-4 md:p-8">
      <SectionTitle heading="What's New?" subHeading="Add An Items" />
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-3xl mx-auto space-y-6">
        {/* name of the item */}
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text font-bold text-lg">Recipe Name*</span>
          </div>
          <input
            type="text"
            {...register("name", {
              required: true,
              message: "Recipe Name is required",
            })}
            placeholder="Recipe Name"
            className="input input-bordered w-full focus:outline-none focus:border-blue-500"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </label>

        {/* category and price */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-bold text-lg">Category*</span>
            </label>
            <select
              {...register("category", {
                required: true,
                message: "Category is required",
              })}
              className="select select-bordered w-full focus:outline-none focus:border-blue-500"
            >
              <option value="salad">Salad</option>
              <option value="dessert">Dessert</option>
              <option value="drink">Drink</option>
            </select>
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-bold text-lg">Price*</span>
            </label>
            <input
              type="number"
              {...register("price", {
                required: true,
                message: "Price is required",
              })}
              placeholder="Price"
              className="input input-bordered w-full focus:outline-none focus:border-blue-500"
            />
            {errors.price && (
              <p className="text-red-500">{errors.price.message}</p>
            )}
          </div>
        </div>

        {/* description */}
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text font-bold text-lg">Recipe Details*</span>
          </div>
          <textarea
            {...register("description", {
              required: true,
              message: "Recipe Details is required",
            })}
            placeholder="Recipe Details"
            className="textarea textarea-bordered w-full min-h-[150px] focus:outline-none focus:border-blue-500"
          ></textarea>
          {errors.description && (
            <p className="text-red-500">{errors.description.message}</p>
          )}
        </label>

        {/* image */}
        <label className="form-control max-w-64">
          <div className="label">
            <span className="label-text font-bold text-lg">Recipe Image*</span>
          </div>
          <input
            type="file"
            {...register("image", { isRequired: true })}
            className="file-input  file-input-bordered max-w-xs focus:outline-none focus:border-blue-500"
          />
          {errors.image && (
            <p className="text-red-500">{errors.image.message}</p>
          )}
        </label>

        {/* button */}

       
        <button 
          type="submit" 
          className="btn bg-gradient-to-r from-orange-400 to-gray-400 border-none px-8 mt-6 text-white hover:bg-orange-300 transition-colors flex items-center space-x-2"
        >
          <span className="text-base">Add Item</span>
          <FaUtensils />
        </button>
      </form>
    </div>
  );
};

export default AddItems;
