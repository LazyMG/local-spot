import { Reset } from "styled-reset";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Home from "./routes/Home";
import Map from "./routes/Map";
import Login from "./routes/Login";
import CreateAccount from "./routes/Create-Account";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/map/:placeId",
        element: <Map />,
      },
    ],
  },
  {
    path: "/login",
    children: [
      {
        path: "",
        element: <Login />,
      },
    ],
  },
  {
    path: "/create-account",
    children: [
      {
        path: "",
        element: <CreateAccount />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <Reset />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
