import styles from "./Button.module.css";

const Button = ({ text, onClick }) => {
  const arrowLogo = {
    width: "20px",
    height: "8px",
  };

  return (
    <button onClick={onClick} className={styles.button}>
      <span>{text}</span>
      <img src="/images/Arrow.png" alt="arrow" style={arrowLogo}></img>
    </button>
  );
};

export default Button;
