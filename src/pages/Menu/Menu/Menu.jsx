import { Helmet } from "react-helmet-async";
import Cover from "../../Shared/Cover/Cover";
import menuImg from "../../../../src/assets/menu/banner3.jpg";
import dessertBg from "../../../../src/assets/menu/dessert-bg.jpeg";
import pizzaBg from "../../../../src/assets/menu/pizza-bg.jpg";
import saladBg from "../../../../src/assets/menu/salad-bg.jpg";
import soupBg from "../../../../src/assets/menu/soup-bg.jpg";
import useMenu from "../../../hooks/useMenu";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import MenuCategory from "../MenuCategory/MenuCategory";

const Menu = () => {
  const [menu] = useMenu();
  const dessert = menu.filter((item) => item.category === "dessert");
  const soups = menu.filter((item) => item.category === "soup");
  const salad = menu.filter((item) => item.category === "salad");
  const pizza = menu.filter((item) => item.category === "pizza");
  const offered = menu.filter((item) => item.category === "offered");

  
  return (
    <div>
      <Helmet>
        <title>Menu | Bistro Boss Rastaurant</title>
      </Helmet>
      <Cover img={menuImg} title="Our Menu" />
      <SectionTitle subHeading="Don't Miss" heading="TODAY'S OFFER" />
      <MenuCategory items={offered} coverImg={menuImg} />
      <MenuCategory items={dessert} coverImg={dessertBg} title="dessert" />
      <MenuCategory items={pizza} coverImg={pizzaBg} title="pizza" />
      <MenuCategory items={salad} coverImg={saladBg} title="salad" />
      <MenuCategory items={soups} coverImg={soupBg} title="soups" />
      
    </div>
  );
};

export default Menu;
