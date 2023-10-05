import { FC } from "react";
import Header from "./components/Header/Header";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer/Footer";

interface LayoutProps {}

const Layout: FC<LayoutProps> = () => {
  return (
    <main className="w-full h-screen">
      <Header />
      <div>
        <Outlet />
      </div>
      <Footer />
    </main>
  );
};

export default Layout;
