import HomePageNavbar from "../components/HomePageNavbar";
import { Outlet } from "react-router-dom";
import HomePageSidebar from "../components/HomepageSidebar";
import { useState } from "react";

const HomePageLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="min-h-screen bg-[#f8f7fb]">
      {/* Navbar */}
      <HomePageNavbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex">
        {/* Sidebar */}
        <HomePageSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {sidebarOpen && (
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 top-16 z-30 bg-slate-950/30 md:hidden"
          />
        )}

        <main className="mt-16 min-w-0 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default HomePageLayout;
