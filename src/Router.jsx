import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import About from "./pages/About";
import Home from "./pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/about",
    element: <About/>
  }
]);

function Router() {

  return (
    <>
      <RouterProvider router={router} />,
    </>
  )
}

export default Router;
