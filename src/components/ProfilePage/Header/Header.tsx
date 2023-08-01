import React, { useEffect, useState } from "react";
import s from "./Header.module.css";
import logo from "../../../images/tod.webp";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../api/firebase";
import { signOut } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";

type PropType = {};

const Header: React.FC = (props: PropType) => {
  const navigate = useNavigate();

  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>("");

  const logoutHandler = () => {
    signOut(auth)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUserEmail(user.email);
      } else {
        console.log("user is logged out");
      }
    });
  }, [currentUserEmail]);

  return (
    <div className={s.header}>
      <div className={s.headerLogo}>
        <img src={logo} alt="" />
      </div>

      <div className={s.headerMenu}>
        <div className={s.headerMenuItem}>
          <p>Todolists</p>
        </div>
      </div>

      <div className={s.headerButton}>
        <button className={s.headerButtonUser}>{currentUserEmail}</button>
        <button className={s.headerButtonLog} onClick={logoutHandler}>
          Log out
        </button>
      </div>
    </div>
  );
};

export default Header;
