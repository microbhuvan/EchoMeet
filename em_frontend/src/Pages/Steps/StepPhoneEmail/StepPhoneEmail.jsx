import { useState } from "react";
import styles from "./StepPhoneEmail.module.css";

import Email from "./Email/Email";
import Phone from "./Phone/Phone";

const phoneEmailMap = {
  phone: Phone,
  email: Email,
};

const StepPhoneEmail = ({ onNext }) => {
  const [type, setType] = useState("phone");
  const Component = phoneEmailMap[type];

  const phoneLogo = {
    height: "40px",
    width: "25px",
  };

  const emailLogo = {
    height: "35px",
    width: "40px",
  };

  return (
    <div className={styles.cardWrapper}>
      <div className={styles.buttonWrapper}>
        <button
          className={`${styles.tabButton} ${
            type === "phone" ? styles.active : ""
          }`}
          onClick={() => setType("phone")}
        >
          <img
            src="/images/phone_logo.png"
            alt="phone logo"
            style={phoneLogo}
          />
        </button>
        <button
          className={`${styles.tabButton} ${
            type === "email" ? styles.active : ""
          }`}
          onClick={() => setType("email")}
        >
          <img
            src="/images/Email_icon.png"
            alt="email icon"
            style={emailLogo}
          />
        </button>
      </div>
      <Component onNext={onNext}>next</Component>
    </div>
  );
};

export default StepPhoneEmail;
