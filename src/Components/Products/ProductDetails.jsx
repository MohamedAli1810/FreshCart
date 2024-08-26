import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { useNavigate, useParams } from "react-router-dom";
import { ThreeDots, Triangle } from "react-loader-spinner";
import { IoStarSharp } from "react-icons/io5";
import { FaHeartCircleMinus, FaHeartCirclePlus } from "react-icons/fa6";
import Slider from "react-slick";
import { useContext, useEffect } from "react";
import axiosConfig from "../AxiosConfig/axiosConfig";
import { ProductContext } from "../../Context/productContext";
import Swal from "sweetalert2";
import { WishlistContext } from "../../Context/WishlistContext";
import Loading from "../Loading/Loading";
const ProductDetails = () => {
  let { id } = useParams();
  let wishlist;
  let navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  let { addProduct, isLoadingAddProduct, successAddProduct, getCart } =
    useContext(ProductContext);
  let { addWishlist, deleteWishlist, wishlistData, getWishlist } =
    useContext(WishlistContext);
  wishlist = wishlistData?.data.data;
  let { data, isLoading, isFetching } = useQuery({
    queryKey: ["getProductID"],
    queryFn: () => {
      return axiosConfig.get(`/api/v1/products/${id}`);
    },
  });
  let product = data?.data.data;
  let settings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    className:
      "sm:w-[400px] h-[99%] shadow-transparent hover:shadow-[#434343] duration-300 rounded-lg shadow-lg",
  };
  if (isFetching) {
    return (
      <div className=" w-full h-screen flex items-center justify-center rotate-180">
        <Triangle
          visible={true}
          height="400"
          width="400"
          color="#A4161A"
          ariaLabel="triangle-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }
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
      {isLoading ? (
        <Loading />
      ) : (
        <div className="w-[80%] mt-28 mb-36 mx-auto">
          <Helmet>
            <title>{product.title}</title>
            <link rel="canonical" href="http://mysite.com/example" />
          </Helmet>
          <div className="grid grid-cols-1 2xl:grid-cols-3">
            <div className="w-[100%] 2xl:w-[80%]">
              <Slider {...settings}>
                {product.images?.map((image)  => (
                  <div key={image} className="">
                    <img className="w-full rounded-lg" src={image} alt="" />
                  </div>
                ))}
              </Slider>
            </div>
            <div className="col-span-2 mb-16 flex flex-col justify-center">
              <div className="mb-16 me-3">
                {wishlist?.filter((wishlistid) => {
                  return wishlistid._id == product._id;
                }).length > 0 ? (
                  <button className="flex ms-auto mt-5 sm:mt-0">
                    <FaHeartCircleMinus
                      onClick={() => {
                        if (localStorage.getItem("token")) {
                          deleteWishlist(product._id);
                          getWishlist();
                        } else {
                          navigate("/login");
                        }
                      }}
                      className="text-xl text-redColor "
                    />
                  </button>
                ) : (
                  <button className="flex ms-auto mt-5 sm:mt-0">
                    <FaHeartCirclePlus
                      onClick={() => {
                        if (localStorage.getItem("token")) {
                          addWishlist(product._id);
                          getWishlist();
                        } else {
                          navigate("/login");
                        }
                      }}
                      className="text-3xl 2xl:text-xl "
                    />
                  </button>
                )}
              </div>
              <h2 className="text-3xl font-bold mb-4">Name: {product.title}</h2>
              <h2 className="font-medium mb-4">
                Description: {product.description}
              </h2>
              <div className="flex   justify-between">
                <p className="font-semibold">Price: {product.price} EGP </p>
                <p className="flex items-center me-3">
                  <IoStarSharp className="me-1 text-3xl 2xl:text-xl text-yellow-300" />
                  {product.ratingsAverage}
                </p>
              </div>

              {isLoadingAddProduct ? (
                <button
                  disabled="true"
                  className="bg-gradient-to-r from-[#F2F2F2] via-[#dbdada] to-[#EAEAEA] border border-black pt-1 pb-1 w-56 sm:w-96 text-center rounded-lg mx-auto mt-20"
                >
                  <div className="flex justify-center">
                    <ThreeDots
                      visible={true}
                      height="24"
                      width="24"
                      color="#4fa94d"
                      radius="9"
                      ariaLabel="three-dots-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                    />
                  </div>
                </button>
              ) : (
                <button
                  onClick={() => {
                    if (localStorage.getItem("token")) {
                      addProduct(product._id);

                      setInterval(() => {
                        getCart();
                      }, 500);
                    } else {
                      navigate("/login");
                    }
                  }}
                  className="bg-gradient-to-r from-[#F2F2F2] via-[#dbdada] to-[#EAEAEA] border border-black pt-1 pb-1 w-56 sm:w-96 text-center rounded-lg mx-auto mt-20"
                >
                  Add
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default ProductDetails;
