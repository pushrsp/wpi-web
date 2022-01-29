import React, { createContext, useRef } from "react";

export const MycoilContext = createContext({});

const MycoilRoot = ({ children }) => {
  const listenerStore = useRef(new Map());

  const subscribe = (key, listener) => {
    const hasValue = listenerStore.current.has(key);
    if (!hasValue) {
      listenerStore.current.set(key, new Set());
    }

    const listeners = listenerStore.current.get(key);
    listeners.add(listener);

    return () => listeners.delete(listener);
  };

  const getListeners = (key) => {
    return listenerStore.current.get(key);
  };

  return (
    <MycoilContext.Provider value={{ subscribe, getListeners }}>
      {children}
    </MycoilContext.Provider>
  );
};

export default MycoilRoot;
