import { RouteObject } from "react-router-dom";
import PurchasePage from "./pages/PurchasePage";
import SigninPage from "./pages/SigninPage";
import AdminPage from "./pages/AdminPage";
import AddProductsPage from "./pages/AddProductsPage";
import CheckProductsPage from "./pages/CheckProductsPage";

const Routes: RouteObject[] = [
  {
    children: [
      { path: "/", element: <SigninPage /> },
      { path: "/purchase", element: <PurchasePage /> },
      { path: "/admin", element: <AdminPage /> },
      { path: "/admin/add-products", element: <AddProductsPage /> },
      { path: "/admin/check-products", element: <CheckProductsPage /> },
    ],
  },
];

export default Routes;
