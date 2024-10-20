import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLogout } from "../redux/userSlice";
import { useCallback } from "react";
import { useUI } from "../utils/UIContext";
import sessionStorage from "redux-persist/lib/storage/session";

const useUserLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showDoneSnackbar } = useUI();

  const logout = useCallback(() => {
    dispatch(userLogout());
    showDoneSnackbar("Başarıyla çıkış yapıldı.");
    navigate('/');
    sessionStorage.removeItem('persist:shop');
  }, [dispatch, navigate, showDoneSnackbar]);

  return logout;
};

export default useUserLogout;
