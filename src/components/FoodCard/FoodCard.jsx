import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCarts from "../../hooks/useCarts";

const FoodCard = ({item}) => {
    const {name,image,price,recipe} = item;
    const {user} = useAuth();
    const axiosInstant = useAxiosSecure();
    const {refetch} = useCarts();
    console.log(axiosInstant)
    console.log(item);

    const handleAddCart = ()=>{
        if(user && user.email){
          console.log("Add to cart added");
          const {_id,image,price,recipe,} = item;
          const newCart = {
            menu_id:_id,
            image,
            price,
            recipe,
            customer_email:user.email,
            customer_name:user.displayName,
          }
          
          axiosInstant.post("/carts",newCart)
          .then(res=>{
            console.log(res,"from add to cart");
            if(res.data.insertedId){
              Swal.fire({
                icon: "success",
                title: "Added to cart successfully",
                showConfirmButton: false,
                timer: 1500,
              })
              refetch();
            }
          })
        }
    }
  return (
    <div className="card card-compact bg-base-100  shadow-xl">
      <figure className="relative">
        <img
          src={image}
          alt="food image"
        />
      <p className="bg-black text-white absolute top-5 right-5 p-1 rounded-md">Price:{price}</p>
      </figure>
      <div className="card-body items-center">
        <h2 className="card-title">{name}</h2>
        <p>{recipe}</p>
        <div className="card-actions justify-end">
          <button onClick={handleAddCart} className="btn btn-outline border-0 border-b-4 mt-4 bg-gray-100 text-orange-300 hover:text-orange-300">Add to cart</button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
