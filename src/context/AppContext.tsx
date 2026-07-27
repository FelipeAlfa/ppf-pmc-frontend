"use client";

import React, { createContext, useContext, useState } from "react";

type AppState = {
  scrollBlocked: boolean;
  setScrollBlocked: React.Dispatch<React.SetStateAction<boolean>>;
};

const AppContext = createContext<AppState | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [scrollBlocked, setScrollBlocked] = useState<boolean>(false);

  return (
    <AppContext.Provider value={{ scrollBlocked, setScrollBlocked }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used within a AppProvider");
  }

  return context;
};
