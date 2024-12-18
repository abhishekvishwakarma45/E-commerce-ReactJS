import { HeroSection } from "./Herosection";
import { Footer } from "./Footer";
import FeatureProducts from "./FeaturedProducts";
import { Services } from "./Services";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeatureProducts />
      <Services />
      <Footer />
    </>
  );
}
