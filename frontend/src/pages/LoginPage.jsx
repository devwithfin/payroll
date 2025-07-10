import React, { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";

const LoginPage = () => {
  const { handleLogin } = useAuth();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (num) => String(num).padStart(2, "0");
  const formattedTime = `${formatTime(time.getHours())}:${formatTime(
    time.getMinutes()
  )}:${formatTime(time.getSeconds())}`;

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: "linear-gradient(135deg, #eef2f3, #8e9eab)",
        fontFamily: "'Segoe UI', sans-serif",
      }}
    >
      <div
        className="card p-4 shadow"
        style={{
          maxWidth: "440px",
          width: "100%",
          borderRadius: "16px",
          border: "none",
          background: "#ffffffdd",
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="text-center mb-3">
          <img
            src="/images/logo.png"
            alt="HRIS Logo"
            style={{ width: "64px", height: "64px", objectFit: "contain" }}
          />
          <h2 className="mt-2 mb-0 fw-semibold">HRIS</h2>
          <small className="text-muted">
            Human Resource Information System
          </small>
        </div>

        {/* Jam Real-time */}
        <div
          className="text-center mb-4"
          style={{
            fontSize: "36px",
            fontWeight: "bold",
            color: "#1f1f1f",
            letterSpacing: "2px",
          }}
        >
          {formattedTime}
        </div>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <input
              type="email"
              name="username"
              autoComplete="off"
              className="form-control py-3"
              placeholder="Enter Your Email..."
              required
              style={{
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              name="password"
              autoComplete="off"
              className="form-control py-3"
              placeholder="Enter Your Password..."
              required
              style={{
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            />
          </div>
          <button
            type="submit"
            className="btn w-100 fw-medium mt-3"
            style={{
              backgroundColor: "#1071b9",
              color: "#fff",
              padding: "12px",
              borderRadius: "8px",
              fontSize: "16px",
            }}
          >
            Log In
          </button>
        </form>

        <div className="text-center mt-4">
          <small className="text-muted">
            © 2025 HRIS. All rights reserved.
          </small>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
