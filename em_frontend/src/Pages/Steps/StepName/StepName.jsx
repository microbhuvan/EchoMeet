import styles from "./StepName.module.css";
import { useState } from "react";

import Button from "../../../components/shared/Button/Button";
import Card from "../../../components/shared/Card/Card";
import TextInput from "../../../components/shared/TextInput/TextInput";

const StepName = ({ onNext }) => {
  const [name, setName] = useState("");
  return (
    <div className={styles.cardWrapper}>
      <Card title="Enter an Username">
        <TextInput value={name} onChange={(e) => setName(e.target.value)} />
        <Button onClick={onNext} text="Next"></Button>
      </Card>
    </div>
  );
};

export default StepName;
