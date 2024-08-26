import { Outlet } from "react-router-dom";
import FooterPage from "../FooterPage/FooterPage";
import NavbarPage from "../NavbarPage/NavbarPage";
const Layout = () => {
  return (
    <>
      <NavbarPage />
      <Outlet></Outlet>
      <FooterPage />
    </>
  );
};
export default Layout;
