import { useParams } from 'react-router';
import '../styles/product-detail.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useProductDetails } from '../query/fetch-product-detail';

const queryClient = new QueryClient();

function ProductDetail() {
  const { productId } = useParams();
  const { data, status, error } = useProductDetails(productId);
  if (status === 'pending') {
    return <div className='product-detail'><div className="loading-section"><div className="loader"></div></div></div>
  }

  if (status === 'error') {
    return <div className='product-detail'><span>Error: {error.message}</span></div>
  }

  if (status === 'success') {
    // We can assume by this point that `isSuccess === true`
    return (
      <div className='product-detail'>
        <h2>{data.title}</h2>
        <div className="product-image-layout">
          <div className="product-image-sidebar">
            {data.images.map(
              (imgItem, imgIndex) =>
                <img src={imgItem} className='product-thumbnail-image' key={imgIndex} alt={data.title} />)}
          </div>
          <div className="product-image-content">
            <img className='product-detail-image' id="product-detail-image" alt={data.title} src={data.images[0]} />
          </div>
        </div>
        <div className="product-content-section">
          <p>{data.description}</p>
        </div>

      </div>
    );
  }
}

export default function ProductDetails() {
  return (
    <QueryClientProvider client={queryClient}>
      <ProductDetail />
    </QueryClientProvider>
  )
}