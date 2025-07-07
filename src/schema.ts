export type Vendor = {
  address: string;
  asset_code: string;
  balance: 0;
  categories: string[];
  city: string;
  closing_time: string;
  contact: string | null;
  country: string;
  cover: string | null;
  created_at: string;
  description: string;
  email: string | null;
  featured: number;
  id: number;
  is_online: boolean;
  latitude: number;
  longitude: number;
  location: string | null;
  name: string;
  opening_time: string;
  profile: string | null;
  ratings: number;
  slug: string;
  state: string;
  status: string;
  updated_at: string;
  user_uuid: string;
  uuid: string;
  other_names: string;
};

export type Pagination = {
  nextPage: number | null;
  page: number;
  perPage: number;
  previousPage: number | null;
  totalCount: number;
  totalPages: number;
};

export type VendorsResponse = {
  vendors: Vendor[];
  pagination: Pagination;
};

export type Product = {
  id: number;
  uuid: string;
  vendor_uuid: string;
  name: string;
  description: string;
  categories: string[];
  image: string;
  price: number;
  discount: number;
  processing_time: string;
  ratings: number;
  featured: number;
  ready_made: boolean;
  stock: boolean;
  created_at: string;
  updated_at: string;
  vendor_slug?: string;
};

export type Team = {
  id: number;
  uuid: string;
  name: string;
  role: string;
  avatar: string;
  created_at: string;
  updated_at: string;
};
