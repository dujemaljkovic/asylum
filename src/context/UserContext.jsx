import { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  const toggleRole = () => {
    setIsAdmin(!isAdmin);
  };

  return (
    <UserContext.Provider value={{ isAdmin, toggleRole }}>
      {children}
    </UserContext.Provider>
  );
};

