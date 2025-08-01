import styles from "./Navigation.module.css";
import { Link } from "react-router-dom";

const Navigation = () => {
  const brandStyles = {
    color: "#fff",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "22px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  };

  const EchomeetLogo = {
    width: "25px",
    height: "35px",
  };

  return (
    <nav className={`${styles.navbar} container`}>
      <Link to="/" style={brandStyles}>
        <img
          src="/images/Echomeet icon.png"
          alt="echomeet pic"
          style={EchomeetLogo}
        ></img>
        <span>EchoMeet</span>
      </Link>
    </nav>
  );
};

export default Navigation;
