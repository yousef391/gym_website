import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import LandingPage from "./pages/LandingPage";
import StorePage from "./pages/StorePage";
import RecommendationPage from "./pages/RecommendationPage";

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-white flex flex-col">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/store" element={<StorePage />} />
              <Route path="/recommend" element={<RecommendationPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
