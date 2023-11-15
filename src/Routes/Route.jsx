import { useRoutes } from "react-router-dom";
import HomePage from "../HomePage/HomePage";
import ShoeDetails from "../ShoeDetails/ShoeDetails";

export const Routes = () => {
  const routes = useRoutes([
    { path: "/", element: <HomePage /> },
    { path: "/shoe/:shoeId", element: <ShoeDetails /> },
    // ... other routes
  ]);

  return routes;
};
