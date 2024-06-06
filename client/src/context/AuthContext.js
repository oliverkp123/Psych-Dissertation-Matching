import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (username, password) => {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/auth/login`,
      {
        username,
        password,
      },
      {
        withCredentials: true,
      }
    );
    setUser(response.data.userData);
  };

  const logout = async () => {
    await axios.get(`${process.env.REACT_APP_BACKEND_URL}/auth/logout`, {
      withCredentials: true,
    });
    setUser(null);
  };

  const fetchUser = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/auth/user`, {
        withCredentials: true,
      });
      setUser(response.data.userData);
      console.log("User succesfully fetched");
    } catch (error) {
      if (error.response) {
        console.log(error.response?.data?.message);
      }
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, fetchUser }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
