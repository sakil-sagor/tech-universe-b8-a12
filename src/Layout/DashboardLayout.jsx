import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Components/SharedComp/Navbar/Navbar";
import SideNavbar from "../Components/SharedComp/Navbar/SideNavbar";

const DashboardLayout = () => {
  return (
    <div>
      <Navbar></Navbar>

      <div className="mt-10 mb-12 px-2   mx-auto md:min-h-screen full-width-all">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 ">
          <div className="sideNabbar md:col-span-3 lg:col-span-3 xl:col-span-2 shadow-2xl text-center py-8 text-lg  text-indigo-900 font-semibold rounded-xl px-2 border">
            <SideNavbar></SideNavbar>
          </div>
          <div className="md:col-span-9 lg:col-span-9 xl:col-span-10 shadow-2xl rounded-xl border bg-blue-50">
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
