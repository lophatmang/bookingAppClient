import loginCss from "./Login.module.css";
import swal from "sweetalert";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userSlice } from "../../redux/Redux";

function Login() {
  const [searchParams] = useSearchParams();
  const regiseter = searchParams.get("regiseter");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (currentUser) {
    return <Navigate to="/" />;
  }

  async function onSubmit(e) {
    e.preventDefault();
    const user = {
      email: e.target.email.value,
      password: e.target.password.value,
      username: e.target.username?.value,
      fullName: e.target.fullName?.value,
      phoneNumber: e.target.phoneNumber?.value,
    };

    function clearInput(input) {
      if (input) {
        e.target[input].value = "";
        e.target[input].value = "";
        e.target[input].value = "";
      }
      e.target.password.value = "";
    }

    if (!user.email || !user.password) {
      return swal(
        "Không được bỏ trống",
        "vui lòng điền Email và Password",
        "error"
      );
    } else if (user.password.length < 6) {
      return swal("Sai Password", "Vui lòng nhập từ 6 chữ số trở lên", "error");
    }

    if (e.target.button.value === "regiseter") {
      if (!user.username || !user.fullName || !user.phoneNumber) {
        return swal(
          "Không được bỏ trống",
          "vui lòng điền đầy đủ thông tin để đăng ký",
          "warning"
        );
      } else if (user.phoneNumber.length < 10 || user.phoneNumber.length > 12) {
        return swal(
          "Số điện thoại sai",
          "Vui lòng nhập sdt từ 10 đến 12 số",
          "error"
        );
      }
    }
    const req = await fetch(`http://localhost:5000/${e.target.button.value}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    const message = await req.json();
    //đăng ký thât bại
    if (message.regiseterError) {
      swal({
        title: `${message.regiseterError}`,
        text: "Bạn muốn tới trang đăng nhập",
        icon: "error",
        buttons: ["NO", "YES"],
      }).then((yes) => {
        if (yes) {
          navigate("/login");
        } else {
          clearInput(message.error);
        }
      });
    }
    // đăng ký thành công
    if (message.regiseterSuccess) {
      await swal(`${message.regiseterSuccess}`, "", "success");
      clearInput();
      navigate("/login");
    }
    //đăng nhập thành công
    if (message.loginSuccess) {
      await swal(`${message.loginSuccess}`, "", "success");
      dispatch(userSlice.actions.onLogin(message.user));
      navigate("/");
    }

    //đăng nhập thất bại
    if (message.loginError) {
      swal({
        title: `${message.loginError}`,
        text: "Bạn muốn tạo tải khoản mới không?",
        icon: "error",
        buttons: ["NO", "YES"],
      }).then((yes) => {
        clearInput("email");
        if (yes) {
          navigate("/login?regiseter=true");
        }
      });
    }
  }

  return (
    <>
      <div className={loginCss.form}>
        <form onSubmit={onSubmit}>
          <h1>{regiseter ? "Sign Up" : "Login"}</h1>
          <input type="email" name="email" placeholder="Email" />
          <input type="password" name="password" placeholder="Password" />
          {regiseter && (
            <>
              <input type="text" name="username" placeholder="Username" />
              <input type="text" name="fullName" placeholder="Full Name" />
              <input
                type="text"
                name="phoneNumber"
                placeholder="Phone Number"
              />
            </>
          )}
          <button
            type="submit"
            name="button"
            value={regiseter ? "regiseter" : "login"}
          >
            {regiseter ? "Create Account" : "Login"}
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
