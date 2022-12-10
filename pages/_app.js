import "bootstrap/dist/css/bootstrap.min.css";
import "styles/app.scss";

import AuthContext from "context/AuthContext";
import { useEffect, useState } from "react";

function MyApp({ Component, pageProps }) {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState({});

  

  const handleGetUserFromStorage = () => {
    const storage = localStorage.getItem("userCurrent");
    if(storage){
      setIsLogged(true)
    }
    const dataParse = JSON.parse(storage)
    const user = storage
      ? {
          userId: dataParse.id,
          username: dataParse.username,
          role: dataParse.role,
        }
      : null;

    return user;
  };


  useEffect(() => {
    setUser(handleGetUserFromStorage());
  }, []);

  return (
    <AuthContext.Provider value={{user, isLogged, setIsLogged}}>
      <Component {...pageProps} />
    </AuthContext.Provider>
  );
}

export default MyApp;
