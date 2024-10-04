import { Link } from "react-router-dom";
import classes from "./SearchListItem.module.css";

function SearchListItem(props) {
  const data = props.object;
  return (
    <div className={classes.search__list}>
      <img src={data.photos[0]} alt="" />
      <div style={{}}>
        <h1>{data.name}</h1>
        <p>{data.distance} from center</p>
        <p style={{ fontWeight: "bolder", marginTop: "10px" }}>
          {data.desc.slice(0, 200)}
        </p>
        <p>{data.type}</p>
        <div
          style={{ color: "#008234" }}
          className={data.featured ? "" : classes.hide}
        >
          <strong>Free cancellation</strong>
          <p>You can cancel later, so lock in this great price today!</p>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div className="flex justify-between">
          <span
            style={{
              color: "white",
              backgroundColor: "#003580",
              padding: "5px",
              borderRadius: "0",
            }}
          >
            {data.rating}
          </span>
        </div>
        <div style={{ textAlign: "right" }}>
          <p style={{ fontSize: "20px", fontWeight: "bolder" }}>
            ${data.cheapestPrice}
          </p>
          <p className=" text-gray-400">Includes taxes and fees</p>
          <Link to={`/detail/${data._id}`}>
            <button>See availability</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SearchListItem;
