import Cover from "../../Shared/Cover/Cover";
import MenuItem from "../../Shared/MenuItem/MenuItem";

const MenuCategory = ({ items,title,coverImg }) => {
  return (
    <div className="pb-10">
     {title &&  <Cover img={coverImg} title={title} />}
      <div className="grid md:grid-cols-2 gap-10 mb-16">
        {items.map((item) => (
          <MenuItem key={item._id} item={item}></MenuItem>
        ))}
      </div>
    </div>
  );
};

export default MenuCategory;
