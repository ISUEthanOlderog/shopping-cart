// src/components/BrowseView.js
import React, { useState, useEffect } from 'react';
import ItemCard from './ItemCard';
import productsData from '../data/products.json';

const BrowseView = ({ onCheckout }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(productsData);

  useEffect(() => {
    const lowercasedFilter = searchTerm.toLowerCase();
    const filtered = productsData.filter((product) =>
      product.name.toLowerCase().includes(lowercasedFilter)
    );
    setFilteredProducts(filtered);
  }, [searchTerm]);

  const clearSearch = () => setSearchTerm('');

  return (
    <div>
      <h1 className="mb-4">Browse Products</h1>
      <div className="mb-3 d-flex">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="btn btn-outline-secondary" onClick={clearSearch}>
          Clear
        </button>
      </div>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {filteredProducts.map((product) => (
          <div className="col" key={product.id}>
            <ItemCard product={product} />
          </div>
        ))}
        {filteredProducts.length === 0 && (
          <p className="mt-4">No products match your search.</p>
        )}
      </div>
      <button className="btn btn-primary mt-4" onClick={onCheckout}>
        Checkout
      </button>
    </div>
  );
};

export default BrowseView;
