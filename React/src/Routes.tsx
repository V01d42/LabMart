import { RouteObject } from "react-router-dom";
import PurchasePage from "./pages/PurchasePage";
import SigninPage from "./pages/SigninPage";
import AdminPage from "./pages/AdminPage";

const Routes: RouteObject[] = [
  {
    children: [
      { path: "/", element: <SigninPage /> },
      { path: "/purchase", element: <PurchasePage /> },
      { path: "/admin", element: <AdminPage /> },
    ],
  },
];

export default Routes;
