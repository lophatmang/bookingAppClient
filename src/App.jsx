import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home/Home";
import Detail from "./pages/detail/Detail";
import Search from "./pages/search/Search";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import PageNotFound from "./pages/pageNotFound/PageNotFound";
import Login from "./pages/login/Login";
import Layout from "./pages/home/layout/layout";
import City from "./pages/home/City";
import { loaderCity } from "./api/Api";
import BookHotel from "./pages/bookHotel/BookHotel";
import Transaction from "./pages/transaction/Transaction";

library.add(fas);

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        element: <Home />,
        children: [
          {
            path: "/",
            element: <City />,
            loader: loaderCity,
          },
        ],
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        element: <Detail />,
        children: [
          {
            path: "/detail/:hotelId",
            element: <BookHotel />,
          },
        ],
      },
      {
        path: "/transaction",
        element: <Transaction />,
      },
      {
        path: "*",
        element: <PageNotFound />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
