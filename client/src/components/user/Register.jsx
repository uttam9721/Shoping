import React, { useContext, useState } from "react";
import AppContext from "../../context/AppContext";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const { register } = useContext(AppContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const { name, email, password } = formData;

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    if (password.length < 4) {
      setError("Password must be at least 4 characters long.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const result = await register(name, email, password);
      if (result && result.success) {
        navigate("/login");
      } else {
        setError(result?.message || "Registration failed. Email might already exist.");
      }
    } catch (err) {
      setError("An unexpected error occurred during registration.");
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
              person_add
            </span>
          </div>
          <h2 className="auth-title">Create Account</h2>
          <p className="auth-subtitle">Join Shopkart to explore next-gen technology</p>
        </div>

        {error && (
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
            {error}
          </div>
        )}

        <form onSubmit={submitHandler}>
          <div className="form-group-modern">
            <label htmlFor="regName">Full Name</label>
            <div className="input-with-icon">
              <span className="material-symbols-outlined input-icon">badge</span>
              <input
                id="regName"
                name="name"
                value={name}
                onChange={onChangeHandler}
                type="text"
                required
                className="modern-input"
                placeholder="John Doe"
              />
            </div>
          </div>

          <div className="form-group-modern">
            <label htmlFor="regEmail">Email Address</label>
            <div className="input-with-icon">
              <span className="material-symbols-outlined input-icon">mail</span>
              <input
                id="regEmail"
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
            <label htmlFor="regPassword">Password</label>
            <div className="input-with-icon">
              <span className="material-symbols-outlined input-icon">key</span>
              <input
                id="regPassword"
                name="password"
                value={password}
                onChange={onChangeHandler}
                type="password"
                required
                className="modern-input"
                placeholder="At least 4 characters"
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn-auth-submit"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Shopkart Account"}
          </button>
        </form>

        <div className="auth-footer">
          Already have an account?
          <Link to="/login">Sign in here</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
