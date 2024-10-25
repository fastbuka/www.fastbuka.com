export interface Meal {
  id: number;
  uuid: string;
  vendor_uuid: string;
  category_uuid: string;
  name: string;
  description: string;
  image: string;
  price: number;
  discount: number;
  processing_time: string;
  ratings: number;
  featured: number;
  ready_made: boolean;
  on_menu: boolean;
  createdAt: string;
  updatedAt: string;
  category: Category;
  vendor: Vendor;
}

export interface Category {
  id: number;
  uuid: string;
  vendor_uuid: string;
  name: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface Vendor {
  id: number;
  uuid: string;
  slug: string;
  user_uuid: string;
  name: string;
  description: string;
  profile: string | null;
  cover: string | null;
  country: string;
  state: string;
  city: string;
  location: string | null;
  longitude: number | null;
  latitude: number | null;
  address: string;
  ratings: number;
  featured: number;
  status: string;
  is_online: boolean;
  category: string | null;
  opening_time: string;
  closing_time: string;
  createdAt: string;
  updatedAt: string;
}
