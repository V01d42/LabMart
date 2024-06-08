import React, { createContext, useContext, useState, ReactNode } from "react";

interface StoreidStatusProps {
  selectedStoreId: number;
  setSelectedStoreId: (id: number) => void;
}

const StoreidStatus = createContext<StoreidStatusProps | undefined>(undefined);

export const StoreidStatusProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedStoreId, setSelectedStoreId] = useState<number>(319); // 初期値は319

  return (
    <StoreidStatus.Provider value={{ selectedStoreId, setSelectedStoreId }}>
      {children}
    </StoreidStatus.Provider>
  );
};

export const useStore = (): StoreidStatusProps => {
  const context = useContext(StoreidStatus);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
};
