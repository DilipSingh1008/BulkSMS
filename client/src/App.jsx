// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import ServiceDetail from "./sections/ServiceDetail";

import useTheme from "../src/hooks/useTheme";
import About from "./sections/About";
import Pricing from "./sections/Pricing";
import Services from "./sections/Services";

function App() {
  useTheme();

  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/about" element={<About />} />
          <Route path="/services/:id" element={<ServiceDetail />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
