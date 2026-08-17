import { createBrowserRouter } from "react-router-dom";

import Error from "../pages/Error";
import Registeruser from "../pages/Registeruser";
import Signinpage from "../pages/Signinpage";
import RegisterFoodpartner from "../pages/RegisterFoodpartner";
import Signinfoodpartner from "../pages/Signinfoodpartner";
import Home from "../pages/Home";
import Upload from "../pages/Upload";
import Account from "../pages/Account";

export const Approuter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },

  // USER
  {
    path: "/register",
    element: <Registeruser />,
  },
  {
    path: "/signin",
    element: <Signinpage />,
  },

  // FOOD PARTNER
  {
    path: "/foodpartner/register",
    element: <RegisterFoodpartner />,
  },
  {
    path: "/foodpartner/signin",
    element: <Signinfoodpartner />,
  },
  {
    path:"/foodpartner/upload",
    element:<Upload/>
  },
  {
   path:"/account",
   element:<Account/>
  },
  {
    path: "*",
    element: <Error />,
  },
]);

export default Approuter;