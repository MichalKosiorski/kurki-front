import { useState } from "react";
import { createContext } from "react";

export const AppContext = createContext(null);

export function AppProvider({ children }) 
{
  const frontend_link = "http://localhost:5173";
  const api_link = import.meta.env.VITE_API_URL;
  //const api_link = "https://kurki-backend-app.happywave-0059b994.polandcentral.azurecontainerapps.io";


  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);


  const links = {
    "main": {link: "/", name: "Strona główna"},
    "forum": {link: "/posts", name: "Wpisy"},
    "encyclopedy": {link: "/encyclopedy", name: "Encyklopedia"},
    "contact": {link: "/contact", name: "Kontakt"},
    "about_us": {link: "/abount-us", name: "O nas"},
    "statute": {link: "/statute", name: "Regulamin"},
    "privacy_policy": {link: "/privacy-policy", name: "Polityka prywatności"},
    "login": {link: "/login", name: "Zaloguj się"},
    "register": {link: "/register", name: "Zarejestruj się"},
    "account": {link: "/account", name: "Moje konto"},
    "remindPassword" : {link: "/remindPassword", name: "Przypomnij hasło"},
    "kurkAI" : {link: "/kurkai", name: "KurkAI"}

  }

  const value = {
    frontend_link,
    api_link,
    links,
    token,
    user,
    setToken,
    setUser
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}