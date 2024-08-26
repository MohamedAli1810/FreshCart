import { useFormik } from "formik";
import { useContext, useState } from "react";
import * as Yup from "yup";
import axiosConfig from "../AxiosConfig/axiosConfig";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { InfinitySpin } from "react-loader-spinner";
const ForgotPassword = () => {
  const [resError, setResError] = useState();
  const [verifyPassword, setVerifyPassword] = useState(null);
  const [resError1, setResError1] = useState();
  const [resetPassword, setResetPassword] = useState(null);
  const [resError3, setResError3] = useState();
  const [loading1, setLoading1] = useState(null);
  const [loading2, setLoading2] = useState(null);
  const [loading3, setLoading3] = useState(null);
  const { setToken } = useContext(UserContext);
  let navigate = useNavigate();
  function frogetPassword(data) {
    setLoading1(true);
    axiosConfig
      .post("/api/v1/auth/forgotPasswords", {
        email: data.email,
      })
      .then(() => {
        setVerifyPassword(true);
        setLoading1(false);
      })
      .catch((err) => {
        setResError(err.message);
        setLoading1(false);
      });
  }
  let validationSchema = Yup.object({
    email: Yup.string().required("Email is required").email("invalid Email"),
  });
  let formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: (data) => frogetPassword(data),
  });
  function verifyResetCode(data) {
    setLoading2(true);
    axiosConfig
      .post("/api/v1/auth/verifyResetCode", {
        resetCode: `${data.resetCode}`,
      })
      .then(() => {
        setResetPassword(true);
        formik3.setFieldValue("newEmail", "");
        setLoading2(false);
      })
      .catch((err) => {
        setResError1(err);
        setLoading2(false);
      });
  }
  let validationSchema1 = Yup.object({
    resetCode: Yup.string()
      .required("Code is required")
      .matches(/^[0-9]{5,6}$/, "Invalid code ex(123456 or 12345)"),
  });
  let formik1 = useFormik({
    initialValues: {
      resetCode: "",
    },
    validationSchema: validationSchema1,
    onSubmit: (data) => verifyResetCode(data),
  });
  async function resetPasswordApi(data) {
    setLoading3(true);
    const api = await axiosConfig
      .put("/api/v1/auth/resetPassword", {
        email: data.newEmail,
        newPassword: data.newPassword,
      })
      .then((res) => {
        setLoading3(false);

        localStorage.setItem("token", res.token);
        setToken(res.token);
        console.log(res.token);
        navigate("/");
      })
      .catch((error) => {
        setLoading3(false);
        setResError3(error.response.data.message);
        console.log(error);
      });
    console.log(api);
  }
  let validationSchema3 = Yup.object({
    newEmail: Yup.string().required("Email is required").email("Invalid email"),
    newPassword: Yup.string()
      .required("New password is required")
      .matches(/^[A-Z][\w\W]{5,10}$/, "Invalid password ex(Ahmed1234)"),
  });
  let formik3 = useFormik({
    initialValues: {
      newEmail: "",
      newPassword: "",
    },
    validationSchema: validationSchema3,
    onSubmit: (data) => resetPasswordApi(data),
  });
  return (
    <>
      <section className="mb-auto flex flex-col h-screen">
        {resetPassword ? (
          <div className="w-[60%] mx-auto mt-16 ">
            {resError3 ? (
              <h3 className=" w-[50%] mx-auto text-center text-2xl bg-red-600 rounded-md text-white p-2 mb-8">
                {resError3}
              </h3>
            ) : (
              ""
            )}
            <h2 className="text-3xl pb-4 font-semibold">Login Now:</h2>
            <form onSubmit={formik3.handleSubmit}>
              <div className="newEmail">
                <label className="block mb-2 mt-4" htmlFor="newEmail">
                  Email :
                </label>
                <input
                  onChange={formik3.handleChange}
                  onBlur={formik3.handleBlur}
                  value={formik3.values.newEmail}
                  type="email"
                  id="newEmail"
                  autoComplete="on"
                  className=" border border-gray-400 rounded-md bg-transparent focus:outline-none focus:border-gray-300 w-full"
                />
                {formik3.errors.newEmail && formik3.touched.newEmail ? (
                  <p className="mt-2 p-2 bg-red-700 bg-opacity-80 rounded-md text-white">
                    {formik3.errors.newEmail}
                  </p>
                ) : (
                  ""
                )}
              </div>
              <div className="newPassword">
                <label className="block mb-2 mt-4" htmlFor="newPassword">
                  New password :
                </label>
                <input
                  onChange={formik3.handleChange}
                  onBlur={formik3.handleBlur}
                  type="password"
                  id="newPassword"
                  autoComplete="on"
                  className=" border border-gray-400 rounded-md bg-transparent focus:outline-none focus:border-gray-300 w-full"
                />
                {formik3.errors.newPassword && formik3.touched.newPassword ? (
                  <p className="mt-2 p-2 bg-red-700 bg-opacity-80 rounded-md text-white">
                    {formik3.errors.newPassword}
                  </p>
                ) : (
                  ""
                )}
              </div>
              {loading3 ? (
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
                  className="bg-redColor text-white ps-9 pe-9 pt-2.5 pb-2.5 rounded-md mt-5 flex ml-auto"
                >
                  Submit
                </button>
              )}
            </form>
          </div>
        ) : verifyPassword ? (
          <div className="w-[60%] mx-auto mt-16 ">
            {resError1 ? (
              <h3 className=" w-[50%] mx-auto text-center text-2xl bg-red-600 rounded-md text-white p-2 mb-8">
                {resError1}
              </h3>
            ) : (
              ""
            )}
            <h2 className="text-3xl pb-4 font-semibold">Verify reset code:</h2>
            <form onSubmit={formik1.handleSubmit}>
              <div className="resetCode">
                <label className="block mb-2 mt-4" htmlFor="resetCode">
                  Code :
                </label>
                <input
                  onChange={formik1.handleChange}
                  onBlur={formik1.handleBlur}
                  value={formik1.values.resetCode}
                  type="number"
                  id="resetCode"
                  autoComplete="on"
                  className=" border border-gray-400 rounded-md bg-transparent focus:outline-none shadow-none focus:border-gray-300 w-full"
                />
                {formik1.errors.resetCode && formik1.touched.resetCode ? (
                  <p className="mt-2 p-2 bg-red-700 bg-opacity-80 rounded-md text-white">
                    {formik1.errors.resetCode}
                  </p>
                ) : (
                  ""
                )}
              </div>

              {loading2 ? (
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
                  className="bg-redColor text-white ps-9 pe-9 pt-2.5 pb-2.5 rounded-md mt-5 flex ml-auto"
                >
                  Submit
                </button>
              )}
            </form>
          </div>
        ) : (
          <div className="w-[60%] mx-auto mt-16 ">
            {resError ? (
              <h3 className=" w-[50%] mx-auto text-center text-2xl bg-red-600 rounded-md text-white p-2 mb-8">
                {resError}
              </h3>
            ) : (
              ""
            )}
            <h2 className="text-3xl pb-4 font-semibold">Froget password:</h2>
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
              {loading1 ? (
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
                  className="bg-redColor text-white ps-9 pe-9 pt-2.5 pb-2.5 rounded-md mt-5 flex ml-auto"
                >
                  Submit
                </button>
              )}
            </form>
          </div>
        )}
      </section>
    </>
  );
};
export default ForgotPassword;
