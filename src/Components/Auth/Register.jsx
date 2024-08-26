import { useFormik } from "formik";
import { useContext, useState } from "react";
import { InfinitySpin } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { UserContext } from "../../Context/UserContext.jsx";
import axiosConfig from "../AxiosConfig/axiosConfig.jsx";

const Register = () => {
  const [resError, setResError] = useState();
  const [lodaing, setLodaing] = useState(false);
  const { setToken } = useContext(UserContext);

  let navigate = useNavigate();

  async function postRegister(x) {
    const api = await axiosConfig
      .post("/api/v1/auth/signup", {
        name: x.name,
        email: x.email,
        password: x.password,
        rePassword: x.rePassword,
        phone: x.phone,
      })
      .then((res) => {
        setLodaing(false);
        localStorage.setItem("token", res.data.token);
        setToken(res.data.token);
        navigate("/");
      })
      .catch((error) => {
        setResError(error.response.data.message);
        setLodaing(false);
      });

    console.log(api);
  }

  let validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Min length is 3")
      .max(10, "Max lenght is a 10"),

    email: Yup.string().required("Email is required").email("Invalid email"),

    password: Yup.string()
      .required("Password is required")
      .matches(/^[A-Z][\w\W]{5,10}$/, "Invalid password ex(Ahmed1234)"),

    rePassword: Yup.string()
      .required("rePassword is required")
      .oneOf([Yup.ref("password")], "Password and rePassword dont match"),

    phone: Yup.string()
      .required("Phone is required")
      .matches(/^[01][0125][0-9]{8}$/, "invalied Number"),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: (x) => {
      postRegister(x);
    },
  });

  return (
    <>
      <section>
        <div className="w-[60%] mb-16 mx-auto mt-16">
          {resError ? (
            <h3 className=" w-[50%] mx-auto text-center text-2xl bg-red-600 rounded-md text-white p-2 mb-8">
              {resError}
            </h3>
          ) : (
            ""
          )}
          <h2 className="text-3xl pb-4 font-semibold">Register Now:</h2>
          <form onSubmit={formik.handleSubmit}>
            <div className="Name">
              <label className="block mb-2 mt-4" htmlFor="name">
                Name :
              </label>
              <input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                autoComplete="on"
                style={{ boxShadow: "none" }}
                type="text"
                id="name"
                className=" border border-gray-400 rounded-md bg-transparent focus:outline-none shadow-none focus:border-gray-300 w-full"
              />

              {formik.errors.name && formik.touched.name ? (
                <p className="mt-2 p-2 bg-red-700 bg-opacity-80 rounded-md text-white">
                  {formik.errors.name}
                </p>
              ) : (
                ""
              )}
            </div>

            <div className="Email">
              <label className="block mb-2 mt-4" htmlFor="email">
                Email :
              </label>
              <input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                style={{ boxShadow: "none" }}
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
                style={{ boxShadow: "none" }}
                type="password"
                id="password"
                autoComplete="on"
                className=" border border-gray-400 rounded-md bg-transparent focus:outline-none shadow-none focus:border-gray-300 w-full"
              />

              {formik.errors.password && formik.touched.password ? (
                <p className="mt-2 p-2 bg-red-700 bg-opacity-80 rounded-md text-white">
                  {formik.errors.password}
                </p>
              ) : (
                ""
              )}
            </div>

            <div className="rePassword">
              <label className="block mb-2 mt-4" htmlFor="rePassword">
                rePassword :
              </label>
              <input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                style={{ boxShadow: "none" }}
                type="password"
                id="rePassword"
                autoComplete="on"
                className=" border border-gray-400 rounded-md bg-transparent focus:outline-none shadow-none focus:border-gray-300 w-full"
              />

              {formik.errors.rePassword && formik.touched.rePassword ? (
                <p className="mt-2 p-2 bg-red-700 bg-opacity-80 rounded-md text-white">
                  {formik.errors.rePassword}
                </p>
              ) : (
                ""
              )}
            </div>

            <div className="Phone">
              <label className="block mb-2 mt-4" htmlFor="phone">
                Phone :
              </label>
              <input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                style={{ boxShadow: "none" }}
                type="number"
                id="phone"
                autoComplete="on"
                className=" border border-gray-400 rounded-md bg-transparent focus:outline-none shadow-none focus:border-gray-300 w-full"
              />

              {formik.errors.phone && formik.touched.phone ? (
                <p className="mt-2 p-2 bg-red-700 bg-opacity-80 rounded-md text-white">
                  {formik.errors.phone}
                </p>
              ) : (
                ""
              )}
            </div>

            {lodaing ? (
              <button className="border border-redColor flex justify-between items-center rounded-md mt-5  ml-auto">
                <div className="me-10">
                  <InfinitySpin
                    visible={true}
                    width="80"
                    color="#4fa94d"
                    ariaLabel="infinity-spin-loading"
                  />
                </div>
              </button>
            ) : (
              <button
                type="submit"
                onClick={() => {
                  setLodaing(true);
                }}
                className="bg-redColor text-white ps-8 pe-8 pt-2 pb-2 rounded-md mt-5 flex ml-auto"
              >
                Register
              </button>
            )}
            <div className="text-center mt-5">
              <span className="text-[15px]">If you have account </span>
              <Link
                to={"/login"}
                className="text-[16px] border-0 border-b-2 border-blue-500  p-2 rounded-md "
              >
                Login Now
              </Link>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Register;
