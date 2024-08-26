import { useEffect, useState } from "react";
import axiosConfig from "../AxiosConfig/axiosConfig";
import { ProgressBar, Puff, ThreeDots } from "react-loader-spinner";
import { IoBagRemove } from "react-icons/io5";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import Loading from "../Loading/Loading";
import { Helmet } from "react-helmet";

const Cart = () => {
  const [removeProductLoading, setRemoveProductLoading] = useState(null);
  const [changeCountLoading, setChangeCountLoading] = useState(null);
  const [deleteCartLoading, setDeleteCartLoading] = useState(null);
  const [paymnetId, setPaymnetId] = useState();
  const [loadingPaymnet, setLoadingPaymnet] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const [products, setProducts] = useState();
  const [data1, setdata1] = useState();

  function getCart() {
    setIsLoading(true);
    axiosConfig
      .get("/api/v1/cart")
      .then((data) => {
        setProducts(data?.data.data.products);
        setdata1(data);
        setIsLoading(false);
        setPaymnetId(data?.data.data._id);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  }

  useEffect(() => {
    getCart();
  }, []);

  function RemoveProduct(id) {
    setRemoveProductLoading(true);
    axiosConfig
      .delete(`/api/v1/cart/${id}`)
      .then(() => {
        getCart();
        setRemoveProductLoading(false);
        setChangeCountLoading(false);
      })
      .catch((err) => console.log(err));
  }

  function changeCount(id, num) {
    setChangeCountLoading(true);

    if (num == 0) {
      RemoveProduct(id);
    } else {
      axiosConfig
        .put(`/api/v1/cart/${id}`, { count: num })
        .then(() => {
          setChangeCountLoading(false);
          getCart();
        })
        .catch((err) => console.log(err));
    }
  }

  function deleteCart() {
    setDeleteCartLoading(true);
    axiosConfig
      .delete("/api/v1/cart")
      .then(() => {
        getCart();
        setDeleteCartLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function checkoutSession(id) {
    setLoadingPaymnet(true);
    axiosConfig
      .post(`/api/v1/orders/checkout-session/${id}?url=http://localhost:5173`, {
        shippingAddress: {
          details: "details",
          phone: "01010700999",
          city: "Cairo",
        },
      })
      .then((data) => {
        // console.log(data.data.session.url);
        window.location.href = data.data.session.url;
        setLoadingPaymnet(false);
      })
      .catch((err) => {
        console.log(err);
        setLoadingPaymnet(false);
      });
  }

  return (
    <>
      <Helmet>
        <title>Cart</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      {isLoading ? (
        <Loading />
      ) : (
        <div
          className={` ${
            data1 == null ||
            deleteCartLoading == false ||
            data1?.data.data.totalCartPrice == 0
              ? "flex flex-col h-screen mb-auto"
              : "mb-16"
          } `}
        >
          <div className="bg-[#d3d3d3] mt-16 w-[70%] mx-auto rounded-md">
            <div className="p-10">
              <h2 className="text-3xl font-semibold">Cart Shop</h2>
              {data1 == null ||
              deleteCartLoading == false ||
              data1?.data.data.totalCartPrice == 0 ? (
                <h2 className="text-3xl font-semibold mt-10 ">
                  Your cart is empty
                </h2>
              ) : (
                <>
                  {products.map((product) => (
                    <div key={product._id}>
                      <div className="mt-16 grid grid-cols-1 md:flex md:items-center">
                        <img
                          className="mx-auto md:mx-0 w-[90%] md:w-[25%] lg:w-[20%] xl:w-[15%] rounded-md"
                          src={product.product.imageCover}
                          alt={product.product.title}
                        />

                        <div className="ms-3 md:ms-10 mt-5 md:mt-0 me-auto">
                          <h4 className="text-[20px] font-medium">
                            {product.product.title.split(" ", 2).join(" ")}
                          </h4>
                          <h4 className="text-[16px] font-medium">
                            {product.price} EGP
                          </h4>

                          {removeProductLoading ? (
                            <div className="mt-1 ms-3">
                              <ThreeDots
                                visible={true}
                                height="28"
                                width="35"
                                color="#4fa94d"
                                radius="9"
                                ariaLabel="three-dots-loading"
                                wrapperStyle={{}}
                                wrapperClass=""
                              />
                            </div>
                          ) : (
                            <button
                              onClick={() => RemoveProduct(product.product._id)}
                              className="flex items-center mt-2 text-redColor"
                            >
                              <IoBagRemove className="me-1" />
                              Remove
                            </button>
                          )}
                        </div>

                        <div className="flex mt-5 md:mt-0 mx-auto md:mx-0 items-center">
                          {changeCountLoading ? (
                            <div className="md:me-3 me-5">
                              <Puff
                                visible={true}
                                height="25"
                                width="25"
                                color="#4fa94d"
                                ariaLabel="puff-loading"
                                wrapperStyle={{}}
                                wrapperClass=""
                              />
                            </div>
                          ) : (
                            <button
                              onClick={() =>
                                changeCount(
                                  product.product._id,
                                  product.count + 1
                                )
                              }
                              className="md:me-3 me-5 md:text-2xl text-3xl"
                            >
                              <CiCirclePlus />
                            </button>
                          )}

                          <h5 className="text-xl">{product.count}</h5>

                          {changeCountLoading ? (
                            <div className="md:ms-3 ms-5">
                              <Puff
                                visible={true}
                                height="25"
                                width="25"
                                color="#4fa94d"
                                ariaLabel="puff-loading"
                                wrapperStyle={{}}
                                wrapperClass=""
                              />
                            </div>
                          ) : (
                            <button
                              onClick={() =>
                                changeCount(
                                  product.product._id,
                                  product.count - 1
                                )
                              }
                              className="md:ms-3 ms-5 md:text-2xl text-3xl"
                            >
                              <CiCircleMinus />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="w-[90%] mx-auto h-1 bg-white mt-20 mb-20"></div>

                  <div className="w-[90%] mx-auto">
                    <div className="md:flex md:justify-between md:items-center">
                      <div>
                        <h4 className="text-center md:text-left font-semibold text-2xl">
                          total price: {data1?.data.data.totalCartPrice}
                        </h4>
                        <h4 className="text-center md:text-left font-semibold text-xl mt-3">
                          Cart items: {data1?.data.numOfCartItems}
                        </h4>
                      </div>

                      {deleteCartLoading ? (
                        <button disabled="true" className="mt-5 md:mt-0">
                          <ProgressBar
                            visible={true}
                            height="80"
                            width="160"
                            color="#4fa94d"
                            barColor="#A4161A"
                            borderColor="#000000"
                            ariaLabel="progress-bar-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                          />
                        </button>
                      ) : (
                        <button
                          onClick={deleteCart}
                          className=" mx-auto md:mx-0 flex items-center justify-center md:inline mt-5 md:mt-0 border-2 border-redColor text-redColor w-40 h-[50px] text-center rounded-lg "
                        >
                          Delete cart
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="w-[90%] md:w-[30%] mx-auto h-1 bg-white mt-20 mb-10"></div>

                  <div className="mx-auto text-center mb-5">
                    {loadingPaymnet ? (
                      <div className="text-center  flex justify-center">
                        <ProgressBar
                          visible={true}
                          height="80"
                          width="200"
                          color="#4fa94d"
                          barColor="#4fa94d"
                          borderColor="#000000"
                          ariaLabel="progress-bar-loading"
                          wrapperStyle={{}}
                          wrapperClass=""
                        />
                      </div>
                    ) : (
                      <button
                        onClick={() => checkoutSession(paymnetId)}
                        className="bg-gradient-to-r from-[#F2F2F2] via-[#dbdada] to-[#EAEAEA] border border-black pt-1 pb-1 w-36 md:w-56 text-center rounded-lg mx-auto"
                      >
                        Check out
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
