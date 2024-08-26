import { useFormik } from "formik";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { UserContext } from "../../Context/UserContext.jsx";

import axiosConfig from "../AxiosConfig/axiosConfig.jsx";

const Login = () => {
  const [resError, setResError] = useState();
  const { setToken } = useContext(UserContext);

  let navigate = useNavigate();

  async function postLogin(x) {
    const api = await axiosConfig
      .post("/api/v1/auth/signin", {
        email: x.email,
        password: x.password,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        setToken(res.data.token);
        navigate("/");
      })
      .catch((error) => setResError(error.response.data.message));
    console.log(api);
  }
  
  let validationSchema = Yup.object({
    email: Yup.string().required("Email is required").email("Invalid email"),
    password: Yup.string()
      .required("Password is required")
      .matches(/^[A-Z][\w\W]{5,10}$/, "Invalid password ex(Ahmed1234)"),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      password: "",
    },
    validationSchema,
    onSubmit: (x) => postLogin(x),
  });

  return (
    <>
      <section className="mb-auto flex flex-col h-screen">
        <div className="w-[60%] mx-auto mt-16 ">
          {resError ? (
            <h3 className=" w-[50%] mx-auto text-center text-2xl bg-red-600 rounded-md text-white p-2 mb-8">
              {resError}
            </h3>
          ) : (
            ""
          )}
          <h2 className="text-3xl pb-4 font-semibold">Login Now:</h2>
          <form onSubmit={formik.handleSubmit}>
            <div className="Email">
              <label className="block mb-2 mt-4" htmlFor="email">
                Email :
              </label>
              <input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="text"
                id="email"
                autoComplete="on"
                className=" border border-gray-400 rounded-md bg-transparent focus:outline-none shadow-none focus:border-gray-300 w-full"
              />
              
              {formik.errors.email && formik.touched.email ? (
                <p className="mt-2 p-2 bg-red-700 bg-opacity-80 rounded-md text-white">
                  {formik.errors.email}
                </p>
              ) : (
                ""
              )}
              
            </div>
            <div className="Password">
              <label className="block mb-2 mt-4" htmlFor="password">
                Password :
              </label>
              <input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="password"
                id="password"
                autoComplete="on"
                className=" border border-gray-400 rounded-md bg-transparent focus:outline-none focus:border-gray-300 w-full"
              />
              {formik.errors.password && formik.touched.password ? (
                <p className="mt-2 p-2 bg-red-700 bg-opacity-80 rounded-md text-white">
                  {formik.errors.password}
                </p>
              ) : (
                ""
              )}
            </div>
            <button
              type="submit"
              className="bg-redColor text-white ps-4 pe-4 pt-2 pb-2 rounded-md mt-5 flex ml-auto"
            >
              Login
            </button>
            <div className=" mt-10">
              <span className="text-[15px]">If you forgot password </span>
              <Link
                to={"/forgotpassword"}
                className="text-[16px] border-0 border-b-2 border-blue-500  p-2 rounded-md "
              >
                Click here
              </Link>
            </div>

            <div className=" mt-10">
              <span className="text-[15px]">If you dont have account </span>
              <Link
                to={"/register"}
                className="text-[16px] border-0 border-b-2 border-blue-500  p-2 rounded-md "
              >
                Register Now
              </Link>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;
