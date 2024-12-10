import { HeroSection } from "./Herosection";
import { Footer } from "./Footer";
import { useProductContext } from "../context/ProductContext";

export default function About() {
  return (
    <>
      <h1>my name is{name}</h1>
      <HeroSection />
      <Footer />
    </>
  );
}
