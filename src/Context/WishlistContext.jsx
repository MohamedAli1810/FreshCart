/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import axiosConfig from "../Components/AxiosConfig/axiosConfig";

export let WishlistContext = createContext();

export default function WishlistContextProvider(props) {
  const [successAddWishlist, setSuccess] = useState(null);
  const [successDeleteWishlist, setSuccessDeleteWishlist] = useState(null);
  const [LoadingDeleteWishlist, setLoadingDeleteWishlist] = useState(null);
  const [wishlistData, setWishlistData] = useState(null);

  async function addWishlist(wishlistId) {
    await axiosConfig
      .post("/api/v1/wishlist", {
        productId: wishlistId,
      })
      .then(() => {
        setSuccess(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function deleteWishlist(wishlistId) {
    setLoadingDeleteWishlist(true);
    await axiosConfig
      .delete(`/api/v1/wishlist/${wishlistId}`)
      .then(() => {
        setSuccess(false);
        setSuccessDeleteWishlist(true);
        setLoadingDeleteWishlist(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getWishlist();
  }, []);

  async function getWishlist() {
    await axiosConfig
      .get(`/api/v1/wishlist`)
      .then((data) => {
        setWishlistData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <WishlistContext.Provider
        value={{
          addWishlist,
          successAddWishlist,
          deleteWishlist,
          successDeleteWishlist,
          setSuccessDeleteWishlist,
          LoadingDeleteWishlist,
          wishlistData,
          getWishlist,
        }}
      >
        {props.children}
      </WishlistContext.Provider>
    </>
  );
}
