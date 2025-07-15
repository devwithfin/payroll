// provider/auth
import { useState, useEffect, useCallback } from "react";
import { AuthContext } from "../contexts/AuthContext";
import API from "../libs/axiosInstance";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async () => {
    try {
      const res = await API.get("/auth/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUser(res.data.user);
    } catch (err) {
      console.error("Fetch profile failed:", err);
      localStorage.removeItem("token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetchProfile();
    } else {
      setLoading(false);
    }
  }, [fetchProfile]);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, fetchProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
