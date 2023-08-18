import React, { useEffect } from "react";
import s from "./ProfilePage.module.css";
import Header from "./Header/Header";
import Todolists from "./Todolists/Todolists";
import { useSelector } from "react-redux";
import { AppReducerType } from "../../redux/store";
import Preloader from "../../common/Preloader/Preloader";

type PropType = {};

const ProfilePage: React.FC = (props: PropType) => {
  const isAuth: boolean = useSelector(
    (state: AppReducerType) => state.app.isAuth
  );

  useEffect(() => {
    // console.log(isAuth);
  }, [isAuth]);

  return (
    <div className={s.profile}>
      {isAuth ? (
        <>
          <Header />
          <Todolists />
        </>
      ) : (
        <Preloader />
      )}
    </div>
  );
};

export default ProfilePage;
