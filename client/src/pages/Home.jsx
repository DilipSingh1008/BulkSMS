import Hero from "../sections/Hero";
import BulkSmsForm from "../sections/BulkSmsForm";
import Services from "../sections/Services";
import Pricing from "../sections/Pricing";
import Contact from "../sections/Contact";
import About from "../sections/About";

// import { Contact } from "lucide-react";

const Home = () => {
  return (
    <>
      <Hero />
      <Services />
      <BulkSmsForm />
      <Pricing />
      <About />
      <Contact />
    </>
  );
};

export default Home;
