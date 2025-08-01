import "./Home.module.css";
import styles from "./Home.module.css";
import { Link, useNavigate } from "react-router-dom";
import Card from "../../components/shared/Card/Card";
import Button from "../../components/shared/Button/Button";

const Home = () => {
  const description = `A lightweight video calling \nplatform built for seamless \npeer-to-peer communication.`;

  const navigate = useNavigate();

  function startRegister() {
    navigate("/auth");
  }

  const logoDim = {
    width: "25px",
    height: "35px",
  };

  return (
    <div className={styles.cardWrapper}>
      <Card
        title="Welcome to Echomeet"
        icon="Echomeet icon.png"
        logoDim={logoDim}
      >
        <pre className={styles.text}>{description}</pre>
        <div>
          <Button onClick={startRegister} text="Let's get started"></Button>
        </div>
        <div>
          <span>Have an Invite Text? </span>
          <Link to="/login" className={styles.logInText}>
            {" "}
            Log in
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default Home;
