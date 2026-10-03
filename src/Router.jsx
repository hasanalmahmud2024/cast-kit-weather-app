import { createBrowserRouter, RouterProvider } from "react-router";
import About from "./pages/About";
import Home from "./pages/Home";
import MainLayout from "./layouts/MainLayout";
import Weather from "./pages/Weather";
import ErrorState from "./components/ErrorState";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/weather", element: <Weather /> },
      { path: "/about", element: <About /> },
      {
        path: "*",
        element: (
          <ErrorState
            type="route"
            message="The page you requested could not be found."
          />
        ),
      },
    ],
  },
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
