import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuth } from "../store/authSlice";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export function useLoadingWithRefresh() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/api/refresh`, {
          withCredentials: true,
        });
        dispatch(setAuth(data));
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    })(); //anonymus func
  }, []);

  return { loading };
}
