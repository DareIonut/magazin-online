import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./screens/Home";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";

const App = () => {
  const login = <h1>Login page</h1>;
  return (
    <BrowserRouter>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductScreen />} />
            <Route path="/login" element={login} />
            <Route path="/cart">
              <Route path=":id" element={<CartScreen />} />
              <Route path="" element={<CartScreen />} />
            </Route>
          </Routes>
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
