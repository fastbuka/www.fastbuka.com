"use server";

import { Pagination, Product, VendorsResponse } from "@/schema";

const endpoint = process.env.NEXT_PUBLIC_BACKEND_URL;

export type Vendor = {
  id: number;
  image: string;
  created_at: string;
  name: string;
  pinned: boolean;
  uuid: string;
  updated_at: string;
};

export async function getVendors() {
  try {
    const request = await fetch(`${endpoint}/api/v1/vendor/public/approved`);
    const response = await request.json();
    if (response?.success) {
      return response?.data.vendors as VendorsResponse["vendors"];
    } else {
      return undefined;
    }
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

export async function getFeaturedVendors() {
  try {
    const request = await fetch(
      `${endpoint}/api/v1/vendor/public/approved?sortField=featured`
    );
    const response = await request.json();
    if (response?.success) {
      return response?.data as VendorsResponse;
    } else {
      return undefined;
    }
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

export async function getVendor(slug: string) {
  try {
    const request = await fetch(`${endpoint}/api/v1/vendor/show/${slug}`);
    const response = await request.json();
    if (response?.success) {
      return response?.data?.vendor as VendorsResponse["vendors"][0];
    } else {
      return undefined;
    }
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

export async function getVendorProducts(slug: string, category?: string) {
  try {
    const request = await fetch(
      `${endpoint}/api/v1/product/public/${slug}${
        category ? `?q=${category}` : ""
      }`
    );
    const response = await request.json();
    if (response?.success) {
      return response?.data as {
        products: Product[];
        pagination: Pagination;
      };
    } else {
      return undefined;
    }
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

export async function getProduct(vendorSlug: string, productUUID?: string) {
  try {
    const request = await fetch(
      `${endpoint}/api/v1/product/${vendorSlug}/${productUUID}`
    );
    const response = await request.json();
    if (response?.success) {
      return response?.data?.product as Product;
    } else {
      return undefined;
    }
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

export async function getAllVendors(q: string) {
  try {
    const request = await fetch(
      `${endpoint}/api/v1/vendor/public/approved?q=${q}`
    );
    const response = await request.json();
    if (response?.success) {
      return response?.data as VendorsResponse;
    } else {
      return undefined;
    }
  } catch (error) {
    console.log(error);
    return undefined;
  }
}
