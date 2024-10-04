import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import classes from "./Transaction.module.css";

function Transaction() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const [transaction, setTransactions] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      swal({
        title: `Bạn chưa đăng nhập`,
        text: "Vui lòng đăng nhập để xem đặt phòng",
        icon: "error",
        buttons: ["NO", "YES"],
      }).then((yes) => {
        if (yes) {
          navigate("/login");
        } else {
          navigate("/");
        }
      });
    } else {
      async function api() {
        const res = await fetch(
          `http://localhost:5000/hotel/transaction/${user._id}`
        );
        setTransactions(await res.json());
      }
      api();
    }
  }, []);

  function changDate(date) {
    const day = new Date(date.slice(0, 10));
    return day.toLocaleDateString("en-GB");
  }

  return (
    <div className={classes.trans}>
      <div className="container">
        <h1>Your Transactions</h1>
        {transaction ? (
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Hotel</th>
                <th>Room</th>
                <th>Date</th>
                <th>Price</th>
                <th>Payment Method</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {transaction.map((e, i) => (
                <tr key={e._id}>
                  <td>{i + 1}</td>
                  <td>{e.hotel.name}</td>
                  <td>{e.room.toString()}</td>
                  <td>
                    {changDate(e.dateStart)} - {changDate(e.dateEnd)}
                  </td>
                  <td>${e.price}</td>
                  <td>{e.payment == "Credit" ? "Credit Card" : e.payment}</td>
                  <td>
                    <span className={classes[e.status.toLowerCase()]}>
                      {e.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h1 style={{ margin: "10% 0", fontSize: "40px" }}>
            No Transaction Found
          </h1>
        )}
      </div>
    </div>
  );
}

export default Transaction;
