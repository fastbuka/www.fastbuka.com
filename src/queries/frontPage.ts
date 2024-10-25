import { useQuery } from "react-query";
import { request } from "@/utils/request";
import { API_ENDPOINTS } from "@/constants";
import { Meal } from "@/lib/meal.interface";

interface FilterParams {
  search?: string;
  sortOrder?: string;
  sortField?:
    | "price"
    | "category"
    | "ratings"
    | "updatedAt"
    | "createdAt"
    | "featured";
  page?: number;
  perPage?: number;
}

/**
 * Fetches data for the home page from the server.
 *
 * @returns The home page data
 * @throws {Error} If the request fails
 */
export function useGetHomeData() {
  return useQuery("frontPageData", async () => {
    const response = await request(API_ENDPOINTS.FRONT_PAGE, {
      method: "GET",
    });
    if (!response.success) {
      throw new Error(response.message || "Failed to fetch home data");
    }
    return response.data;
  });
}
/**
 * Fetches filtered data for the home page from the server.
 *
 * The `params` object is converted to an array of key/value pairs, which is then passed to the `URLSearchParams` constructor.
 * This is because the `URLSearchParams` constructor expects the parameters to be either a string, or an iterable of key/value pairs.
 * The conversion is necessary because the `FilterParams` interface does not meet the requirements of the `URLSearchParams` constructor.
 * The `URLSearchParams` constructor requires the parameters to be either a string, or an iterable of key/value pairs.
 * The `Object.entries()` method is used to convert the `params` object to an array of key/value pairs.
 * The `map()` method is then used to convert each key/value pair to a string, which is then passed to the `URLSearchParams` constructor.
 *
 * @param {FilterParams} params The parameters to filter the home page data with
 * @returns The filtered home page data
 * @throws {Error} If the request fails
 */
export function useGetFilteredHomeData(params: FilterParams) {
  const urlParams = new URLSearchParams(Object.entries(params).map(([key, value]) => [key, String(value)]));
  return useQuery(
    "frontPageDataWithParams",
    async () => {
      const response = await request(
        `${API_ENDPOINTS.FRONT_PAGE}?${urlParams.toString()}`,
        { method: "GET" }
      );
      if (!response.success) {
        throw new Error(response.message || "Failed to fetch home data");
      }
      return response.data;
    },
    {
      keepPreviousData: true,
    }
  );
}

/**
 * Fetches trending meals from the server.
 *
 * @returns The trending meals
 * @throws {Error} If the request fails
 */
export function useGetTrendingMeals() {
  return useQuery<Meal[], Error>("trendingMeals", async () => {
    const response = await request(API_ENDPOINTS.FRONT_PAGE, {
      method: "GET",
    });
    console.log("This is the home data from the server: ", response);
    if (!response.success) {
      throw new Error("Failed to fetch trending meals");
    }
    return response.data.trending;
  });
}

/**
 * Fetches a list of restaurants from the server.
 *
 * @returns The list of restaurants
 * @throws {Error} If the request fails
 */
export function useGetRestaurants() {
  return useQuery("restaurants", async () => {
    const response = await request(API_ENDPOINTS.FRONT_PAGE, {
      method: "GET",
    });
    if (!response.success) {
      throw new Error("Failed to fetch restaurants");
    }
    return response.data.restaurants;
  });
}
/**
 * Fetches a list of menu meals from the server.
 *
 * @returns The list of menu items
 * @throws {Error} If the request fails
 */
export function useGetFeaturedMenu() {
  return useQuery("menu", async () => {
    const response = await request(API_ENDPOINTS.MENU_ITEMS, {
      method: "GET",
    });
    if (!response.success) {
      throw new Error(response.message || "Failed to fetch menu" );
    }
    return response.data.featured;
  },
      {
      keepPreviousData: true,
  });
}

/**
 * Fetches all others meals that are not featured from the server.
 *
 * @returns The list of all meals
 * @throws {Error} If the request fails
 */
export function useGetOtherMeals() {
  return useQuery<Meal[], Error>("otherMeals", async () => {
    const response = await request(API_ENDPOINTS.MENU_ITEMS, {
      method: "GET",
    });
    if (!response.success) {
      throw new Error(response.message || "Failed to fetch menu" );
    }
    return response.data.menu.food;
  },
      {
      keepPreviousData: true,
  });
}

export function useGetOtherMealsWithParams(params: FilterParams) {
  const urlParams = new URLSearchParams(Object.entries(params).map(([key, value]) => [key, String(value)]));
  return useQuery(
    "otherMealsWithParams",
    async () => {
      const response = await request(
        `${API_ENDPOINTS.MENU_ITEMS}?${urlParams.toString()}`,
        { method: "GET" }
      );
      if (!response.success) {
        throw new Error(response.message || "Failed to fetch menu" );
      }
      return response.data.menu.food;
    },
    {
      keepPreviousData: true,
    }
  );
}

export function useGetMenuWithParams(params: FilterParams) {
  const urlParams = new URLSearchParams(Object.entries(params).map(([key, value]) => [key, String(value)]));
  return useQuery(
    "menuWithParams",
    async () => {
      const response = await request(
        `${API_ENDPOINTS.MENU_ITEMS}?${urlParams.toString()}`,
        { method: "GET" }
      );
      if (!response.success) {
        throw new Error(response.message || "Failed to fetch menu" );
      }
      return response.data.featured;
    },
    {
      keepPreviousData: true,
    }
  );
}