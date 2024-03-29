import Blog from "./Blog/Blog";
import Categories from "./Categories/Categories";


import Product from "./Product/Product";
import Slider from "./Slider/Slider";

const Home = () => {
    return (
        <>
           
            <Slider />
            <Categories />
            <Product />
           
            <Blog/>
        </>
    );
}
export default Home;