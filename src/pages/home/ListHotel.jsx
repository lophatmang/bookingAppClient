import { Link } from "react-router-dom";
import classes from "./City.module.css";
import { useEffect, useState } from "react";

function ListHotel() {
  const [object, setObject] = useState();

  useEffect(() => {
    async function API() {
      const res = await fetch(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/hotel/top-rate`
      );
      setObject(await res.json());
    }
    API();
  }, []);

  return (
    <div className={classes.list__hotel}>
      <h1>Homes guests love</h1>
      {object && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${object.length}, 1fr)`,
            gap: "20px",
          }}
        >
          {object.map((e) => (
            <div key={e._id}>
              <img src={e.photos[0]} alt="" />
              <Link to={`/detail/${e._id}`}>{e.name}</Link>
              <p className=" text-gray-400 my-2">{e.city} </p>
              <p
                className="mb-2"
                style={{ fontWeight: "bolder", color: "black" }}
              >
                Starting from ${e.cheapestPrice}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ListHotel;
