import { useState } from "react";
import styles from "./StepOtp.module.css";

import Card from "../../../components/shared/Card/Card";
import TextInput from "../../../components/shared/TextInput/TextInput";
import Button from "../../../components/shared/Button/Button";

const StepOtp = ({ onNext }) => {
  const [otp, setOtp] = useState("");

  const logoDim = {
    width: "22px",
    height: "30px",
  };
  return (
    <div className={styles.cardWrapper}>
      <Card title="Enter OTP here" icon="lock.png" logoDim={logoDim}>
        <TextInput value={otp} onChange={(e) => setOtp(e.target.value)} />
        <Button onClick={onNext} text="Next" />
      </Card>
    </div>
  );
};

export default StepOtp;
