import './App.css';
import Header from './feature/components/header';
import Home from './feature/components/home';
import ProductDetails from './feature/components/product-details';
import Footer from './feature/components/footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router';
import { StyledEngineProvider } from '@mui/material/styles';
import CartList from './feature/components/cart-list';

function App() {
  return (
    <div className="App">
      <StyledEngineProvider injectFirst>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details/:productId" element={<ProductDetails />} />
          <Route path="/cartlist/" element={<CartList />} />
          
        </Routes>
      </Router>
      <Footer />
      </StyledEngineProvider>

    </div>
  );
}

export default App;
