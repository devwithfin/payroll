// hooks/use-auth
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { login } from "../services/authService";
import API from "../libs/axiosInstance";
import { useAuthContext } from "../contexts/AuthContext";

const MySwal = withReactContent(Swal);

export default function useAuth() {
  const navigate = useNavigate();
  const { setUser, fetchProfile } = useAuthContext();

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const { data } = await login(email, password);
      const role = data.user.role;

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", role);

      await fetchProfile();

      await MySwal.fire({
        icon: "success",
        title: "Login Successful",
        html: "Welcome back!",
        showConfirmButton: false,
        timer: 1200,
        timerProgressBar: true,
        background: "#f0f9ff",
        color: "#333",
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const redirectMap = {
        HR: "/hr/dashboard",
        Finance: "/finance/dashboard",
        Employee: "/employee/dashboard",
      };

      navigate(redirectMap[role] || "/");
    } catch (err) {
      const message =
        err.response?.data?.message || "Incorrect email or password";

      MySwal.fire({
        icon: "error",
        title: "Login Failed",
        text: message,
        confirmButtonColor: "#1071b9",
      });
    }
  };

  const handleLogout = async () => {
    try {
      await API.post("/auth/logout", null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    } catch (error) {
      console.error("Logout error:", error);
    }

    await MySwal.fire({
      icon: "success",
      title: "Logout Successful",
      text: "See you again!",
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      background: "#f8fafc",
      color: "#333",
    });

    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return { handleLogin, handleLogout };
}
