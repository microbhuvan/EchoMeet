import { useState } from "react";
import styles from "./Email.module.css";

import Card from "../../../../components/shared/Card/Card";
import Button from "../../../../components/shared/Button/Button";
import TextInput from "../../../../components/shared/TextInput/TextInput";

const Email = ({ onNext }) => {
  const [emailId, setEmailId] = useState("");

  const logoDim = {
    width: "44px",
    height: "34px",
  };
  return (
    <div className={styles.cardWrapper}>
      <Card title="Enter your Email Id" icon="Email_icon.png" logoDim={logoDim}>
        <TextInput
          value={emailId}
          onChange={(e) => setEmailId(e.target.value)}
          placeholder="example@gmail.com"
        />
        <Button text="Next" onClick={onNext} />
      </Card>
    </div>
  );
};
export default Email;
