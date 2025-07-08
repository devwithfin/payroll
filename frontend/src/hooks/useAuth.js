// hooks/useAuth.js
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { login, logout } from "../services/authService";

export default function useAuth() {
  const navigate = useNavigate();

  const handleLogin = useCallback(async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    try {
      const { data } = await login(username, password);

      const role = data.user.role; 
      
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.user.username);
      localStorage.setItem("role", role);

      let redirectPath = "/";
      if (role === "HR") redirectPath = "/hr/dashboard";
      else if (role === "Finance") redirectPath = "/finance/dashboard";
      else if (role === "Employee") redirectPath = "/employee/dashboard";

      Swal.fire({
        icon: "success",
        title: "Login Successfully!",
        text: "Welcome back!",
        timer: 1000,
        showConfirmButton: false,
        timerProgressBar: true,
        willClose: () => {
          navigate(redirectPath);
        }
      });

    } catch (error) {
      const message = error.response?.data?.message || "Please try again!";
      Swal.fire({
        icon: "error",
        title: "Failed to Login",
        text: message,
      });
    }
  }, [navigate]);

  const handleLogout = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      await logout(token);
      localStorage.clear();
      Swal.fire({
        icon: "success",
        title: "Logout Successful",
        text: "See you again!",
        timer: 1000,
        showConfirmButton: false,
      }).then(() => {
        navigate("/");
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Logout Failed",
        text: error.response?.data?.message || "Please try again!",
      });
    }
  }, [navigate]);

  return { handleLogin, handleLogout };
}
