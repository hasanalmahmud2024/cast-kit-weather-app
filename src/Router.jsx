import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import About from "./pages/About";
import Home from "./pages/Home";
import MainLayout from "./layouts/MainLayout";
import Weather from "./pages/Weather";
import ErrorState from "./components/ErrorState";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    errorElement: <ErrorState type="route" message="This page could not be loaded." />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "/about",
        element: <About />
      },
      {
        path: "/weather",
        element: <Weather/>
      }
    ]
  },

]);

function Router() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default Router;
