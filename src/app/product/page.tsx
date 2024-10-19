import BreadCrumb from "@/components/BreadCrumb";

export default function Product() {
  return (
    <>
      {/* Full-Screen Breadcrumb */}
      <BreadCrumb
        items={[{ name: "Home", href: "/" }, { name: "Products", href: "/product" }]}
        title="Products"
      />

      {/* About Us Section */}
      <div className="py-16 max-w-7xl mx-auto px-4">
       
      </div>
    </>
  );
}
