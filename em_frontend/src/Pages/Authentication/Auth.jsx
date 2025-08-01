import styles from "./Auth.module.css";
import { useState } from "react";

import StepPhoneEmail from "../Steps/StepPhoneEmail/StepPhoneEmail";
import StepOtp from "../Steps/StepOtp/StepOtp";

const steps = {
  1: StepPhoneEmail,
  2: StepOtp,
};

const Auth = () => {
  const [step, setStep] = useState(1);
  const Step = steps[step];

  function onNext() {
    setStep((step) => step + 1);
  }

  return (
    <div>
      authpages
      <Step onNext={onNext} />
    </div>
  );
};

export default Auth;
