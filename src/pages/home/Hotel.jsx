import classes from "./City.module.css";
import { useEffect, useState } from "react";

function Hotel() {
  const [object, setObject] = useState();

  useEffect(() => {
    async function API() {
      const res = await fetch("http://localhost:5000/hotel/type-hotel");
      setObject(await res.json());
    }
    API();
  }, []);
  return (
    <div className={classes.hotel}>
      <h1>Browse by property type</h1>
      <div className="flex gap-5">
        {object &&
          object.map((e, i) => (
            <div key={i}>
              <img src={e.image} alt="" />
              <h1>{e.name}</h1>
              <p className=" text-gray-400">{e.count} Hotels</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Hotel;
