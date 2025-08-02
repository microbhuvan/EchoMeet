import styles from "./Auth.module.css";
import { useState } from "react";

import StepPhoneEmail from "../Steps/StepPhoneEmail/StepPhoneEmail";
import StepOtp from "../Steps/StepOtp/StepOtp";

const steps = {
  1: StepPhoneEmail,
  2: StepOtp,
};

const Auth = () => {
  const [step, setStep] = useState(2);
  const Step = steps[step];

  function onNext() {
    setStep((step) => step + 1);
  }

  return <Step onNext={onNext} />;
};

export default Auth;
