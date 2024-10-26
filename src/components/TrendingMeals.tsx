"use client";

import { Card } from "@/components/ui/card";
import { Meal } from "@/lib/meal.interface";
import { useGetTrendingMeals } from "@/queries/frontPage";
import Image from "next/image";
import { FiClock } from "react-icons/fi"; // For the clock icon
import Link from "next/link";
import { reduceImageWidth } from "@/utils/reduceImageWidth";

interface TrendingMealsProps {
  title?: string; // Optional Title
  subtitle?: string; // Optional Subtitle
}



export default function TrendingMeals({
  title = "Trending Meals", // Default title
  subtitle = "Nutritious meals from our top restaurants you would love", // Default subtitle
}: TrendingMealsProps) {
  // fetch the trending meals data using the useGetTrendingMeals hook
  const { data: meals, isLoading, error } = useGetTrendingMeals();

  //handle loading andd error states
  if (isLoading) {
    return <h2>Loading meals...</h2>;
  }

  if (error) {
    console.error(error);
    return <h2>Failed to load meals. Please try again.</h2>;
  }
  return (
    <section className="py-10 px-6 sm:px-8 lg:px-10 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">{title}</h2>
        <p className="hidden sm:block sm:text-center sm:text-gray-600 sm:max-w-2xl sm:mx-auto sm:mb-12">
          {subtitle}
        </p>
        <a href="#" className="text-green-500 flex items-center space-x-2">
          <span>See more</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a1 1 0 01-.7-.3l-7-7a1 1 0 010-1.4l7-7a1 1 0 111.4 1.4L5.41 9H17a1 1 0 010 2H5.41l5.29 5.29a1 1 0 01-1.41 1.41z"
              clipRule="evenodd"
              transform="scale(-1, 1) translate(-20, 0)"
            />
          </svg>
        </a>
      </div>

      {/* Horizontal scroll wrapper */}
      <div className="flex overflow-x-auto pb-6 space-x-6">
        {meals?.map((meal: Meal) => (
          <Link
            key={meal.id}
            href={`/menu/${meal.uuid}`}
            passHref
            className="shrink-0 w-[300px] relative"
          >
            <Card className="hover:shadow-lg transition-shadow duration-200">
              <div
                className="relative w-full h-48"
                style={{ background: "#B0E8D4" }}
              >
                <Image
                  src={reduceImageWidth(meal.image)}
                  alt={meal.name}
                  layout="fill" // Use fill for full coverage
                  style={{ objectFit: "cover" }} // Use style for objectFit
                  className="rounded-t-lg"
                  priority={meal.id <= 4}
                />
                <span className="absolute top-2 left-2 bg-orange-400 text-white px-3 py-1 rounded-lg font-bold">
                  ₦
                  {meal.price.toLocaleString("en-NG", {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold">{meal.name}</h3>
                  <div className="flex items-center space-x-1 text-gray-500 text-xs">
                    <FiClock />
                    <span>{meal.processing_time} mins</span>
                  </div>
                </div>
                <p className="text-sm text-gray-500 line-clamp-2">
                  {meal.description}
                </p>
                <button className="mt-4 w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors duration-200">
                  Order Now
                </button>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
