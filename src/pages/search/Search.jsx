import SearchPopup from "./SearchPopup";
import SearchList from "./SearchList";

const Search = () => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 3fr",
        gap: "20px",
        alignItems: "start",
        marginTop: "50px",
      }}
      className="container"
    >
      <SearchPopup />
      <SearchList />
    </div>
  );
};

export default Search;
