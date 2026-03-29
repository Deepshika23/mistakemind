import { createContext, useContext, useState, ReactNode } from "react";

interface UserContextType {
  userName: string | null;
  setUserName: (name: string | null) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType>({ userName: null, setUserName: () => {}, logout: () => {} });

export function UserProvider({ children }: { children: ReactNode }) {
  const [userName, setUserName] = useState<string | null>(() => sessionStorage.getItem("userName"));

  const handleSetName = (name: string | null) => {
    setUserName(name);
    if (name) sessionStorage.setItem("userName", name);
    else sessionStorage.removeItem("userName");
  };

  const logout = () => handleSetName(null);

  return (
    <UserContext.Provider value={{ userName, setUserName: handleSetName, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
