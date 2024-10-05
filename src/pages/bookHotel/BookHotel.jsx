import { addDays } from "date-fns";
import { useEffect, useState } from "react";
import classes from "./BookHotel.module.css";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import "../home/CalendarComponent.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import swal from "sweetalert";

function BookHotel() {
  const params = useParams();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.user);
  const [infoUser, setInfoUser] = useState(currentUser);
  const [times, setTimes] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);
  const [listRoom, setListRoom] = useState();
  const [total, setTotal] = useState(0);
  const [roomArr, setRoomArr] = useState([]);

  useEffect(() => {
    async function api() {
      const res = await fetch(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/hotel/room/${
          params.hotelId
        }?dateStart=${times[0].startDate}&dateEnd=${times[0].endDate}`
      );
      setListRoom(await res.json());
    }
    api();
  }, [times]);

  function handleChange(e) {
    let isChecked = e.target.checked;
    const valueRoom = e.target.value;
    const nameRoom = e.target.name;
    // console.log(isChecked, valueRoom, nameRoom);
    if (isChecked) {
      setTotal(total + valueRoom * listRoom.days);
      const check = roomArr.includes(nameRoom);
      if (!check) setRoomArr([...roomArr, nameRoom]);
    } else {
      const updateRoom = roomArr.filter((e) => e !== nameRoom);
      setRoomArr(updateRoom);
      setTotal(total - valueRoom * listRoom.days);
    }
  }

  async function onSubmit(e) {
    e.preventDefault();
    const transaction = {
      userId: e.target.userId.value,
      hotel: params.hotelId,
      room: roomArr,
      dateStart: times[0].startDate,
      dateEnd: times[0].endDate,
      price: total,
      payment: e.target.payment.value,
      status: "Booked",
    };
    if (transaction.room.length == 0) {
      swal("Bạn chưa chọn phòng!!", "Vui lòng chọn phòng", "error");
    } else if (!transaction.payment) {
      swal("Vui lòng chọn hình thức thanh toán", "", "error");
    } else {
      fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/hotel/transaction`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(transaction),
      });
      await swal("Thành công", "Đặt Phòng thành công", "success");
      navigate("/transaction");
    }
  }

  return (
    <form onSubmit={onSubmit} className={classes.bookHotel}>
      <div className={classes.bookInfo}>
        <div>
          <h1>Dates</h1>
          <DateRange
            editableDateInputs={true}
            moveRangeOnFirstSelection={false}
            className="date"
            minDate={new Date()}
            ranges={times}
            onChange={(e) => setTimes([e.selection])}
          />
        </div>
        <div>
          <h1>Reserve Info</h1>
          <div className={classes.form}>
            <label>Your Full Name:</label>
            <input
              placeholder="Full Name"
              type="text"
              value={infoUser.fullName}
              onChange={(e) =>
                setInfoUser({ ...infoUser, fullName: e.target.value })
              }
            />
            <label>Your Email:</label>
            <input
              placeholder="Email"
              type="email"
              value={infoUser.email}
              onChange={(e) =>
                setInfoUser({ ...infoUser, email: e.target.value })
              }
            />
            <label>Your Phone Number:</label>
            <input
              type="nubmer"
              placeholder="Phone Number"
              value={infoUser.phoneNumber}
              onChange={(e) =>
                setInfoUser({ ...infoUser, phoneNumber: e.target.value })
              }
            />
            <label>Your Identity Card Number:</label>
            <input type="number" placeholder="Card Number" />
            <input type="hidden" name="userId" value={currentUser._id} />
          </div>
        </div>
      </div>
      <div>
        <h1>Select Rooms</h1>
        <div className={classes.bookRoom}>
          {listRoom &&
            listRoom.roomList.map((room) => (
              <div className={classes.room} key={room._id}>
                <div>
                  <h2>{room.title}</h2>
                  <p>{room.desc}</p>
                  <p style={{ fontSize: "15px" }}>
                    Max people:
                    <span> {room.maxPeople}</span>
                  </p>
                  <p style={{ fontWeight: "bolder" }}>${room.price}</p>
                </div>
                <div className={classes.roomNumber}>
                  {room.roomNumbers.map((e, i) => (
                    <div key={i}>
                      <label>{e}</label>
                      <input
                        onClick={(e) => handleChange(e)}
                        value={room.price}
                        name={e}
                        type="checkbox"
                        disabled={listRoom.roomBooked.includes(e) && "disabled"}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
        <div className={classes.checkout}>
          <h1>Bill Total: ${total}</h1>
          <select name="payment">
            <option value="">Select Payment Method</option>
            <option value="Credit">Credit</option>
            <option value="Card">Card</option>
            <option value="Cash">Cash</option>
          </select>
          <button type="submit">Reserve Now</button>
        </div>
      </div>
    </form>
  );
}

export default BookHotel;
