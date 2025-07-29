import { Outlet } from "react-router";
import Header from "../components/Header";

const Layout = () => {
  return (
    <>
      <h1>I am here!</h1>
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
