import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

const Layout = () => {
  return (
    <>
      <div>
        {" "}
        <NavBar />{" "}
      </div>
      <div id="main">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
