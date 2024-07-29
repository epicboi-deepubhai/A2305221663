import axios from 'axios';

const API_BASE_URL = 'http://localhost:8091'; // Replace with your actual API base URL

export interface Product {
    id: string;
    name: string;
    company: string;
    category: string;
    price: number;
    rating: number;
    discount: number;
    availability: boolean;
    imageUrl: string;
}

export const getProducts = async (
    category?: string,
    company?: string,
    minPrice?: number,
    maxPrice?: number,
    minRating?: number,
    availability?: boolean,
    page = 1,
    limit = 10
): Promise<{ products: Product[], total: number }> => {
    const response = await axios.get(`${API_BASE_URL}/categories/${category}/products`, {
        params: {
            company,
            minPrice,
            maxPrice,
            minRating,
            availability,
            page,
            limit
        }
    });
    return response.data;
};

export const getProductById = async (category: string, productId: string): Promise<Product> => {
    const response = await axios.get(`${API_BASE_URL}/categories/${category}/products/${productId}`);
    return response.data;
};