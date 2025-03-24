import './App.css';
import Header from './feature/components/header';
import Products from './feature/components/product';
import ProductDetails from './feature/components/product-details';
import Footer from './feature/components/footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { StyledEngineProvider } from '@mui/material/styles';

function App() {
  return (
    <div className="App">
      <StyledEngineProvider injectFirst>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/details/:productId" element={<ProductDetails />} />
        </Routes>
      </Router>
      <Footer />
      </StyledEngineProvider>

    </div>
  );
}

export default App;
