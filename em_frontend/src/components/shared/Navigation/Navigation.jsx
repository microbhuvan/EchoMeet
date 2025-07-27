import "./Navigation.module.css";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="container">
      <Link to="/">
        <img src="/images/Echomeet icon.png" alt="echomeet pic"></img>
        <span>EchoMeet</span>
      </Link>
    </nav>
  );
};

export default Navigation;
