import { Footer } from "flowbite-react";
import american from "../../assets/images/american express.png";
import masterCard from "../../assets/images/MasterCard.png";
import payPal from "../../assets/images/PayPal.png";
import appStore from "../../assets/images/appStore.png";
import google from "../../assets/images/google play.png";

const FooterPage = () => {
  return (
    <>
      <Footer container className="bg-[#d3d3d3]">
        <div className="w-full">
          <div className="grid w-full justify-between md:block grid-cols-1">
            <div className="sm:ms-4">
              <h3 className="text-2xl mt-1">Get the FreshCart app</h3>
              <p className="text-gray-500">
                We will send you a link, open it on your phone to download the
                app.
              </p>
            </div>
            <div className="sm:ms-12 mt-4 grid grid-cols-9">
              <div className="col-span-9 xl:col-span-8">
                <input
                  className="w-full h-8 rounded-md border border-gray-400 "
                  type="email"
                  placeholder="Email..."
                />
              </div>
              <div className="ms-5 mt-5 xl:mt-0 text-center col-span-9 xl:col-span-1">
                <button className="bg-greenColor text-white pt-1 pb-1 ps-5 pe-5 rounded-md">
                  Share App Link
                </button>
              </div>
            </div>
            <Footer.Divider />

            <div className="sm:ms-12 grid grid-cols-2 xl:grid-cols-3 ">
              <div className="sm:mx-auto xl:mx-0 col-span-3 sm:col-span-2">
                <div className="flex flex-col sm:flex-row sm:items-center text-left ">
                  <p className="me-5 font-semibold">Payment Partners</p>
                  <img
                    className="w-[60px] mt-3 sm:mt-0"
                    src={american}
                    alt="american express"
                  />
                  <img
                    className="sm:ms-5 mt-4 sm:mt-0 w-[60px]"
                    src={masterCard}
                    alt="MasterCard"
                  />
                  <img
                    className="sm:ms-5 mt-4 sm:mt-0 w-[90px] sm:w-[60px]"
                    src={payPal}
                    alt="PayPal"
                  />
                </div>
              </div>

              <div className="mt-10 xl:mt-0 sm:mx-auto col-span-2  xl:col-span-1">
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <p className="me-5 font-semibold">
                    Get deliveries with FreshCart
                  </p>
                  <img
                    className="me-5 w-[120px] mt-3 sm:mt-0"
                    src={appStore}
                    alt="app Store"
                  />
                  <img
                    className="w-[120px] mt-5 sm:mt-0"
                    src={google}
                    alt="google play"
                  />
                </div>
              </div>
            </div>
          </div>

          <Footer.Divider />
          <div className="w-full sm:flex sm:items-center sm:justify-between"></div>
        </div>
      </Footer>
    </>
  );
};

export default FooterPage;
