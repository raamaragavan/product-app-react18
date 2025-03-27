import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';

import ProductDetails from './product-details';

// jest.mock('@tanstack/react-query', () => ({
//     useQuery: jest.fn(),
//   }));

const productId = 2;

const TestData = {
    "id": 2,
    "title": "Eyeshadow Palette with Mirror",
    "description": "The Eyeshadow Palette with Mirror offers a versatile range of eyeshadow shades for creating stunning eye looks. With a built-in mirror, it's convenient for on-the-go makeup application.",
    "category": "beauty",
    "price": 19.99,
    "discountPercentage": 5.5,
    "rating": 3.28,
    "stock": 44,
    "tags": [
        "beauty",
        "eyeshadow"
    ],
    "brand": "Glamour Beauty",
    "sku": "MVCFH27F",
    "weight": 3,
    "dimensions": {
        "width": 12.42,
        "height": 8.63,
        "depth": 29.13
    },
    "warrantyInformation": "1 year warranty",
    "shippingInformation": "Ships in 2 weeks",
    "availabilityStatus": "In Stock",
    "reviews": [
        {
            "rating": 4,
            "comment": "Very satisfied!",
            "date": "2024-05-23T08:56:21.618Z",
            "reviewerName": "Liam Garcia",
            "reviewerEmail": "liam.garcia@x.dummyjson.com"
        },
        {
            "rating": 1,
            "comment": "Very disappointed!",
            "date": "2024-05-23T08:56:21.618Z",
            "reviewerName": "Nora Russell",
            "reviewerEmail": "nora.russell@x.dummyjson.com"
        },
        {
            "rating": 5,
            "comment": "Highly impressed!",
            "date": "2024-05-23T08:56:21.618Z",
            "reviewerName": "Elena Baker",
            "reviewerEmail": "elena.baker@x.dummyjson.com"
        }
    ],
    "returnPolicy": "30 days return policy",
    "minimumOrderQuantity": 32,
    "meta": {
        "createdAt": "2024-05-23T08:56:21.618Z",
        "updatedAt": "2024-05-23T08:56:21.618Z",
        "barcode": "2817839095220",
        "qrCode": "https://assets.dummyjson.com/public/qr-code.png"
    },
    "images": [
        "https://cdn.dummyjson.com/products/images/beauty/Eyeshadow%20Palette%20with%20Mirror/1.png"
    ],
    "thumbnail": "https://cdn.dummyjson.com/products/images/beauty/Eyeshadow%20Palette%20with%20Mirror/thumbnail.png"
}

const queryClient = new QueryClient();

describe('ProductdetailComponent', () => {
    it('should render detail component successfully', () => {
        const { container } =  render(<QueryClientProvider client={queryClient}><ProductDetails productId={productId} /></QueryClientProvider>);
        expect(container.firstChild).toHaveClass('product-detail');
    });
    // it('should render data when the query is successful', async () => {
    //     useQuery.mockReturnValue({
    //       data: TestData,
    //       isLoading: false,
    //       isError: false,
    //     });
    //     render(<QueryClientProvider client={queryClient}><ProductDetails productId={productId} /></QueryClientProvider>);
    
    //     await waitFor(() => {
    //                     expect(screen.getByRole('heading', { level: 2, name: 'Eyeshadow Palette with Mirror' })).toBeInTheDocument();
    //                 });
    //   });

//     it('should render data when fetch is successful', async () => {
//         const mockFunction = jest.fn();
//         mockFunction.mockResolvedValueOnce(TestData);
//         act(() => {
//             render(<QueryClientProvider client={queryClient}><ProductDetails productId={productId} /></QueryClientProvider>);

//         });

//         await waitFor(() => {
//             expect(screen.getByRole('heading', { level: 2, name: 'Eyeshadow Palette with Mirror' })).toBeInTheDocument();
//         });
//     });

//     it('should render error message when fetch fails', async () => {
//         const mockFunction = jest.fn();
//         mockFunction.mockRejectedValueOnce(new Error('Failed to fetch detail'));
//         render(<QueryClientProvider client={queryClient}><ProductDetails productId={productId} /></QueryClientProvider>);

//         await waitFor(() => {
//             expect(screen.getByText('Error: Failed to fetch detail')).toBeInTheDocument();
//         });
//     });
});