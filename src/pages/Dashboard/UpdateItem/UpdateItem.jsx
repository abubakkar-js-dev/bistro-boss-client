import { FaUtensils } from "react-icons/fa";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading/Loading";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const img_hosting_key = import.meta.env.VITE_imgbbApiKey;
const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`;

const UpdateItem = () => {
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const { id } = useParams();
  const { data: item = [], isLoading } = useQuery({
    queryKey: ["menu", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/menu/${id}`);
      return res.data;
    },
  });
  const { name, category, price, recipe, image: prevImage } = item;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit = async (data) => {
    const imageFile = data.image[0];
    // upload image to imgbb
    const res = await axiosPublic.post(img_hosting_url,{image:imageFile},{
        headers:{
            'Content-Type':'multipart/form-data'
        }
    })
    if(res.data.success){
        const imageUrl = res.data.data.url;
        const {name,category,price,recipe} = data;
        // if image is not provided then use the old image
        const image = imageUrl || prevImage;
        const updatedItem = {name,category,price,recipe,image}
        const result = await axiosSecure.patch(`/menu/${id}`,updatedItem)
        if(result.data.modifiedCount){
        reset();
            Swal.fire({
                title: "Success!",
                text: "Item updated successfully",
                icon: "success",
                showConfirmButton: false,
                timer: 1500
            });
        }   
    }


  };
  if (isLoading) return <Loading />;
  return (
    <div>
      <SectionTitle
        heading="Update Item"
        subHeading="Are you sure you want to update this item?"
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-3xl mx-auto space-y-6"
      >
        {/* name of the item */}
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text font-bold text-lg">Recipe Name*</span>
          </div>
          <input
            type="text"
            defaultValue={name}
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
              defaultValue={category}
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
              defaultValue={price}
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
            <span className="label-text font-bold text-lg">
              Recipe Details*
            </span>
          </div>
          <textarea
            defaultValue={recipe}
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
            // defaultValue={image}
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
          <span className="text-base">Update Item</span>
          <FaUtensils />
        </button>
      </form>
    </div>
  );
};

export default UpdateItem;
