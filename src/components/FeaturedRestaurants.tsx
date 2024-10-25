"use client";
import { useGetRestaurants } from "@/queries/frontPage";

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
  const { data: restaurants, isLoading, error } = useGetRestaurants();

  if (isLoading) {
    return <h2>Loading restaurants...</h2>;
  }

  if (error) {
    console.error(error);
    return <h2>Failed to load restaurants. Please try again.</h2>;
  }

  return (
    <section className="py-8 sm:py-16 bg-blue-50 px-4 sm:px-6 lg:px-8">
      {" "}
      {/* Light blue background */}
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-green-600 mb-2 sm:mb-4">
          {title}
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-6 sm:mb-10 text-sm sm:text-base">
          Our diverse selection of restaurants, ranging from local favorites to
          renowned hotspots, guarantees a delicious variety to satisfy every
          taste and preference.
        </p>

        {/* Restaurant grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
          {restaurants.map((restaurant: Restaurant) => (
            <div
              key={restaurant.id}
              className="bg-[#B0E8D4] rounded-lg p-3 sm:p-4 md:p-6 text-center shadow-md hover:shadow-lg transition-shadow duration-300 flex items-center justify-center"
            >
              <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800">
                {restaurant.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
