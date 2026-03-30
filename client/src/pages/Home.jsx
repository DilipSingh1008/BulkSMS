import React from "react";
import Hero from "../sections/Hero";
import BulkSmsForm from "../sections/BulkSmsForm";
import Services from "../sections/Services";
import Pricing from "../sections/Pricing";
import Contact from "../sections/Contact";
import About from "../sections/About";
import Navbar from "../components/Navbar";

// import { Contact } from "lucide-react";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false); // Lifted state

  return (
    <>
      <Navbar openModal={() => setIsModalOpen(true)} />{" "}
      {/* Pass function to Navbar */}
      <Hero isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />{" "}
      {/* Pass state to Hero */}
      <Services />
      {/* <BulkSmsForm /> */}
      <Pricing />
      <About />
      {/* <Contact /> */}
    </>
  );
};

export default Home;
