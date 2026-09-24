import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import About from "./pages/About";
import Home from "./pages/Home";
import MainLayout from "./layouts/MainLayout";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "/about",
        element: <About />
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
