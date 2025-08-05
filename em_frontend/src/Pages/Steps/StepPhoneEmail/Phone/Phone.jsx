import { useState } from "react";
import styles from "./Phone.module.css";
import { sendOtp } from "../../../../http/index";
import { useDispatch } from "react-redux";
import { setOtp } from "../../../../store/authSlice";

import Card from "../../../../components/shared/Card/Card";
import Button from "../../../../components/shared/Button/Button";
import TextInput from "../../../../components/shared/TextInput/TextInput";

const Phone = ({ onNext }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const dispatch = useDispatch();

  const logoDim = {
    width: "44px",
    height: "42px",
  };

  async function submit() {
    const res = await sendOtp({ phone: phoneNumber });
    console.log(res);
    const { data } = res;
    dispatch(setOtp({ phone: data?.phone, hash: data?.hash }));
    onNext();
  }

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
          placeholder="+911234567890"
        />
        <Button text="Next" onClick={submit} />
      </Card>
    </div>
  );
};
export default Phone;
