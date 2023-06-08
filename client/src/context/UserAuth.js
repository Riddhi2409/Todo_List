import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from 'jwt-decode';

const authContext = createContext();

const AuthProvider = ({children}) => {

    const [isAuthen,setIsAuthen]=useState(false);
    const [user,setUser]=useState(null);

    

    const login = async(response) => {
        var decoded =  jwt_decode(response.credential);
        console.log(decoded);
        const token = decoded.sub;
        const users=
            {
                name: decoded.name,
              email: decoded.email,
              picture: decoded.picture,
              tokenId: decoded.sub,
            }
        setUser({
            name: decoded.name,
          email: decoded.email,
          picture: decoded.picture,
          tokenId: decoded.sub,
        });
        setIsAuthen(true);
        window.localStorage.setItem("token", token);
        await axios
          .post("http://localhost:8080/auth", { ...users })
          .then((response) => {
            console.log("hello", response);
            return response
            // props.response(response)
          })
          .catch((err) => {
            console.log(err);
          });
        }
    
    const logout = () => {
        localStorage.removeItem('token')
        setUser(null);
        setIsAuthen(false)
    }
    return (
        <authContext.Provider value={{ isAuthen, user, logout , login}}>
          {children}
        </authContext.Provider>
      );
}


function useUserAuth() {
    return useContext(authContext);
}
export { AuthProvider, authContext ,useUserAuth};