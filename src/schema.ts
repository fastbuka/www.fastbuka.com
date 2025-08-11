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

export type Order = {
  confirmation_no: string | null;
  created_at: string;
  delivery_address: string;
  delivery_charges: number;
  delivery_contact: string;
  delivery_email: string;
  delivery_name: string;
  discount_amount: number;
  order_charges: number;
  id: number;
  latitude: number | null;
  location: string | null;
  longitude: number | null;
  order_number: string;
  order_status: string;
  paid_amount: number;
  payment_id: string | null;
  payment_method: string | null;
  payment_status: string;
  pickup_code: string | null;
  delivery_code: string | null;
  rider_uuid: string | null;
  total_amount: number;
  updated_at: string;
  user_uuid: string;
  uuid: string;
  vendor_uuid: string;
  order_type: string;
  vendor: {
    longitude: number;
    latitude: number;
  };
  orderItems: {
    id: number;
    price: number;
    quantity: number;
    uuid: number;
    product: {
      name: string;
      categories: string[];
      description: string;
      discount: number;
      featured: number;
      id: number;
      image: string;
      price: string;
      processing_time: string;
    };
  }[];
};

export enum OrderStatus {
  AcceptedVendor = "ACCEPTED_VENDOR",
  PendingVendor = "PENDING_VENDOR",
  PendingCustomer = "PENDING_CUSTOMER",
  PendingRider = "PENDING_Rider",
  AcceptedRider = "ACCEPTED_RIDER",
  Delivered = "DELIVERED",
  Cancelled = "CANCELLED",
  Rejected = "REJECTED",
}

export enum OrderType {
  PickUp = "PICKUP",
  Delivery = "DELIVERY",
}

export enum CardTopupMode {
  Pin = "pin",
  OTP = "otp",
  AvsNoAuth = "avs_noauth",
  Redirect = "redirect",
  Init = "init",
}
