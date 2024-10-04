import { useEffect, useRef } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import "./CalendarComponent.css";

function CalendarComponent(props) {
  const refCale = useRef(null);

  // useEffect dde load lai cac hanh dong khi trang dc tai
  useEffect(() => {
    document.addEventListener(
      "keydown",
      (e) => {
        if (e.key === "Escape") props.setShowCale(false);
      },
      true
    );
    document.addEventListener(
      "click",
      (e) => {
        if (refCale.current && !refCale.current.contains(e.target))
          props.setShowCale(false);
      },
      true
    );
  }, []);

  return (
    <div ref={refCale}>
      <DateRange
        editableDateInputs={true}
        moveRangeOnFirstSelection={false}
        className="date"
        minDate={new Date()}
        ranges={props.times}
        onChange={(e) => props.setTimes([e.selection])}
      />
    </div>
  );
}

export default CalendarComponent;
