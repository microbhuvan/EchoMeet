import styles from "./StepName.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setName } from "../../../store/activationSlice";
import Button from "../../../components/shared/Button/Button";
import Card from "../../../components/shared/Card/Card";
import TextInput from "../../../components/shared/TextInput/TextInput";

const StepName = ({ onNext }) => {
  const { name } = useSelector((state) => state.activationSlice);
  const [username, setUsername] = useState(name);
  const dispatch = useDispatch();

  function nextStep() {
    if (!username) {
      return;
    }
    dispatch(setName(username));
    onNext();
  }
  return (
    <div className={styles.cardWrapper}>
      <Card title="Enter an Username">
        <TextInput
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Button onClick={nextStep} text="Next"></Button>
      </Card>
    </div>
  );
};

export default StepName;
