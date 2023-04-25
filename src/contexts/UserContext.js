import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export function UserProvider({children}){
    const lsUser = JSON.parse(localStorage.getItem("user"));
    const [name, setName] = useState("");
    const [user,setUser] = useState(lsUser !== null ? lsUser : {});
    const navigate = useNavigate();

    useEffect(() => {
        if (lsUser === null) {
            navigate("/");
        } else {
            navigate("/home");
        }
    },[]);

    return (
        <UserContext.Provider value={{user,setUser,name,setName}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext;