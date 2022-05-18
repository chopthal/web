import { React, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/home";
import LunchMain from "./components/lunch_main";

const RouterMain = (props) => {
  const [userName, setUserName] = useState("");
  return (
    <Routes>
      <Route
        path="/"
        element={<Home userName={userName} setUserName={setUserName} />}
      />
      <Route path="/lunch" element={<LunchMain />} />
    </Routes>
  );
};

export default RouterMain;
