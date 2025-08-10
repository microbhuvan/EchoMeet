import styles from "./StepAvatar.module.css";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAvatar } from "../../../store/activationSlice";
import { activate } from "../../../http/index";
import { setAuth } from "../../../store/authSlice";

import Button from "../../../components/shared/Button/Button";
import Card from "../../../components/shared/Card/Card";

const StepAvatar = ({ onNext }) => {
  const { name, avatar } = useSelector((state) => state.activationSlice);
  const [image, setImage] = useState("/images/person_icon.jpg");
  const dispatch = useDispatch();

  function captureImage(e) {
    console.log(e);
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      console.log(reader.result);
      setImage(reader.result);
      dispatch(setAvatar(reader.result));
    };
  }

  async function submit() {
    try {
      const { data } = await activate({ name, avatar });
      console.log(data);
      if (data.auth) {
        dispatch(setAuth(data));
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className={styles.cardWrapper}>
      <Card title={`Hi ${name}`}>
        {/* <p className={styles.subHeading}>How's the photo</p> */}
        <div className={styles.avatarWrapper}>
          <img src={image} alt="avatar" className={styles.avatarImage}></img>
        </div>
        <div className={styles.avatarInputDiv}>
          <input
            id="avatarInput"
            type="file"
            accept="image/*"
            className={styles.avatarInput}
            onChange={captureImage}
          />
          <label htmlFor="avatarInput" className={styles.avatarInputLabel}>
            Choose a different photo
          </label>
        </div>
        <Button onClick={submit} text="Next" />
      </Card>
    </div>
  );
};

export default StepAvatar;
