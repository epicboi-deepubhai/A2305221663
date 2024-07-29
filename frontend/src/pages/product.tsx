import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById, Product as ProductType } from '../services/productService';

const Product: React.FC = () => {
    const { category, productId } = useParams<{ category: string; productId: string }>();
    const [product, setProduct] = useState<ProductType | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                if (category && productId) {
                    const data = await getProductById(category, productId);
                    setProduct(data);
                }
            } catch (err) {
                setError('Failed to fetch product details');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [category, productId]);

    if (loading) return <div className="text-center mt-8">Loading...</div>;
    if (error) return <div className="text-center mt-8 text-red-600">{error}</div>;
    if (!product) return <div className="text-center mt-8">Product not found</div>;

    return (
        <div className="container mx-auto mt-8">
            <Link to="/" className="text-blue-500 hover:underline mb-4 inline-block">
                ← Back to Products
            </Link>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="md:flex">
                    <div className="md:flex-shrink-0">
                        <img className="h-48 w-full object-cover md:w-48" src={product.imageUrl} alt={product.name} />
                    </div>
                    <div className="p-8">
                        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                            {product.category}
                        </div>
                        <h2 className="mt-1 text-2xl font-semibold text-gray-900">{product.name}</h2>
                        <p className="mt-2 text-gray-600">{product.company}</p>
                        <div className="mt-4">
                            <span className="text-3xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                            {product.discount > 0 && (
                                <span className="ml-2 text-sm text-green-600">-{product.discount}% OFF</span>
                            )}
                        </div>
                        <div className="mt-4 flex items-center">
                            <span className="text-yellow-400 mr-1">★</span>
                            <span>{product.rating.toFixed(1)}</span>
                        </div>
                        <p className={`mt-2 text-sm ${product.availability ? 'text-green-600' : 'text-red-600'}`}>
                            {product.availability ? 'In Stock' : 'Out of Stock'}
                        </p>
                        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;