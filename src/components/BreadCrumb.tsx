import Link from "next/link";

interface BreadCrumbProps {
  items: Array<{ name: string; href: string }>;
  title: string; // Page Title
}

export default function BreadCrumb({ items, title }: BreadCrumbProps) {
  return (
    <section
      className="relative py-20  text-extraBold text-center text-dark"
      style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url('/images/pattern.png')`, // Significantly reduced image opacity (90% white overlay)
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "rgba(0, 128, 0, 0.1)", // Increased greenish background
        backgroundBlendMode: "overlay",
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Page Title */}
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>

        {/* Breadcrumb Links */}
        <nav className="text-lg">
          {items.map((item, index) => (
            <span key={index} className="text-gray-800">
              <Link href={item.href} className="hover:underline text-dark">
                {item.name}
              </Link>
              {index < items.length - 1 && <span className="mx-2">/</span>}
            </span>
          ))}
        </nav>
      </div>
    </section>
  );
}
