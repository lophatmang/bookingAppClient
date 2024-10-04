import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import classes from "./Quantity.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { quantitySlice } from "../../redux/Redux";

function Quantity(props) {
  const refQty = useRef(null);

  // useEffect dde load lai cac hanh dong khi trang dc tai
  useEffect(() => {
    document.addEventListener(
      "keydown",
      (e) => {
        if (e.key === "Escape") props.setShowQty(false);
      },
      true
    );
    document.addEventListener(
      "click",
      (e) => {
        if (refQty.current && !refQty.current.contains(e.target))
          props.setShowQty(false);
      },
      true
    );
  }, []);
  const quantity = useSelector((state) => state.quantity);
  const dispatch = useDispatch();

  return (
    <div ref={refQty}>
      <div className={classes.quantity}>
        {/* Adult */}
        <div className={classes.label}>
          <label>Adult</label>
          <div>
            <button
              onClick={() =>
                dispatch(
                  quantitySlice.actions.changAdult(
                    quantity.adult === 1 ? 0 : -1
                  )
                )
              }
              className={quantity.adult === 1 ? classes.disabled : ""}
            >
              <FontAwesomeIcon icon="fa-solid fa-minus" />
            </button>
            <span>{quantity.adult}</span>
            <button
              onClick={() => dispatch(quantitySlice.actions.changAdult(1))}
            >
              <FontAwesomeIcon icon="fa-solid fa-plus" />
            </button>
          </div>
        </div>
        {/* children */}
        <div className={classes.label}>
          <label>Children</label>
          <div>
            <button
              onClick={() =>
                dispatch(
                  quantitySlice.actions.changChildren(
                    quantity.children === 0 ? 0 : -1
                  )
                )
              }
              className={quantity.children === 0 ? classes.disabled : ""}
            >
              <FontAwesomeIcon icon="fa-solid fa-minus" />
            </button>
            <span>{quantity.children}</span>
            <button
              onClick={() => dispatch(quantitySlice.actions.changChildren(1))}
            >
              <FontAwesomeIcon icon="fa-solid fa-plus" />
            </button>
          </div>
        </div>
        {/*  */}
        <div className={classes.label}>
          <label>Room</label>
          <div>
            <button
              onClick={() =>
                dispatch(
                  quantitySlice.actions.changRoom(quantity.room === 1 ? 0 : -1)
                )
              }
              className={quantity.room === 1 ? classes.disabled : ""}
            >
              <FontAwesomeIcon icon="fa-solid fa-minus" />
            </button>
            <span>{quantity.room}</span>
            <button
              onClick={() => dispatch(quantitySlice.actions.changRoom(1))}
            >
              <FontAwesomeIcon icon="fa-solid fa-plus" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Quantity;
