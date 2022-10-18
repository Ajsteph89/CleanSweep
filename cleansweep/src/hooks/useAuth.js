import { createContext, useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as apiEndpoints from "../Endpoints";
import { useLocalStorage } from "./useLocalStorage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);

  const [loading, setLoading] = useState(false);
  const [logout, setLogout] = useState(false);
  const navigate = useNavigate();

  const login = async (username, password) => {
    const body = {
      username,
      password,
    };

    setLoading(true);

    try {
      const response = await apiEndpoints.login(body);
      setLoading(false);

      if (response.status === 200) {
        // This should be data returned from the server instead of shaping the data yourself

        const userData = {
          username,
          auth_token: response.data.auth_token,
        };

        setUser(userData);
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const logouts = () => {
    setUser(null);
    navigate("/login", { replace: true });
  };

  const memoedValue = useMemo(
    () => ({
      user,
      loading,
      login,
      logout
    }),
    [user, loading, logout]
  );

  return (
    <AuthContext.Provider value={memoedValue}>{children}</AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
