import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

function Auth() {
    const CLIENT_ID = "573785a1774745eab2d73dcd69f1e042";
    const REDIRECT_URI = "http://localhost:3000/auth/";
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
    const RESPONSE_TYPE = "token";

    const [token, setToken] = useState("");

    useEffect(() => {
      const hash = window.location.hash;
      let token = window.localStorage.getItem("token");
  
      if (!token && hash) {
        token = hash
          .substring(1)
          .split("&")
          .find((elem) => elem.startsWith("access_token"))
          .split("=")[1];
  
        window.location.hash = "";
        window.localStorage.setItem("token", token);
      }
  
      setToken(token);
    }, []);
  
    function Logout() {
      setToken("");
      window.localStorage.removeItem("token");
    }
  
    return (
      <div className="Auth">
        {token && <Navigate to="/game" />}
        {!token ? (
          <a
            href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=user-top-read`}
          >
            Login to Spotify
          </a>
        ) : (
          <button onClick={Logout}>Logout</button>
        )}
      </div>
    );
}

export default Auth;