import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <>
      <div className="flex w-[100%]">
        <Sidebar openSidebar={openSidebar} setSidebar={(val) => setOpenSidebar(val)} />
        <div className="w-[100%]">
          <div className={`min-h-[100vh] xl:ms-64 lg:ms-56 ${openSidebar ? "md:ms-56" : "md:ms-0"}`}>
            <Header openSidebar={openSidebar} setSidebar={setOpenSidebar} />
            <div className="min-h-[100vh]">
              <Outlet />
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
