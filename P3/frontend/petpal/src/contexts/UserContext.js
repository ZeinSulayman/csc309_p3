/*import React, { createContext, useState, useReducer  } from 'react';

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};


export const UserProvider = ({ children }) => {
  //const [user, setUser] = useState(null);
  const updateUser = (newUserInfo) => {
    setUser(newUserInfo);
  };
  const initialState = {
    id: null,
    name: '',
    seeker: false,
  };

  const reducer = (user, action) => {
    switch (action.type) {
      case 'UPDATE_USER':
        return { ...user, ...action.payload };
      default:
        return user;
    }
  };

  const [user, dispatch] = useReducer(reducer, initialState);

  const updateUser = (userInfo) => {
    dispatch({ type: 'UPDATE_USER', payload: userInfo });
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

//export { UserContext, UserProvider };
*/

import { createContext, useContext, useReducer } from 'react';

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const initialState = {
    id: null,
    name: '',
    seeker: false,
  };

  const reducer = (user, action) => {
    switch (action.type) {
      case 'UPDATE_USER':
        return { ...user, ...action.payload };
      default:
        return user;
    }
  };

  const [user, dispatch] = useReducer(reducer, initialState);

  const updateUser = (userInfo) => {
    dispatch({ type: 'UPDATE_USER', payload: userInfo });
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};
