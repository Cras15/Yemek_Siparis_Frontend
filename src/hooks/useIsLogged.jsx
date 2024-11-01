import { useSelector } from "react-redux";

const useIsLogged = () => {
    const { user, token } = useSelector((state) => state.user);
    return Boolean(user && token);
};

export default useIsLogged;
