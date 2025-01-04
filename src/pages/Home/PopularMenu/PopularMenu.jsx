import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useMenu from "../../../hooks/useMenu";
import MenuCategory from "../../Menu/MenuCategory/MenuCategory";
import popularImg from '../../../assets/menu/banner3.jpg'


const PopularMenu = () => {
    const [menu] = useMenu();
    console.log(typeof menu,'Ti ti type');
    // const popularMenu = [];
   const popularMenu = menu.filter(item => item.category ==='popular');
    console.log(menu,'From menu')

    return (
        <section className="mb-12">
            <SectionTitle
                heading="From Our Menu"
                subHeading="Popular Items"
            ></SectionTitle>
            <MenuCategory items={popularMenu} title="popular" coverImg={popularImg}/>
        </section>
    );
};

export default PopularMenu;