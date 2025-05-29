import { NavBar, Footer } from "./components";
import HomePage from "./pages/HomePage";
import ElectronicsCategoryPage from "./pages/ElectronicsCategoryPage";
import ProductListingPage from "./pages/ProductListingPage";
import SignupPage from "./pages/Signup";
import LoginPage from "./pages/LoginPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage ";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import OrderHistoryPage from "./pages/OrderHistoryPage";

function App() {
  return (
    <>
      <NavBar />
      <HomePage />
      {/* <ElectronicsCategoryPage /> */}
      {/* <ProductListingPage /> */}
      {/* <SignupPage /> */}
      {/* <LoginPage /> */}
      {/* <CartPage /> */}
      {/* <CheckoutPage /> */}
      {/* <OrderConfirmationPage /> */}
      {/* <OrderHistoryPage />   */}
      <Footer />
    </>
  );
}

export default App;
