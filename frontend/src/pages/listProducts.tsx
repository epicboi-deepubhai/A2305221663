import React, { useState, useEffect } from 'react';
import { getProducts, Product } from '../services/productService';
import Navbar from '../components/navbar';
import ProductCard from '../components/productCard';

const ListProducts: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const fetchProducts = async (filters: any = {}) => {
        try {
            setLoading(true);
            const { products, total } = await getProducts(
                filters.category,
                filters.company,
                filters.minPrice,
                filters.maxPrice,
                filters.minRating,
                filters.availability,
                page
            );
            setProducts(products);
            console.log('Fetched Products:', products);
            console.log('Total Pages:', Math.ceil(total / 10));
            setTotalPages(Math.ceil(total / 10)); // Assuming 10 products per page
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch products');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleFilterChange = (filters: any) => {
        setPage(1);
        fetchProducts(filters);
    };

    if (loading) return <div className="text-center mt-8">Loading...</div>;
    if (error) return <div className="text-center mt-8 text-red-600">{error}</div>;

    return (
        <div>
            <Navbar onFilterChange={handleFilterChange} />
            <div className="container mx-auto mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
                <div className="mt-8 flex justify-center space-x-4">
                    <button
                        onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                        disabled={page === 1}
                        className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <span className="px-4 py-2">
                        Page {page} of {totalPages}
                    </span>
                    <button
                        onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={page === totalPages}
                        className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ListProducts;