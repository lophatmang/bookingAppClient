import { useSearchParams } from "react-router-dom";
import SearchListItem from "./SearchListItem";
import { useEffect, useState } from "react";

function SearchList() {
  const [roomList, setRoomList] = useState();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    async function api() {
      const search = {
        city: searchParams.get("city"),
        dateStart: searchParams.get("dateStart"),
        dateEnd: searchParams.get("dateEnd"),
        adult: searchParams.get("adult"),
        room: searchParams.get("room"),
      };
      const res = await fetch(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/hotel/roomSearch/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(search),
        }
      );
      setRoomList(await res.json());
    }
    api();
  }, [searchParams]);

  return (
    <div>
      {roomList &&
        roomList.hotelAvb.map((e) => (
          <div key={e._id}>
            <SearchListItem object={e} />
          </div>
        ))}
    </div>
  );
}

export default SearchList;
