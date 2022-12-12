import AuthContext from "context/AuthContext";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import "styles/app.scss";
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
