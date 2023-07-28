import React from "react";
import s from "./ProfilePage.module.css";
import Header from "./Header/Header";
import Todolists from "./Todolists/Todolists";

type PropType = {};

const ProfilePage: React.FC = (props: PropType) => {
  return (
    <div className={s.profile}>
      <Header />
      <Todolists />
    </div>
  );
};

export default ProfilePage;
