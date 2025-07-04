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
