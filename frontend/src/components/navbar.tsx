import React, { useState } from 'react';

interface FilterOptions {
    category: string;
    company: string;
    minPrice: number;
    maxPrice: number;
    minRating: number;
    availability: boolean;
}

interface NavbarProps {
    onFilterChange: (filters: FilterOptions) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onFilterChange }) => {
    const [filters, setFilters] = useState<FilterOptions>({
        category: '',
        company: '',
        minPrice: 0,
        maxPrice: 1000,
        minRating: 0,
        availability: false,
    });

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
        setFilters(prev => ({ ...prev, [name]: newValue }));
    };

    const applyFilters = () => {
        onFilterChange(filters);
    };

    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto">
                <div className="flex flex-wrap items-center justify-between">
                    <h1 className="text-white text-2xl font-bold">Product Catalog</h1>
                    <div className="flex space-x-4">
                        <select
                            name="category"
                            value={filters.category}
                            onChange={handleFilterChange}
                            className="px-2 py-1 rounded"
                        >
                            <option value="">All Categories</option>
                            {/* Add category options */}
                        </select>
                        <input
                            type="text"
                            name="company"
                            placeholder="Company"
                            value={filters.company}
                            onChange={handleFilterChange}
                            className="px-2 py-1 rounded"
                        />
                        <input
                            type="number"
                            name="minPrice"
                            placeholder="Min Price"
                            value={filters.minPrice}
                            onChange={handleFilterChange}
                            className="px-2 py-1 rounded w-24"
                        />
                        <input
                            type="number"
                            name="maxPrice"
                            placeholder="Max Price"
                            value={filters.maxPrice}
                            onChange={handleFilterChange}
                            className="px-2 py-1 rounded w-24"
                        />
                        <input
                            type="number"
                            name="minRating"
                            placeholder="Min Rating"
                            value={filters.minRating}
                            onChange={handleFilterChange}
                            className="px-2 py-1 rounded w-24"
                        />
                        <label className="text-white flex items-center">
                            <input
                                type="checkbox"
                                name="availability"
                                checked={filters.availability}
                                onChange={handleFilterChange}
                                className="mr-2"
                            />
                            Available
                        </label>
                        <button
                            onClick={applyFilters}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Apply Filters
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;