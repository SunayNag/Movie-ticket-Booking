import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import Cookie from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "../style.scss";
import axios from "axios";
import { render } from "../../host";

const Login = () => {
  const [userData, setUserData] = useState({
    password: "",
    email: "",
  });

  const [showPass, setShowPass] = useState(false);

  const navigate = useNavigate();

  const onChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const toastOptions = {
    position: "bottom-right",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
    closeOnClick: true,
  };

  const handleValidation = () => {
    const { name, password } = userData;
    if (name === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = userData;

    if (handleValidation()) {
      const host = `${render}/api/auth/login`;

      const response = await axios.post(host, {
        email,
        password,
      });

      const { data } = response;

      if (data.status) {
        localStorage.setItem("user", JSON.stringify(data.userData));
        Cookie.set("jwtToken", data.jwtToken, { expires: 9 });
        setUserData({
          password: "",
          email: "",
        });
        navigate("/");
      } else {
        toast.error(data.msg, toastOptions);
      }
    }
  };

  const onShowPass = () => {
    setShowPass((prev) => !prev);
  };

  return (
    <div className="loginContainer">
      <form onSubmit={handleSubmit} className="formContainer">
        <h1>
          <span className="pop">Ticket</span>
          <span className="tickets">Flix</span>
        </h1>
        <p className="loginTitle">Login</p>
        <div className="inputContainer">
          <label htmlFor="email" className="name">
            Email
          </label>
          <input
            name="email"
            id="email"
            type="email"
            placeholder="Enter your email"
            className="input"
            value={userData.email}
            onChange={onChange}
          />
        </div>

        <div className="inputContainer">
          <label htmlFor="pass" className="name">
            Password
          </label>
          <input
            name="password"
            id="pass"
            type={showPass ? "text" : "password"}
            placeholder="Enter your password"
            className="input"
            value={userData.password}
            onChange={onChange}
          />
        </div>
        <div className="checkbox">
          <input
            value={showPass}
            onChange={onShowPass}
            id="check"
            type="checkbox"
          />
          <label htmlFor="check">Show Password</label>
        </div>
        <button type="submit">Submit</button>
        <p>
          Create an account
          <Link style={{ textDecoration: "none" }} to={"/register"}>
            <span>Register</span>
          </Link>
        </p>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
