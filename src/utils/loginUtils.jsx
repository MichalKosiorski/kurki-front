

import {useLocation, Navigate, useNavigate, replace } from "react-router-dom";


/*         TOKENS         */
/* ---------------------- */
export function saveLocalUser(user)
{
    window.localStorage.setItem("user", JSON.stringify(user));
}

export function removeLocalUser()
{
    window.localStorage.removeItem("user");
    localStorage.removeItem("user-data");
    localStorage.removeItem("expiresAt");
}

export function getLocalUser()
{
    let data = window.localStorage.getItem("user");
    data = JSON.parse(data);
    return(data);
}


/*     REDIRECTIONS        */
/* ---------------------- */
export const RequireAuth = ({children}) =>{

    const user = getLocalUser();
    const location = useLocation();
    
    if(!user?.token){
        const redirect = encodeURIComponent(location.pathname + location.search);
        return <Navigate to={`/login` } replace />;
    }

    return children;
}

export const AlreadyLoggedInRedirect = ({children}) => {
    const user = getLocalUser();
    if(user?.token){
        return <Navigate to="/" replace/>
    }
    return children;
}