import styles from "./Card.module.css";

const Card = ({ title, icon, children, logoDim }) => {
  return (
    <div className={styles.card}>
      <div className={styles.headWrapper}>
        <img src={`/images/${icon}`} alt="echomeet logo" style={logoDim} />
        <h1 className={styles.heading}>{title}</h1>
      </div>
      {children}
    </div>
  );
};

export default Card;
