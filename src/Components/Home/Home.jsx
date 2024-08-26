import { useQuery } from "@tanstack/react-query";
import Products from "../Products/Products";
import axiosConfig from "../AxiosConfig/axiosConfig";
import Slider from "react-slick";
import Loading from "../Loading/Loading";

import sliderImage1 from "../../assets/images/slider-image-1.jpeg";
import sliderImage2 from "../../assets/images/slider-image-2.jpeg";
import sliderImage3 from "../../assets/images/slider-image-3.jpeg";

import groceryBanner1 from "../../assets/images/grocery-banner.jpg";
import groceryBanner2 from "../../assets/images/grocery-banner-2.jpeg";

const Home = () => {
  let images = [sliderImage1, sliderImage2, sliderImage3];

  let { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () => axiosConfig.get("/api/v1/categories"),
  });

  let categories = data?.data.data;

  let settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 1000,
    swipe: false,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows: false,
    className: " rounded-lg",
  };

  let settings1 = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <div className="mb-10 mt-10 w-[75%] mx-auto hidden md:grid grid-cols-4">
            <div className="col-span-3 ">
              <Slider {...settings1}>
                {images.map((sliderImage) => (
                  <div key={sliderImage}>
                    <img
                      className="w-full  h-[450px]"
                      src={sliderImage}
                      alt=""
                    />
                  </div>
                ))}
              </Slider>
            </div>
            <div>
              <img className="w-full h-[225px]" src={groceryBanner1} alt="" />
              <img className="w-full h-[225px]" src={groceryBanner2} alt="" />
            </div>
          </div>

          <div className="w-[75%] mx-auto hidden md:block custom-slider">
            <Slider {...settings}>
              {categories.map((categorie) => (
                <div key={categorie._id} className="h-[250px]">
                  <img
                    className="w-full h-[250px] rounded-lg shadow-md shadow-[#434343] "
                    src={categorie.image}
                    alt=""
                  />
                </div>
              ))}
            </Slider>
          </div>

          <div>
            <Products />
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
