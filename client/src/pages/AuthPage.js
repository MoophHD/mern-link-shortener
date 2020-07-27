import React, {useState} from "react";
import useHttp from "../hooks/http.hook";

const AuthPage = () => {
  const { loading, error, request, clearError } = useHttp();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleRegister = async (event) => {
    try {
      const data = await request("/auth/register", "POST", { ...form });

      console.log(`Data`, data);
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
                />
                <label htmlFor="password">Password</label>
              </div>
            </div>
          </div>
          <div className="card-action">
            <button
              disabled={loading}
              className="btn yellow darken-4"
              style={{ marginRight: 10 }}
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
