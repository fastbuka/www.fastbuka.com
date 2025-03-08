import HeroSection from '@/components/HeroSection';
import CategoriesSection from '@/components/CategoriesSection';
import RestaurantsSection from '@/components/ServicesIntro';
import PartnersSponsors from '@/components/PartnersSponsors';
import StoresMapSection from '@/components/StoresMapSection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <RestaurantsSection />
      <StoresMapSection />
      <PartnersSponsors />
    </>
  );
}
