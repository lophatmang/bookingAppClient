import { configureStore, createSlice } from "@reduxjs/toolkit";
import swal from "sweetalert";

export const quantitySlice = createSlice({
  name: "quantity",
  initialState: { adult: 1, children: 0, room: 1 },
  reducers: {
    changAdult(state, action) {
      state.adult += action.payload;
    },
    changChildren(state, action) {
      state.children += action.payload;
    },
    changRoom(state, action) {
      state.room += action.payload;
    },
  },
});

export const userSlice = createSlice({
  name: "user",
  initialState: { user: "" },
  reducers: {
    onLogin(state, action) {
      state.user = action.payload;
      localStorage.setItem("currentUser", JSON.stringify(state.user));
    },
    onLogout(state) {
      swal("Đăng xuất thành công", "Bạn đã đăng xuất tài khoản", "success");
      state.user = "";
      localStorage.removeItem("currentUser");
    },
  },
});

export const store = configureStore({
  reducer: {
    quantity: quantitySlice.reducer,
    user: userSlice.reducer,
  },
});
