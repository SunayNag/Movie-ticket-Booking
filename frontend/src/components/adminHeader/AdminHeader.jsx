import React, { useContext, useEffect, useState } from "react";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { MdMovieEdit, MdOutlineDarkMode } from "react-icons/md";
import { IoSunny, IoAddCircleOutline } from "react-icons/io5";
import { HiOutlineHome } from "react-icons/hi2";
import { FaMasksTheater } from "react-icons/fa6";
import Cookies from "js-cookie";
import { ThemeContext } from "../../context/themeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const [menu, setMenu] = useState(false);
  const { toggle, theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  useEffect(() => {
    const adminToken = Cookies.get("adminJwtToken");
    if (!adminToken) {
      navigate("/admin/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    Cookies.remove("adminJwtToken");
    navigate("/admin/login");
  };

  return (
    <nav className="adminHeader">
      <h1 onClick={() => navigate("/admin")} className="brand">
        <span className="red">Ticket</span>
        <span className="yellow">Flix</span>
      </h1>

      <button onClick={() => setMenu(!menu)} className="menuButton">
        <RxHamburgerMenu />
      </button>

      {menu && (
        <ul className="menu">
          <li className="tooltipWrapper" data-tooltip="Toggle Theme">
            {theme === "dark" ? (
              <IoSunny onClick={toggle} />
            ) : (
              <MdOutlineDarkMode onClick={toggle} />
            )}
          </li>
          <li className="tooltipWrapper" data-tooltip="Home">
            <HiOutlineHome onClick={() => navigate("/admin")} />
          </li>
          <li className="tooltipWrapper" data-tooltip="Add Movie">
            <MdMovieEdit onClick={() => navigate("/admin/addmovie")} />
          </li>
          <li className="tooltipWrapper" data-tooltip="Add Show">
            <IoAddCircleOutline onClick={() => navigate("/admin/addshow")} />
          </li>
          <li className="tooltipWrapper" data-tooltip="Add Theatre">
            <FaMasksTheater onClick={() => navigate("/admin/addtheatre")} />
          </li>
          <li className="tooltipWrapper" data-tooltip="Logout">
            <button className="logoutButton" onClick={handleLogout}>
              <FontAwesomeIcon icon={faSignOutAlt} />
            </button>
          </li>
        </ul>
      )}

      <div className="searchIconsContainerAdmin">
        <ul className="menuItems">
          <li className="tooltipWrapper item" data-tooltip="Toggle Theme">
            {theme === "dark" ? (
              <IoSunny onClick={toggle} />
            ) : (
              <MdOutlineDarkMode onClick={toggle} />
            )}
          </li>
          <li className="tooltipWrapper item" data-tooltip="Home">
            <HiOutlineHome onClick={() => navigate("/admin")} />
          </li>
          <li className="tooltipWrapper item" data-tooltip="Add Movie">
            <MdMovieEdit onClick={() => navigate("/admin/addmovie")} />
          </li>
          <li className="tooltipWrapper item" data-tooltip="Add Show">
            <IoAddCircleOutline onClick={() => navigate("/admin/addshow")} />
          </li>
          <li className="tooltipWrapper item" data-tooltip="Add Theatre">
            <FaMasksTheater onClick={() => navigate("/admin/addtheatre")} />
          </li>
          <li className="tooltipWrapper item" data-tooltip="Logout">
            <button className="logoutButton" onClick={handleLogout}>
              <FontAwesomeIcon icon={faSignOutAlt} />
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
