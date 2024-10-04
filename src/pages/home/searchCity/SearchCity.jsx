import { useEffect, useRef, useState } from "react";
import classes from "./searchCity.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function SearchCity(props) {
  const refCity = useRef(null);

  useEffect(() => {
    document.addEventListener(
      "keydown",
      (e) => {
        if (e.key === "Escape") props.setShowCity(false);
      },
      true
    );
    document.addEventListener(
      "click",
      (e) => {
        if (refCity.current && !refCity.current.contains(e.target))
          props.setShowCity(false);
      },
      true
    );
  }, []);

  return (
    <div ref={refCity}>
      <div className={classes.searchCity}>
        <p style={{ marginBottom: "10px" }}>Những địa điểm còn phòng</p>
        {props.cityList &&
          props.cityList.map((e, i) => (
            <div onClick={() => props.setCity(e.name)} key={i}>
              <FontAwesomeIcon icon="fa-solid fa-location-dot" />
              <p>{e.name}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default SearchCity;
