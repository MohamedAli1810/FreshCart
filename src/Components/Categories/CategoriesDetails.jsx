import { useQuery } from "@tanstack/react-query";
import { Triangle } from "react-loader-spinner";
import { Link, useParams } from "react-router-dom";
import axiosConfig from "../AxiosConfig/axiosConfig";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import Loading from "../Loading/Loading";

const CategoriesDetails = () => {
  let { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  let { data, isLoading, isFetching } = useQuery({
    queryKey: ["categorie"],
    queryFn: () => axiosConfig.get(`/api/v1/categories/${id}/subcategories`),
  });

  let categorie = data?.data.data;

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

  return (
    <>
      <Helmet>
        <title>Categories</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      {isLoading ? (
        <Loading />
      ) : (
        <div className=" md:h-screen">
          <div className="grid  gap-y-20 gap-x-8 w-[70%] mx-auto mt-16 mb-16">
            {categorie.length == 0 ? (
              <div className="col-span-3 mt-28 rounded-lg text-center border border-transparent shadow-transparent hover:border-redColor hover:shadow-redColor shadow-sm-light duration-500 ">
                <h3 className="m-5 p-5 text-6xl font-bold text-center bg-gradient-to-r from-[#fffbd5] to-[#b20a2c] bg-clip-text text-transparent">
                  Conimg soon
                </h3>
              </div>
            ) : (
              categorie.map((cat) => (
                <Link key={cat._id}>
                  <div className="rounded-lg text-center p-1  shadow-transparent hover:shadow-[#434343] shadow-sm-light duration-500 ">
                    <h3 className="m-5 text-2xl font-bold  bg-gradient-to-b from-[#b9b9b9] via-[#6f6f6f] to-[#454545] bg-clip-text text-transparent">
                      {cat.name}
                    </h3>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CategoriesDetails;
