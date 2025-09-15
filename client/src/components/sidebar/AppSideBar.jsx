import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { ChartColumnIncreasing, House, IndianRupee, Plus, LogOut, Moon, Sun } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link, NavLink, useNavigate } from "react-router-dom";
import ExpanseButton from "../button/Button";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "@/features/authSlice/AuthSlice";
import { Button } from "../ui/button";
import { toggleTheme } from "@/features/ThemeSlice/ThemeSlice";

const items = [
  { title: "Dashboard", url: "/", icon: House },
  { title: "Add Expanse", url: "/addExpanse", icon: Plus },
  { title: "All Expanse", url: "/expanseHistory", icon: IndianRupee },
];

const AppSideBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { email, userName } = useSelector((state) => state.Auth);
  const { theme } = useSelector((state) => state.Theme);
  const { setOpen } = useSidebar();

  const handleLogOut = () => {
    dispatch(logOutUser());
    navigate("/login");
  };

  const closeIfMobile = () => {
    setOpen(false);
  };

  return (
    <>
      <Sidebar>
        <SidebarHeader>
          {/* <div className="flex justify-end">
            <Button onClick={() => dispatch(toggleTheme())} className=" h-8 w-8 rounded-full bg-slate-400 ">
              {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>
          </div> */}
          <div className="flex items-center gap-2 px-3 py-4">
            <div className="bg-gradient-to-br from-[#0dd1b7] to-[#177aec] p-2 rounded-lg">
              <ChartColumnIncreasing className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">ExpanseTracker</h2>
              <p className="text-xs text-muted-foreground">Smart spending insight</p>
            </div>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="text-lg font-bold text-slate-800 my-2">NAVIGATION</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        `flex items-center gap-2 px-2 py-2 rounded-md transition-colors font-medium ${
                          isActive
                            ? "bg-green-50 border border-green-700 text-green-700"
                            : "hover:bg-accent hover:text-accent-foreground"
                        }`
                      }
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel className="text-lg font-bold text-slate-800 my-2">Quick Actions</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link to="/addExpanse" onClick={closeIfMobile}>
                      <ExpanseButton>Add Expanse</ExpanseButton>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <div className="flex items-center justify-between px-3 py-3 border-t">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://github.com/shadcn.png" alt="@user" />
                <AvatarFallback>PT</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium">{userName}</span>
                <span className="text-xs text-muted-foreground">{email}</span>
              </div>
            </div>
            <button
              className="p-2 rounded-md hover:bg-accent text-muted-foreground hover:text-green-500"
              onClick={handleLogOut}
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </SidebarFooter>
      </Sidebar>

      {/* ---------Mobile Header-------- */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white border-b shadow-sm z-50 p-3 px-10">
        <div className="flex items-center gap-2">
          <SidebarTrigger />
          <div className="bg-gradient-to-br from-[#0dd1b7] to-[#177aec] p-1 rounded-lg">
            <ChartColumnIncreasing className="h-6 w-6 text-white" />
          </div>

          <h2 className="text-lg font-semibold">ExpanseTracker</h2>
        </div>
      </div>
    </>
  );
};

export default AppSideBar;
