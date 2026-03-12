import Home from "./pages/Home";
import MainLayout from "./layouts/MainLayout";
import useTheme from "../src/hooks/useTheme";

function App() {
  useTheme();
  return (
    <MainLayout>
      <Home />
    </MainLayout>
  );
}

export default App;
