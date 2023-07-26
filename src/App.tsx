import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";

const App = () => {
  return (
    <div className="app">
      <Routes>
        {/* <Route path="/" element={<ProfileContainer />} exact/> */}
        <Route path="/login" element={<Login />} />

        {/* <Route path="*" render={() => <div>404 NOT FOUND</div>} /> */}
      </Routes>
    </div>
  );
};

export default App;
