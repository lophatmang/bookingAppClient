import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../Footer";
import Registration from "../Registration";
import { Provider } from "react-redux";
import { store } from "../../../redux/Redux";

const Layout = () => {
  return (
    <Provider store={store}>
      <div
        style={{
          backgroundColor: "#003b95",
          color: "white",
        }}
      >
        <div className="container">
          <Navbar />
        </div>
      </div>
      <Outlet />
      <div
        style={{
          backgroundColor: "#003b95",
          color: "white",
        }}
      >
        <Registration />
      </div>
      <div className="container">
        <Footer />
      </div>
    </Provider>
  );
};

export default Layout;
