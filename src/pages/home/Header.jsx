import classes from "./Header.module.css";
import { useEffect, useState } from "react";
import { addDays } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CalendarComponent from "./CalendarComponent";
import Quantity from "../quantity/Quantity";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import SearchCity from "./searchCity/SearchCity";
import { userSlice } from "../../redux/Redux";

function Header() {
  const navigate = useNavigate();
  const [times, setTimes] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const dispatch = useDispatch();
  const quantity = useSelector((state) => state.quantity);
  const [showCale, setShowCale] = useState(false);
  const [showQty, setShowQty] = useState(false);
  const [showCity, setShowCity] = useState(false);
  const [city, setCity] = useState();
  const [cityList, setCityList] = useState();
  useEffect(() => {
    async function API() {
      const res = await fetch(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/hotel/city`
      );
      setCityList(await res.json());
    }
    API();
  }, []);

  function onSubmit(e) {
    e.preventDefault();
    const city = e.target.city.value;
    const dateStart = e.target.dateStart.value;
    const dateEnd = e.target.dateEnd.value;
    const adult = e.target.adult.value;
    const children = e.target.children.value;
    const room = e.target.room.value;
    navigate(
      `/search?city=${city}&dateStart=${dateStart}&dateEnd=${dateEnd}&adult=${adult}&children=${children}&room=${room}`
    );
  }

  return (
    <div className={classes.header}>
      <h1>A lifetime of discounts? It's Genius.</h1>
      <p>
        Get rewarded for your travels - unlock instant savings of 10% or more
        with a free account
      </p>
      {currentUser ? (
        <div className={classes.login}>
          <Link to="/transaction" className="pr-2">
            Transaction
          </Link>
          /
          <Link
            onClick={() => dispatch(userSlice.actions.onLogout())}
            to="/login"
            className="pl-2"
          >
            Logout
          </Link>
        </div>
      ) : (
        <div className={classes.login}>
          <Link to="/login" className="pr-2">
            Sign in
          </Link>
          /
          <Link to="/login?regiseter=true" className="pl-2">
            Regiseter
          </Link>
        </div>
      )}
      <div className={classes.block}>
        <form onSubmit={onSubmit}>
          <div>
            <FontAwesomeIcon icon="fa fa-bed" />
            <input
              name="city"
              className="pl-2"
              placeholder="Where are you going?"
              value={city}
              readOnly
              onClick={() => setShowCity(!showCity)}
            />
          </div>
          <div>
            <FontAwesomeIcon icon="fa fa-calendar" />
            <input
              className="pl-2"
              value={`${times[0].startDate.toLocaleDateString(
                "en-GB"
              )} to ${times[0].endDate.toLocaleDateString("en-GB")}`}
              readOnly
              onClick={() => setShowCale(!showCale)}
            />
            <input type="hidden" name="dateStart" value={times[0].startDate} />
            <input type="hidden" name="dateEnd" value={times[0].endDate} />
          </div>
          <div>
            <FontAwesomeIcon icon="	fa fa-male" />
            <input
              readOnly
              onClick={() => setShowQty(!showQty)}
              type="text"
              className="pl-2"
              placeholder="1 adult • 0 children • 1 room"
              value={`${quantity.adult} adult • ${quantity.children} children • ${quantity.room} room`}
            />
            <input type="hidden" name="adult" value={quantity.adult} />
            <input type="hidden" name="children" value={quantity.children} />
            <input type="hidden" name="room" value={quantity.room} />
          </div>

          <button type="submit">Search</button>
        </form>
        {showCale && (
          <div
            style={{
              width: "340px",
              margin: "0 30%",
              position: "absolute",
            }}
          >
            <CalendarComponent
              times={times}
              setTimes={setTimes}
              setShowCale={setShowCale}
            />
          </div>
        )}
        {showQty && (
          <div
            style={{
              width: "340px",
              margin: "0 60%",
              position: "absolute",
            }}
          >
            <Quantity setShowQty={setShowQty} />
          </div>
        )}
        {showCity && (
          <div
            style={{
              width: "340px",
              position: "absolute",
            }}
          >
            <SearchCity
              cityList={cityList}
              setShowCity={setShowCity}
              setCity={setCity}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
