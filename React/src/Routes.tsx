import { RouteObject } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import PurchasePage from "./pages/PurchasePage";
import SigninPage from "./pages/SigninPage";

const Routes: RouteObject[] = [
  {
    children: [
        { path: "/", element: <SigninPage /> },
        { path: "/purchase", element: <PurchasePage /> },
    ],
  },
];

export default Routes;
