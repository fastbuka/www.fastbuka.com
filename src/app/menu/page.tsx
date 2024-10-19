import OurMenu from "@/components/OurMenu";
import TrendingMeals from "@/components/TrendingMeals";
import BreadCrumb from "@/components/BreadCrumb";


export default function MenuPage() {
  return (
    <div>
      {/* Breadcrumb with the "Our Menu" title */}
      <BreadCrumb

        items={[{ name: "Home", href: "/" }, { name: "Our Menu", href: "/menu" }]}
        title="Our Menu"
      />
      

      {/* Featured Meals Section */}
      <TrendingMeals  title="Featured Meals"/>

      {/* Full Menu Section */}
      <OurMenu title="Available Meals" />
    </div>
  );
}
