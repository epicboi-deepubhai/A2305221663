import React from 'react';
import { Product } from '../services/productService';
import { Link } from 'react-router-dom';

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover" />
            <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                <p className="text-gray-600 mb-2">{product.company}</p>
                <p className="text-gray-600 mb-2">Category: {product.category}</p>
                <div className="flex justify-between items-center mb-2">
                    <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
                    {product.discount > 0 && (
                        <span className="text-sm text-green-600">-{product.discount}% OFF</span>
                    )}
                </div>
                <div className="flex items-center mb-2">
                    <span className="text-yellow-400 mr-1">★</span>
                    <span>{product.rating.toFixed(1)}</span>
                </div>
                <p className={`text-sm ${product.availability ? 'text-green-600' : 'text-red-600'}`}>
                    {product.availability ? 'In Stock' : 'Out of Stock'}
                </p>
                <Link
                    to={`/product/${product.category}/${product.id}`}
                    className="mt-4 block text-center bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                >
                    View Details
                </Link>
            </div>
        </div>
    );
};

export default ProductCard;