import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { searchactivetab } from "../redux/tabs";
import axios from "axios";

const ProtectedRoute = () => {

    const [loading, setLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [rseponoce, setrseponoce] = useState({});
    const dispatch=useDispatch();
    useEffect(() => {

        axios.get(
            "http://localhost:3000/api/user/checkauth",
            {
                withCredentials: true
            }
        )
        .then((response) => {

            console.log(response.data);
            setIsLoggedIn(true);
            dispatch(searchactivetab(response.data))

        })
        .catch((error) => {

            console.log(error.response?.data);
            setIsLoggedIn(false);

        })
        .finally(() => {

            setLoading(false);
        });

    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!isLoggedIn) {
        return <Navigate to="/register" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;