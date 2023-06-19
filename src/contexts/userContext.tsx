import { createContext, ReactNode, useEffect, useState } from "react";
import { User } from "../types/user";
import jwt_decode from "jwt-decode";
import { getUserById } from "../services/emporium/auth";
import { ReturnApi } from "../types/return";
import { getTokenCookies } from "../utils/tokenCookies";

type UserContextType = {
    token: string | undefined;
    setToken: any;
    user: User | undefined;
    setUser: any;
}

export const UserContext = createContext({} as UserContextType);

export function UserProvider(props: any) {

    const [token, setToken] = useState<string>();
    const [user, setUser] = useState<User>();

    useEffect(() => {
        console.log('é chamado')
        handleUserSession();
    }, [token]);


    async function handleUserSession() {

        const tokenStore = getTokenCookies()

        if (tokenStore) {

            const userDecoded: string = jwt_decode(tokenStore);
            const userReturned: ReturnApi = await getUserById(userDecoded.sub)

            if (userReturned) {
                setUser(userReturned.records)
                setToken(tokenStore)
            }
        }
    }

    return (

        <UserContext.Provider value={{ token, setToken, user, setUser }}>
            {props.children}
        </UserContext.Provider>
    )



}