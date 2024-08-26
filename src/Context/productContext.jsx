/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import axiosConfig from "../Components/AxiosConfig/axiosConfig";

export let ProductContext = createContext();

export default function ProductContextProvider(props) {
  const [isLoadingAddProduct, setIsLoading] = useState(null);
  const [successAddProduct, setSuccess] = useState(null);
  const [cartItems, setCartItems] = useState(0);

  useEffect(() => {
    const handleBackButton = () => setSuccess(false);
    window.addEventListener("popstate", handleBackButton);
    getCart();
    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, []);

  function getCart() {
    axiosConfig
      .get("/api/v1/cart")
      .then((data) => {
        setCartItems(data.data.numOfCartItems);
      })
      .catch((err) => {
        setCartItems(0);
        console.log(err);
      });
  }

  async function addProduct(productId) {
    setIsLoading(true);
    await axiosConfig
      .post("/api/v1/cart", {
        productId: productId,
      })
      .then(() => {
        setIsLoading(false);

        setSuccess(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <ProductContext.Provider
        value={{
          addProduct,
          isLoadingAddProduct,
          successAddProduct,
          setSuccess,
          cartItems,
          getCart,
        }}
      >
        {props.children}
      </ProductContext.Provider>
    </>
  );
}
