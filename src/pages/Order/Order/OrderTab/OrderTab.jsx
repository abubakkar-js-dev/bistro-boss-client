import FoodCard from "../../../../components/FoodCard/FoodCard";

const OrderTab = ({items}) => {
    return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {
            items.map(item=> <FoodCard key={item._id} item={item} />)
          }
            </div>
    );
};

export default OrderTab;