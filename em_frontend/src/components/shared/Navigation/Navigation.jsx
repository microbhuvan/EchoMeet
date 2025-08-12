import { logout } from "../../../http";
import styles from "./Navigation.module.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../../../store/authSlice";

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

  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.authSlice);

  async function logoutUser() {
    try {
      const { data } = await logout();
      dispatch(setAuth(data));
    } catch (err) {
      console.log(err);
    }
  }

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
      {isAuth && <button onClick={logoutUser}>Logout</button>}
    </nav>
  );
};

export default Navigation;
