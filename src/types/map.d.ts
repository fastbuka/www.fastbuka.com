export interface LatLng {
    lat: number;
    lng: number;
  }
  
  export interface Store {
    id: string;
    name: string;
    position: LatLng;
    rating: number;
    address: string;
    distance: string;
  }
  
  export interface MapSectionProps {
    initialStores?: Store[];
  }
  