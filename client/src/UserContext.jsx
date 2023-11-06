import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);

    return (
        <UserContext.Provider value={{setUser }}>
            {children}
        </UserContext.Provider>
    );
}