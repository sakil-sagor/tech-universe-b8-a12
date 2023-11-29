import FeaturedProducts from "../../../Components/FrontendComp/FeaturedProducts/FeaturedProducts";
import Header from "../../../Components/FrontendComp/Header/Header";

const Home = () => {
  return (
    <div>
      <Header></Header>
      <div className="container mx-auto px-2">
        <FeaturedProducts></FeaturedProducts>
      </div>
    </div>
  );
};

export default Home;
