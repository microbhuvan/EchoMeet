import styles from "./Card.module.css";

const Card = ({ title, icon, children }) => {
  const EchomeetLogo = {
    width: "25px",
    height: "35px",
  };
  return (
    <div className={styles.card}>
      <div className={styles.headWrapper}>
        <img src={`/images/${icon}`} alt="echomeet logo" style={EchomeetLogo} />
        <h1 className={styles.heading}>{title}</h1>
      </div>
      {children}
    </div>
  );
};

export default Card;
