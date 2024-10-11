import { useState } from "react";
import Navbar from "@/components/Home/nav";
import Hero from "@/components/Home/hero";
import Hygienic from "@/components/Home/hygienic";
import Services from "@/components/Home/services";
import Partner from "@/components/Home/partners";
import Sponser from "@/components/Home/sponsors";
import Faq from "@/components/Home/faq";
import Footer from "@/components/Home/footer";

const Index = () => {
  // const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div className="sticky top-0 z-10">
        <Navbar />
      </div>
      <div className="z-0">
        <Hero />
        <Hygienic />
        <Services />
        {/* <Slider/> */}
        <Partner />
        <Sponser />
        <Faq />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
