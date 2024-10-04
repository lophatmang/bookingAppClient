import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import object from "../../data/navBar.json";
import classes from "./Navbar.module.css";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { userSlice } from "../../redux/Redux";

function Navbar() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  useEffect(() => {
    dispatch(userSlice.actions.onLogin(currentUser));
  }, []);

  return (
    <div>
      <div className={classes.head}>
        <NavLink to="/">
          <h1>Booking Website</h1>
        </NavLink>
        <div className={classes.navbar}>
          {user ? (
            <>
              <p>{user.email}</p>
              <NavLink to="/transaction">Transactions</NavLink>
              <NavLink
                to="/login"
                onClick={() => dispatch(userSlice.actions.onLogout())}
              >
                Logout
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/login?regiseter=true">Regiseter</NavLink>
              <NavLink to="/login">Login</NavLink>
            </>
          )}
        </div>
      </div>
      <div className={classes.footer}>
        {object.map((e, i) => (
          <a key={i} className={e.active === true && classes.active} href="#">
            <FontAwesomeIcon icon={e.icon} />
            <span>{e.type}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

export default Navbar;
