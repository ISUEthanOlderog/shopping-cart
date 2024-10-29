// src/components/ItemCard.js
import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const ItemCard = ({ product }) => {
  const { cart, addToCart, removeFromCart } = useContext(CartContext);
  const quantity = cart[product.id] || 0;

  return (
    <div className="card h-100">
      <img
        src={product.image}
        className="card-img-top"
        alt={product.name}
        style={{ objectFit: 'cover', height: '200px' }}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">${product.price.toFixed(2)}</p>
        <div className="mt-auto d-flex align-items-center">
          <button
            className="btn btn-secondary me-2"
            onClick={() => removeFromCart(product.id)}
            disabled={quantity === 0}
          >
            <i className="bi bi-dash"></i>
          </button>
          <input
            type="text"
            className="form-control text-center"
            value={quantity}
            readOnly
            style={{ width: '60px' }}
          />
          <button
            className="btn btn-secondary ms-2"
            onClick={() => addToCart(product.id)}
          >
            <i className="bi bi-plus"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
