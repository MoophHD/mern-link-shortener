import React, { useState, useEffect, useContext } from "react";
import useHttp from "../hooks/http.hook";
import useMessage from "../hooks/message.hook";
import AuthContext from "../context/auth.context";

const AuthPage = () => {
  const auth = useContext(AuthContext);
  const message = useMessage();
  const { loading, error, request, clearError } = useHttp();
  const [form, setForm] = useState({ email: "", password: "" });

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleRegister = async (event) => {
    try {
      const data = await request("/auth/register", "POST", { ...form });
      message(data.message);
    } catch (e) {}
  };

  const handleLogin = async (event) => {
    try {
      const data = await request("/auth/login", "POST", { ...form });
      message(data.message);
      auth.login(data.token, data.userId);
    } catch (e) {}
  };

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h3>Shorten your link</h3>
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Authorisation</span>

            <div>
              <div className="input-field">
                <input
                  placeholder="Create an email"
                  id="email"
                  type="email"
                  name="email"
                  className="input-yellow"
                  onChange={handleChange}
                  value={form.email}
                />
                <label htmlFor="email">Email</label>
              </div>

              <div className="input-field">
                <input
                  placeholder="Create a password"
                  id="password"
                  type="password"
                  name="password"
                  className="input-yellow"
                  onChange={handleChange}
                  value={form.password}
                />
                <label htmlFor="password">Password</label>
              </div>
            </div>
          </div>
          <div className="card-action">
            <button
              onClick={handleLogin}
              className="btn yellow darken-4"
              style={{ marginRight: 10 }}
              disabled={loading}
            >
              Sign in
            </button>
            <button
              onClick={handleRegister}
              className="btn grey lighten-1 black-text"
              disabled={loading}
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
