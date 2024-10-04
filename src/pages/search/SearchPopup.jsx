import classes from "./SearchPopup.module.css";

function SearchPopup() {
  return (
    <div className={classes.search__popup}>
      <form action="">
        <h1>Search</h1>
        <label>Destination</label>
        <input type="text" />
        <label>Check-in Date</label>
        <input type="text" value="06/24/2022 to 06/24/2022" readOnly />
        <label>Options</label>
        <div>
          <p>Min price per night</p>
          <input type="text" />
          <p>Max price per night</p>
          <input type="text" />
          <p>Adult</p>
          <input type="text" placeholder="1" />
          <p>Children</p>
          <input type="text" placeholder="0" />
          <p>Room</p>
          <input type="text" placeholder="1" />
        </div>
        <button>Search</button>
      </form>
    </div>
  );
}

export default SearchPopup;
