import "./Home.module.css";
import styles from "./Home.module.css";
import { Link } from "react-router-dom";
import Card from "../../components/shared/Card/Card";

const Home = () => {
  const description = `A lightweight video calling \nplatform built for seamless \npeer-to-peer communication.`;

  return (
    <div className={styles.cardWrapper}>
      <Card title="Welcome to Echomeet" icon="Echomeet icon.png">
        <pre className={styles.text}>{description}</pre>
        <div>
          <span>Have an Invite Text? </span>
          <Link to="/login"> Sign in</Link>
        </div>
      </Card>
    </div>
  );
};

export default Home;
