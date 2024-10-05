import classes from "./Info.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import swal from "sweetalert";
import { useSelector } from "react-redux";

const Detail = () => {
  const params = useParams();
  const currentUser = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const [hotel, setHotel] = useState();
  const [showBook, setShowBook] = useState(false);

  useEffect(() => {
    async function API() {
      const res = await fetch(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/hotel/detail/${
          params.hotelId
        }`
      );
      setHotel(await res.json());
    }
    API();
  }, []);

  async function checkLogin() {
    if (!currentUser) {
      swal({
        title: `Bạn chưa đăng nhập`,
        text: "Vui lòng đăng nhập để đặt phòng",
        icon: "error",
        buttons: ["NO", "YES"],
      }).then((yes) => {
        if (yes) {
          navigate("/login");
        }
      });
    } else {
      setShowBook(true);
    }
  }

  return (
    <div style={{ marginTop: "50px" }} className="container">
      {hotel && (
        <div className={classes.info}>
          <div className="flex justify-between items-start mb-5">
            <div>
              <h1 className=" mb-3">{hotel.name}</h1>
              <p className=" mb-3">
                <FontAwesomeIcon
                  className=" pr-2"
                  icon="fa-solid fa-location-dot"
                />
                {hotel.address}
              </p>
              <p className=" mb-3">
                <span style={{ fontWeight: "bolder", color: "#60a5fa" }}>
                  Excellent location - {hotel.distance}m from center
                </span>
              </p>
              <span style={{ color: "#16a34a" }}>
                Book a stay over ${hotel.cheapestPrice} at this property and get
                a free airport taxi
              </span>
            </div>
            <a onClick={() => checkLogin()} href="#book">
              Reserve or Book Now
            </a>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "10px",
            }}
          >
            {hotel.photos.map((e, i) => (
              <img key={i} src={e} alt="" />
            ))}
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "3fr 1fr",
              gap: "20px",
              margin: "20px 0",
            }}
          >
            <div>
              <h1 className=" mb-3">{hotel.name}</h1>
              <p>{hotel.desc}</p>
            </div>
            <div className={classes.description}>
              <h1>Perfect for a 9-night stay!</h1>
              <p>
                Located in the real heart of Krakow, this property has an
                excellent location score of 9.81
              </p>
              <p className=" text-2xl">
                <strong>${hotel.cheapestPrice}</strong>
                (1 nights)
              </p>
              <a onClick={() => checkLogin()} href="#book">
                Reserve or Book Now
              </a>
            </div>
          </div>
        </div>
      )}
      {showBook && currentUser && (
        <div id="book">
          <Outlet />
        </div>
      )}
    </div>
  );
};

export default Detail;
