import { HeroSection } from "./Herosection";
import { Footer } from "./Footer";
import FeatureProducts from "./FeaturedProducts";
import { Services } from "./Services";

import Brands from "./Brands";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeatureProducts />
      <Services />
      <Brands />
      <Footer />
    </>
  );
}
