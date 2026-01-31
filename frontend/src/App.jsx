import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./app/route";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import BottomNav from "./components/layout/BottomNav";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>

          {/* Desktop Navbar */}
          <Navbar />

          {/* Routes */}
          <AppRoutes />

          {/* Mobile Bottom Nav */}
          <BottomNav />

          {/* Desktop Footer */}
          <Footer />

        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}
