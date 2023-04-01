import { createContext, useEffect, useState } from "react";
import { userObserver } from "../firebase/Firebase";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [initialValue, setInitialValue] = useState({});
  const [currentUser, setCurrentUser] = useState(initialValue);

  useEffect(() => {
    userObserver(setCurrentUser);
    const items = JSON.parse(localStorage.getItem("currentUser"));
    if (items) {
      setInitialValue(items);
    }
  }, []);
  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;