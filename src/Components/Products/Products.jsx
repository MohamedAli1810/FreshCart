import { useQuery } from "@tanstack/react-query";
import axiosConfig from "../AxiosConfig/axiosConfig";
import { IoStarSharp } from "react-icons/io5";
import { FaHeartCircleMinus, FaHeartCirclePlus } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { Helmet } from "react-helmet";
import { useContext } from "react";
import { ProductContext } from "../../Context/productContext";
import Swal from "sweetalert2";
import { WishlistContext } from "../../Context/WishlistContext";
import Loading from "../Loading/Loading";
const Products = () => {
  let navigate = useNavigate();
  let { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => axiosConfig.get("/api/v1/products"),
  });
  let product = data?.data.data;
  let wishlist;
  let { addProduct, isLoadingAddProduct, successAddProduct, getCart } =
    useContext(ProductContext);
  let { addWishlist, deleteWishlist, wishlistData, getWishlist } =
    useContext(WishlistContext);

  wishlist = wishlistData?.data.data;
  if (successAddProduct) {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500,
    });
  }
  return (
    <>
      <Helmet>
        <title>Products</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <h2 className="w-full text-center text-4xl font-bold mt-10">
        All Products
      </h2>
      {isLoading ? (
        <Loading />
      ) : (
        <section className="w-[75%] mt-16 mb-16 mx-auto ">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-7">
            {product.map((product) => (
              <div
                key={product.id}
                className="group  overflow-hidden  shadow-transparent hover:shadow-[#434343] duration-300 rounded-lg shadow-lg "
              >
                <Link to={`/productdetails/${product.id}`}>
                  <div>
                    <img
                      className="w-full rounded-t-lg"
                      src={product.imageCover}
                      alt={product.title}
                    />
                    <h4 className="  mt-2 mb-1 ms-2 font-bold line-clamp-1 bg-gradient-to-b from-[#676767] via-[#434242] to-[#1d1d1d] bg-clip-text text-transparent ">
                      {product.category.name}
                    </h4>
                    <h4 className="font-medium ms-2  mb-1 line-clamp-1">
                      {product.title.split(" ", 3).join(" ")}
                    </h4>
                    <div className="flex ms-2  justify-between">
                      <p className="font-medium">{product?.price} EGP </p>
                      <p className="flex items-center me-3">
                        <IoStarSharp className="me-1 text-yellow-300" />
                        {product.ratingsAverage}
                      </p>
                    </div>
                  </div>
                </Link>
                <div className="mt-2.5 me-3">
                  {wishlist?.filter((wishlistid) => {
                    return wishlistid._id == product._id;
                  }).length > 0 ? (
                    <button className="flex ms-auto">
                      <FaHeartCircleMinus
                        onClick={() => {
                          if (localStorage.getItem("token")) {
                            deleteWishlist(product._id);
                            getWishlist();
                          } else {
                            navigate("/login");
                          }
                        }}
                        className="text-xl text-redColor"
                      />
                    </button>
                  ) : (
                    <button className="flex ms-auto">
                      <FaHeartCirclePlus
                        onClick={() => {
                          if (localStorage.getItem("token")) {
                            addWishlist(product._id);
                            getWishlist();
                          } else {
                            navigate("/login");
                          }
                        }}
                        className="text-xl"
                      />
                    </button>
                  )}
                </div>
                {isLoadingAddProduct ? (
                  <button
                    disabled="false"
                    className="font-normal bg-gradient-to-r from-[#F2F2F2] via-[#dbdada] to-[#EAEAEA] shadow-lg shadow-[#7b7a76] pt-1 pb-1 ps-12 pe-12 rounded-lg mx-auto flex mb-6 mt-2 md:translate-y-24 md:group-hover:translate-y-0 duration-500 "
                  >
                    <ThreeDots
                      visible={true}
                      height="24"
                      width="29"
                      color="#4fa94d"
                      radius="9"
                      ariaLabel="three-dots-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                    />
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      if (localStorage.getItem("token")) {
                        addProduct(product.id);
                        setInterval(() => {
                          getCart();
                        }, 500);
                      } else {
                        navigate("/login");
                      }
                    }}
                    className="font-normal bg-gradient-to-r from-[#F2F2F2] via-[#dbdada] to-[#EAEAEA] shadow-lg shadow-[#7b7a76] pt-1 pb-1 ps-12 pe-12 rounded-lg mx-auto flex mb-6 mt-2 md:translate-y-24 md:group-hover:translate-y-0 duration-500 "
                  >
                    Add
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
};
export default Products;
