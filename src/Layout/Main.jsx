import { Outlet } from "react-router-dom";
import Footer from "../Components/SharedComp/Footer/Footer";
import Navbar from "../Components/SharedComp/Navbar/Navbar";

const Main = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className="min-h-[75vh]">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Main;
