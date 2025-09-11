import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/layout/Layout";
import DashBoard from "./pages/DashBoard";
import AddExpanse from "./pages/AddExpanse";
import AllExpanse from "./pages/AllExpanse";
import { LoginForm } from "./components/forms/LoginForm";
import SignUpForm from "./components/forms/SignUpForm";
import ProtectedRoute from "./components/prtectedRoutes/ProtectedRoute";
import PublicRoute from "./components/prtectedRoutes/PublicRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <Layout />,
        children: [
          {
            index: true,
            element: <DashBoard />,
          },
          {
            path: "/addExpanse",
            element: <AddExpanse />,
          },
          {
            path: "/expanseHistory",
            element: <AllExpanse />,
          },
        ],
      },
    ],
  },
  {
    element: <PublicRoute />,
    children: [
      {
        path: "/login",
        element: <LoginForm />,
      },
      {
        path: "/register",
        element: <SignUpForm />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
