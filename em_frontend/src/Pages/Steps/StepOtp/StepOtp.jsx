import { useState } from "react";
import styles from "./StepOtp.module.css";
import { verifyOtp } from "../../../http/index";
import { useSelector, useDispatch } from "react-redux";
import { setAuth } from "../../../store/authSlice";

import Card from "../../../components/shared/Card/Card";
import TextInput from "../../../components/shared/TextInput/TextInput";
import Button from "../../../components/shared/Button/Button";

const StepOtp = ({ onNext }) => {
  const [otp, setOtp] = useState("");
  const { phone, hash } = useSelector((state) => state.authSlice.otp);
  const dispatch = useDispatch();

  async function onSubmit() {
    if (!otp || !phone || !hash) return;
    try {
      const res = await verifyOtp({ otp, phone, hash });
      console.log(res);
      dispatch(setAuth(res?.data));
      onNext();
    } catch (err) {
      console.log(err);
    }
  }

  const logoDim = {
    width: "22px",
    height: "30px",
  };
  return (
    <div className={styles.cardWrapper}>
      <Card title="Enter OTP here" icon="lock.png" logoDim={logoDim}>
        <TextInput value={otp} onChange={(e) => setOtp(e.target.value)} />
        <Button onClick={onSubmit} text="Next" />
      </Card>
    </div>
  );
};

export default StepOtp;
