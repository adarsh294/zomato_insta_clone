import { createBrowserRouter } from "react-router-dom";

import Error from "../pages/Error";
import Registeruser from "../pages/Registeruser";
import Signinpage from "../pages/Signinpage";
import ProtectedRoute from "../pages/ProtectedRoute";
import RegisterFoodpartner from "../pages/RegisterFoodpartner";
import Signinfoodpartner from "../pages/Signinfoodpartner";
import Home from "../pages/Home";
import Upload from "../pages/Upload";
import Account from "../pages/Account";
import Page from "../pages/Page";
import Save from "../pages/Save";
import Useraccount from "../pages/Useraccount";
import Userreel from "../pages/Userreel";

export const Approuter = createBrowserRouter([
 {
  path:"/register",
  element: <Registeruser/>
 },
 {
  path:"/signinuser",
  element:<Signinpage/>
 },
 {
  path:"/signinpartner",
  element:<Signinfoodpartner/>
 },
 {
  path:"/registerpartner",
  element:<RegisterFoodpartner/>
 },
 {
    element: <ProtectedRoute />,
    children: [

        {
            path: "/reel",
            element: <Home />,
        },

        {
            path: "/savereel",
            element: <Save />,
        },

        {
            path: "/",
            element: <Page />,
        },

        {
            path: "/foodpartner/upload",
            element: <Upload />,
        },

        {
            path: "/account/:foodPartnerId",
            element: <Account />,
        },
        {
            path:"/useraccount/:userid",
            element:<Useraccount/>
        },{
            path:"/foodpartnerreel/:reelbyid",
            element:<Userreel/>
        }

    ],
},
  {
    path: "*",
    element: <Error />,
  },
]);

export default Approuter;