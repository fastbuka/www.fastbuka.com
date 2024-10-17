import OurMenu from "@/components/OurMenu";
import TrendingMeals from "@/components/TrendingMeals";
import BreadCrumb from "@/components/BreadCrumb";

const menuItems = [
  { id: 1, name: "Grilled Chicken", description: "Delicious grilled chicken with spices", price: 3500, time: 30, image: "/images/meal1.jpg" },
  // Add more meals here
];

const featuredMeals = [
  { id: 1, name: "Grilled Chicken", description: "Delicious grilled chicken with spices", price: 3500, time: 30, image: "/images/meal1.jpg" },
  // Add more meals here
];

export default function MenuPage() {
  return (
    <div>
      {/* Breadcrumb with the "Our Menu" title */}
      <BreadCrumb
        items={[{ name: "Home", href: "/" }, { name: "Our Menu", href: "/menu" }]}
        title="Our Menu"
      />

      {/* Featured Meals Section */}
      <TrendingMeals meals={featuredMeals} title="Featured Meals" />

      {/* Full Menu Section */}
      <OurMenu meals={menuItems} title="Available Meals" />
    </div>
  );
}
