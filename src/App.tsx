import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup"
import ProfilePage from "./components/ProfilePage/ProfilePage"

const App = () => {
  return (
    <div className="app">
      <Routes>
        {/* <Route path="/" element={<ProfileContainer />} exact/> */}
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<ProfilePage />} />

        {/* <Route path="*" render={() => <div>404 NOT FOUND</div>} /> */}
      </Routes>
    </div>
  );
};

export default App;
