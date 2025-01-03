import useAuth from "../../hooks/useAuth";

const FoodCard = ({item}) => {
    const {name,image,price,recipe} = item;
    const {user} = useAuth();
    console.log(user.displayName,"from food card");

    const handleAddCart = ()=>{
        if(user && user.email){
          console.log("Add to cart added");
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
