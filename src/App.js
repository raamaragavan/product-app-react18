import './App.css';
import Header from './feature/components/header';
import Home from './feature/components/home';
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
          <Route path="/" element={<Home />} />
          <Route path="/details/:productId" element={<ProductDetails />} />
        </Routes>
      </Router>
      <Footer />
      </StyledEngineProvider>

    </div>
  );
}

export default App;
