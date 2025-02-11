import { Outlet } from "react-router-dom";

import HeaderComponent from "../components/HeaderComponents/HeaderComponent";
import FooterComponent from "../components/FooterComponents/FooterComponent";

export default function DefaultLayout() {
  return (
    <div>
      <HeaderComponent />
      <Outlet />
      <FooterComponent />
    </div>
  );
}
