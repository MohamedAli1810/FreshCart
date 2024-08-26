import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import axiosConfig from "../AxiosConfig/axiosConfig";
import Loading from "../Loading/Loading";

const Brands = () => {
  let { data, isLoading } = useQuery({
    queryKey: ["brands"],
    queryFn: () => axiosConfig.get("/api/v1/brands"),
  });

  let brands = data?.data.data;

  return (
    <>
      <Helmet>
        <title>Brands</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <h2 className="w-full text-center text-4xl font-bold mt-10">
        All Brands
      </h2>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-6 w-[70%] mx-auto mt-16 mb-16">
          {brands.map((brand) => (
            <div
              key={brand._id}
              className="rounded-lg text-center shadow-transparent hover:shadow-[#434343] shadow-sm-light duration-500 "
            >
              <div className=" overflow-hidden flex items-center rounded-lg">
                <img className="w-full" src={brand.image} alt="" />
              </div>
              <h3 className="m-5 text-2xl font-bold  bg-gradient-to-b from-[#b9b9b9] via-[#6f6f6f] to-[#454545] bg-clip-text text-transparent">
                {brand.name}
              </h3>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Brands;
