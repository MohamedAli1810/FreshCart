import { useQuery } from "@tanstack/react-query";
import axiosConfig from "../AxiosConfig/axiosConfig";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Loading from "../Loading/Loading";

const Categories = () => {
  let { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () => axiosConfig.get("/api/v1/categories"),
  });

  let categories = data?.data.data;

  return (
    <>
      <Helmet>
        <title>Categories</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <h2 className="w-full text-center text-4xl font-bold mt-10">
        All Categories
      </h2>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-[70%] mx-auto mt-16 mb-16">
          {categories.map((categorie) => (
            <Link
              key={categorie._id}
              to={`/categoriesdetails/${categorie._id}`}
            >
              <div className="rounded-lg text-center shadow-transparent hover:shadow-[#434343] shadow-sm-light duration-500 ">
                <div className="h-[300px] overflow-hidden flex items-center rounded-lg">
                  <img className="w-full" src={categorie.image} alt="" />
                </div>
                <h3 className="m-5 pb-2 text-2xl font-bold  bg-gradient-to-b from-[#b9b9b9] via-[#6f6f6f] to-[#454545] bg-clip-text text-transparent">
                  {categorie.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
};
export default Categories;
// /api/v1/categories
