import { Suspense, lazy, useContext, useEffect } from "react";
import { RouterProvider, createHashRouter } from "react-router-dom";
import "./App.css";
import { UserContext } from "./Context/UserContext";
import Layout from "./Components/Layout/Layout";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import Home from "./Components/Home/Home";
import Products from "./Components/Products/Products";
import Login from "./Components/Auth/Login";
import Loading from "./Components/Loading/Loading";
import ForgotPassword from "./Components/Auth/ForgotPassword";

const Wishlist = lazy(() => import("./Components/Wishlist/Wishlist"));
const NotFound = lazy(() => import("./Components/NotFound/NotFound"));
const Cart = lazy(() => import("./Components/Cart/Cart"));
const Categories = lazy(() => import("./Components/Categories/Categories"));
const CategoriesDetails = lazy(() =>
  import("./Components/Categories/CategoriesDetails")
);
const Brands = lazy(() => import("./Components/Brands/Brands"));
const ProductDetails = lazy(() =>
  import("./Components/Products/ProductDetails")
);
const Register = lazy(() => import("./Components/Auth/Register"));

function App() {
  let routers = createHashRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "products",
          element: (
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          ),
        },
        {
          path: "productdetails/:id",
          element: (
            <Suspense fallback={<Loading />}>
              <ProtectedRoute>
                <ProductDetails />
              </ProtectedRoute>
            </Suspense>
          ),
        },
        {
          path: "categories",
          element: (
            <Suspense fallback={<Loading />}>
              <ProtectedRoute>
                <Categories />
              </ProtectedRoute>
            </Suspense>
          ),
        },
        {
          path: "categoriesdetails/:id",
          element: (
            <Suspense fallback={<Loading />}>
              <ProtectedRoute>
                <CategoriesDetails />
              </ProtectedRoute>
            </Suspense>
          ),
        },
        {
          path: "brands",
          element: (
            <Suspense fallback={<Loading />}>
              <ProtectedRoute>
                <Brands />
              </ProtectedRoute>
            </Suspense>
          ),
        },
        {
          path: "cart",
          element: (
            <Suspense fallback={<Loading />}>
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            </Suspense>
          ),
        },
        {
          path: "wishlist",
          element: (
            <Suspense fallback={<Loading />}>
              <ProtectedRoute>
                <Wishlist />
              </ProtectedRoute>
            </Suspense>
          ),
        },
        { path: "login", element: <Login /> },
        {
          path: "register",
          element: (
            <Suspense fallback={<Loading />}>
              <Register />
            </Suspense>
          ),
        },
        {
          path: "forgotpassword",
          element: (
            <Suspense fallback={<Loading />}>
              <ForgotPassword />
            </Suspense>
          ),
        },
        {
          path: "*",
          element: (
            <Suspense fallback={<Loading />}>
              <NotFound />
            </Suspense>
          ),
        },
      ],
    },
  ]);

  const { setToken } = useContext(UserContext);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  return (
    <>
      <RouterProvider router={routers}></RouterProvider>
    </>
  );
}

export default App;
