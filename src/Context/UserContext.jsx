/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";

export let UserContext = createContext();

export default function UserContextProvider(props) {
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  return (
    <>
      <UserContext.Provider value={{ token, setToken }}>
        {props.children}
      </UserContext.Provider>
    </>
  );
}
