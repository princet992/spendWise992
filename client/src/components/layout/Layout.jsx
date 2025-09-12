import { Outlet } from "react-router-dom";
import AppSidebar from "../sidebar/AppSideBar";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";

export default function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 bg-[#f0f3f8]">
        <SidebarTrigger  />
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
