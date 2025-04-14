import React, { useContext, useEffect, useState } from "react";
import "./style.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { LuSearch } from "react-icons/lu";
import { RxHamburgerMenu } from "react-icons/rx";
import { GrFavorite } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
import { IoSunny } from "react-icons/io5";
import { MdOutlineDarkMode } from "react-icons/md";
import { HiOutlineHome } from "react-icons/hi2";
import { ThemeContext } from "../../context/themeContext";
import { searchContext } from "../../context/searchContext";
import Cookies from "js-cookie";

const Header = () => {
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const { toggle, theme } = useContext(ThemeContext);
  const { setQuery } = useContext(searchContext);

  const navigate = useNavigate();

  useEffect(() => {
    const jwtToken = Cookies.get("jwtToken");
    if (!jwtToken) {
      navigate("/login");
    }
  }, []);

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      setQuery(searchInput);
      setSearchInput("");
      navigate("/");
    }
  };

  const handleSearch = () => {
    setQuery(searchInput);
    setSearchInput("");
    navigate("/");
  };

  return (
    <>
      <nav className="header">
        <h1
          onClick={() => {
            navigate("/");
            setQuery("");
          }}
        >
          <span className="pop">Ticket</span>
          <span className="tickets">Flix</span>
        </h1>

        <button onClick={() => setMenu(!menu)} className="menuButton">
          <RxHamburgerMenu />
        </button>

        {menu && (
          <ul className="menu">
            <li data-tooltip="Toggle Theme">
              {theme === "dark" ? (
                <IoSunny onClick={toggle} />
              ) : (
                <MdOutlineDarkMode onClick={toggle} />
              )}
            </li>
            <li
              data-tooltip="Home"
              onClick={() => {
                navigate("/");
                setQuery("");
              }}
            >
              <HiOutlineHome />
            </li>
            <li data-tooltip="Search">
              <LuSearch onClick={() => setSearch(!search)} />
            </li>
            <li data-tooltip="Favorites">
              <GrFavorite onClick={() => navigate("/savedmovies")} />
            </li>
            <li data-tooltip="Profile">
              <CgProfile onClick={() => navigate("/profile")} />
            </li>
          </ul>
        )}

        <div className="searchIconsContainer">
          <div className="searchContainer">
            <input
              type="text"
              placeholder="Search movies..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyUp={handleEnter}
            />
            <button onClick={handleSearch}>
              <LuSearch />
            </button>
          </div>

          <ul className="menuItems">
            <li className="item" data-tooltip="Toggle Theme">
              {theme === "dark" ? (
                <IoSunny onClick={toggle} />
              ) : (
                <MdOutlineDarkMode onClick={toggle} />
              )}
            </li>
            <li
              className="item"
              data-tooltip="Home"
              onClick={() => {
                navigate("/");
                setQuery("");
              }}
            >
              <HiOutlineHome />
            </li>
            <li className="item" data-tooltip="Favorites">
              <GrFavorite onClick={() => navigate("/savedmovies")} />
            </li>
            <li className="item" data-tooltip="Profile">
              <CgProfile onClick={() => navigate("/profile")} />
            </li>
          </ul>
        </div>
      </nav>

      {search && (
        <div className="search">
          <input
            placeholder="Search movies..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyUp={handleEnter}
          />
          <button onClick={handleSearch}>
            <LuSearch />
          </button>
        </div>
      )}
    </>
  );
};

export default Header;
