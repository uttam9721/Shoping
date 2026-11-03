import React, { useContext, useState } from "react";
import AppContext from "../../context/AppContext";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const { login } = useContext(AppContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const { email, password } = formData;

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg("Please fill in both email and password.");
      return;
    }
    setErrorMsg("");
    setLoading(true);

    try {
      const result = await login(email, password);
      if (result && result.success) {
        navigate("/");
      } else {
        setErrorMsg(result?.message || "Invalid credentials. Please try again.");
      }
    } catch (err) {
      setErrorMsg("An unexpected error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-avatar">
            <span className="material-symbols-outlined" style={{ fontSize: "2rem" }}>
              lock_open
            </span>
          </div>
          <h2 className="auth-title">Welcome Back</h2>
          <p className="auth-subtitle">Sign in to your Shopkart account to continue</p>
        </div>

        {errorMsg && (
          <div
            style={{
              background: "rgba(239, 68, 68, 0.15)",
              border: "1px solid rgba(239, 68, 68, 0.3)",
              color: "#f87171",
              padding: "0.75rem 1rem",
              borderRadius: "var(--radius-md)",
              fontSize: "0.88rem",
              marginBottom: "1.25rem",
              textAlign: "center",
            }}
          >
            {errorMsg}
          </div>
        )}

        <form onSubmit={submitHandler}>
          <div className="form-group-modern">
            <label htmlFor="loginEmail">Email Address</label>
            <div className="input-with-icon">
              <span className="material-symbols-outlined input-icon">mail</span>
              <input
                id="loginEmail"
                name="email"
                value={email}
                onChange={onChangeHandler}
                type="email"
                required
                className="modern-input"
                placeholder="name@example.com"
              />
            </div>
          </div>

          <div className="form-group-modern">
            <label htmlFor="loginPassword">Password</label>
            <div className="input-with-icon">
              <span className="material-symbols-outlined input-icon">key</span>
              <input
                id="loginPassword"
                name="password"
                value={password}
                onChange={onChangeHandler}
                type="password"
                required
                className="modern-input"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn-auth-submit"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In to Account"}
          </button>
        </form>

        <div className="auth-footer">
          Don't have an account?
          <Link to="/register">Create one here</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;