// routers/protectedroute
import { useEffect, useRef, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { isTokenValid, parseJwt, clearAuthData } from "../utils/authToken";

const ProtectedRoute = ({ allowedRoles }) => {
  const [authorized, setAuthorized] = useState(null);
  const [redirect, setRedirect] = useState(null);
  const location = useLocation();
  const timerRef = useRef();

  useEffect(() => {
    const check = async () => {
      const token = localStorage.getItem("token");
      if (!isTokenValid(token)) {
        clearAuthData();
        await Swal.fire({
          icon: "warning",
          title: "Session Expired",
          text: "Please login again.",
        });
        setRedirect("/");
        return;
      }

      const decoded = parseJwt(token);
      const role = decoded?.role;

      if (!allowedRoles.includes(role)) {
        await Swal.fire({
          icon: "error",
          title: "Access Denied",
          text: "You are not authorized.",
        });
        setRedirect("/");
        return;
      }

      const timeLeft = (decoded.exp - Math.floor(Date.now() / 1000)) * 1000;
      timerRef.current = setTimeout(() => {
        clearAuthData();
        Swal.fire({
          icon: "warning",
          title: "Session Expired",
          text: "Please login again.",
        }).then(() => setRedirect("/"));
      }, timeLeft);

      setAuthorized(true);
    };

    check();

    return () => clearTimeout(timerRef.current);
  }, [allowedRoles]);

  if (redirect) return <Navigate to={redirect} state={{ from: location }} replace />;
  if (authorized === null)
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <div className="spinner-border text-primary" />
      </div>
    );

  return <Outlet />;
};

export default ProtectedRoute;
