import { useState } from "react";
import styles from "./Phone.module.css";

import Card from "../../../../components/shared/Card/Card";
import Button from "../../../../components/shared/Button/Button";
import TextInput from "../../../../components/shared/TextInput/TextInput";

const Phone = ({ onNext }) => {
  const [phoneNumber, setPhoneNumber] = useState("");

  const logoDim = {
    width: "44px",
    height: "42px",
  };

  return (
    <div className={styles.cardWrapper}>
      <Card
        title="Enter your Phone Number"
        icon="Rotary Dial Telephone.png"
        logoDim={logoDim}
      >
        <TextInput
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="12345 67890"
        />
        <Button text="Next" onClick={onNext} />
      </Card>
    </div>
  );
};
export default Phone;
