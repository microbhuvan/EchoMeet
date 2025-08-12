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

        // If refresh is successful, set the auth state
        if (data.auth && data.user) {
          dispatch(setAuth(data));
        } else {
          // If no valid auth data, ensure user is logged out
          dispatch(setAuth({ user: null, auth: false }));
        }

        setLoading(false);
      } catch (err) {
        console.log("Refresh failed:", err);
        // If refresh fails, ensure user is logged out
        dispatch(setAuth({ user: null, auth: false }));
        setLoading(false);
      }
    })();
  }, [dispatch]);

  return { loading };
}
