"use client";
import { useGetRestaurants } from "@/queries/frontPage";
import { Skeleton } from "@radix-ui/themes";
import { TriangleAlert } from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";

interface Restaurant {
  id: number;
  uuid: string;
  slug: string | null;
  user_uuid: string;
  name: string;
  description: string;
  cac_number: string;
  country: string;
  state: string;
  city: string;
  address: string;
  opening_time: string;
  closing_time: string;
  createdAt: string;
  updatedAt: string;
}

export default function FeaturedRestaurants({
  title = "Featured Restaurants",
}) {
  const {
    data: restaurants,
    isLoading,
    isFetching,
    error,
  } = useGetRestaurants();

  if (error) {
    console.error(error);
    return (
      <Alert variant={"destructive"} className="mx-auto">
        <TriangleAlert color="red" size={28} className="mx-4" />
        <AlertDescription>
          Failed to fetch restaurants. Please try again.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <section className="py-8 sm:py-16 bg-blue-50 px-4 sm:px-6 lg:px-8">
      {" "}
      {/* Light blue background */}
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-green-600 mb-2 sm:mb-4">
          <Skeleton loading={isLoading}>{title}</Skeleton>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-6 sm:mb-10 text-sm sm:text-base">
          <Skeleton loading={isLoading}>
            Our diverse selection of restaurants, ranging from local favorites
            to renowned hotspots, guarantees a delicious variety to satisfy
            every taste and preference.
          </Skeleton>
        </p>

        {/* Restaurant grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
          {isLoading || isFetching
            ? Array.from({ length: 10 }).map((_, index) => (
                <Skeleton loading={isLoading || isFetching}>
                  <div
                    key={index}
                    className="bg-[#B0E8D4] rounded-lg p-3 sm:p-4 md:p-6 text-center shadow-md flex items-center justify-center"
                  >
                    <div className="h-5 w-24 bg-gray-200"></div>
                  </div>
                </Skeleton>
              ))
            : restaurants.map((restaurant: Restaurant) => (
                <div
                  key={restaurant.id}
                  className="bg-[#B0E8D4] rounded-lg p-3 sm:p-4 md:p-6 text-center shadow-md hover:shadow-lg transition-shadow duration-300 flex items-center justify-center"
                >
                  <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800">
                    <Skeleton loading={isLoading || isFetching}>
                      {restaurant.name}
                    </Skeleton>
                  </h3>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
}
