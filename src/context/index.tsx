'use client'
import { createContext, useContext as useReactContext, ReactNode, useState } from "react";

type FastBukaContextType = {
  location: string;
  setLocation: (location: string) => void;
};

const FastBukaContext = createContext<FastBukaContextType>({
  location: 'Fetching location...',
  setLocation: () => {},
});


export function useFastBukaContext() {
  return useReactContext(FastBukaContext);
}

export function FastBukaProvider({ children }: { children: ReactNode }) {
  const [location, setLocation] = useState('Fetching location...');
  
  return (
    <FastBukaContext.Provider
      value={{ location, setLocation }}
    >
      {children}
    </FastBukaContext.Provider>
  );
}