import Header from "./Header";
import Hotel from "./Hotel";
import ListHotel from "./ListHotel";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <div
        style={{
          backgroundColor: "#003b95",
          marginBottom: "40px",
          color: "white",
        }}
      >
        <div className="container">
          <Header />
        </div>
      </div>
      <div className="container">
        <Outlet />
        <Hotel />
        <ListHotel />
      </div>
    </div>
  );
};

export default Home;
