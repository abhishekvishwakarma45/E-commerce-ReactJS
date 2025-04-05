import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Products from "./components/AllProducts";
import Contact from "./components/Contact";
import SingleProductPage from "./components/SingleProductPage";
import HeaderNavbar from "./components/Header";
import Cart from "./components/Cart";
import ErrorPage from "./components/ErrorPage";
import { Login } from "./components/Login";
import { RegisterNewUser } from "./components/RegisterNewUser";
import AdminPanel from "./components/AdminPanel";
import AdminLogin from "./components/AdminLogin";
function App() {
  return (
    <Router>
      <HeaderNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/singleproduct/:id" element={<SingleProductPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/register" element={<RegisterNewUser />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminPanel />} />

        <Route path="/login/admin" element={<AdminLogin />} />
        <Route path="/error" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
