import React from "react";
import s from "./Header.module.css";
import logo from "../../../images/tod.webp";
import { NavLink } from "react-router-dom";

type PropType = {};

const Header: React.FC = (props: PropType) => {
 
  return (
    <div className={s.header}>
      <div className={s.headerLogo}>
        <img src={logo} alt="" />
      </div>

      <div className={s.headerMenu}>
        <div className={s.headerMenuItem}>
          {/* <NavLink to="/todolists">Todolists</NavLink> */}
          <p>Todolists</p>
        </div>

        {/* <div className={s.headerMenuItem}>
          <NavLink to="weather">Weather</NavLink>
        </div> */}
      </div>

      <div className={s.headerButton}>
        <button className={s.headerButtonUser}>aleks2198@gmail.com</button>
        <NavLink to="/login">
          <button
            className={s.headerButtonLog}
            // onClick={logout}
          >
            {/* <NavLink to="/login">Log out</NavLink> */}
            Log out
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default Header;
