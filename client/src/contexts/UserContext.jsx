/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";

const userDataContext = createContext();
const UserContext = ({ children }) => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  return (
    <>
      <userDataContext.Provider value={(user, setUser)}>
        {children}
      </userDataContext.Provider>
    </>
  );
};

export { UserContext, userDataContext };
