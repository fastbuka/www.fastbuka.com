'use client'
import { createContext, useContext as useReactContext, ReactNode, useState } from "react";

type LocationState = {
  address: string;
  coordinates: {
    latitude: number | null;
    longitude: number | null;
  };
};

type FastBukaContextType = {
  location: LocationState;
  setLocation: (location: LocationState) => void;
};

const FastBukaContext = createContext<FastBukaContextType>({
  location: {
    address: 'Fetching location...',
    coordinates: {
      latitude: null,
      longitude: null
    }
  },
  setLocation: () => {},
});

export function useFastBukaContext() {
  return useReactContext(FastBukaContext);
}

export function FastBukaProvider({ children }: { children: ReactNode }) {
  const [location, setLocation] = useState<LocationState>({
    address: 'Fetching location...',
    coordinates: {
      latitude: null,
      longitude: null
    }
  });
  
  return (
    <FastBukaContext.Provider
      value={{ location, setLocation }}
    >
      {children}
    </FastBukaContext.Provider>
  );
}