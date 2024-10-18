import Hero from "@/components/Hero";
import TrendingMeals from "@/components/TrendingMeals";
import FeaturedRestaurants from "@/components/FeaturedRestaurants";
import OurMenu from "@/components/OurMenu";
import LearnMore from "@/components/LearnMore";

export default function Home() {
  return (
    <>
      <Hero /> {/* Hero section with call to action */}
      <section className="py-10 mt-[50px] px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center text-green-700 leading-tight">
          Nutritious Delights<br />
          for Every Craving
        </h2>
        <p className="text-center mt-4 text-gray-600 max-w-3xl mx-auto text-lg sm:text-xl">
          Savor wholesome meals bursting with flavor. Our menu offers nutritious options crafted 
          with fresh, quality ingredients to nourish your body and tantalize your taste buds.
        </p>
      </section>
      <TrendingMeals /> {/* Meals section with price info */}
      <FeaturedRestaurants /> {/* List of featured restaurants */}
      <OurMenu /> {/* Our Menu section with menu items */}
      <LearnMore /> {/* Learn more section with call to action */}
    </>
  );
}