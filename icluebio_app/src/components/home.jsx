import React from "react";
import { Link } from "react-router-dom";
import LoginButton from "./login_button";

const Home = (props) => (
  <>
    <header>icluebio APP</header>
    <Link to="/lunch">
      <button>Lunch Time!</button>
    </Link>
    <LoginButton setUserName={props.setUserName} userName={props.userName} />
  </>
);

export default Home;
