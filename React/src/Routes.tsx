import { RouteObject } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import PurchasePage from "./pages/PurchasePage";

const Routes: RouteObject[] = [
  {
    children: [
        { path: "/", element: <LoginPage /> },
        { path: "/purchase", element: <PurchasePage /> },
    ],
  },
];

export default Routes;
