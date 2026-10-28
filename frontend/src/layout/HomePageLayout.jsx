import HomePageNavbar from "../components/HomePageNavbar";
import { Outlet } from "react-router-dom";
import HomePageSidebar from "../components/HomepageSidebar";
import { useState } from "react";

const HomePageLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    // <div>
    //   <Navbar isSidebaropen={isSidebaropen} setIsSidebaropen={setIsSidebaropen} />

    //   <div className="flex mt-16">
    //     <Sidebar isSidebaropen={isSidebaropen} setIsSidebaropen={setIsSidebaropen} />

    //     {/* Main content */}
    //     <main className="min-w-0 flex-1 p-6">
    //       <Outlet /> {/* renders nested routes */}
    //     </main>
    //   </div>
    // </div>

    <div>
      {/* Navbar */}
      <HomePageNavbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex">
        {/* Sidebar */}
        <HomePageSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="flex-1 mt-16">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default HomePageLayout;
