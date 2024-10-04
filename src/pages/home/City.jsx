import classes from "./City.module.css";
import { useLoaderData } from "react-router-dom";
import object from "../../data/city.json";

function City() {
  const city = useLoaderData();

  return (
    <div className={classes.city}>
      {object &&
        object.map((e, i) => (
          <div key={i}>
            <img src={e.image} alt="" />
            <h1>{e.name}</h1>
            <p>
              {city.find((city) => city.name === e.name)?.subText || 0}{" "}
              properties
            </p>
          </div>
        ))}
    </div>
  );
}

export default City;
