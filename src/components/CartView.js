// src/components/CartView.js
import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import productsData from '../data/products.json';

const CartView = ({ onReturn, onOrder }) => {
  const { cart, clearCart } = useContext(CartContext);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    cardNumber: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: ''
  });

  const [errors, setErrors] = useState({});

  const TAX_RATE = 0.07; // 7% tax

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validate form fields
  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required.';
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Valid email is required.';
    if (!/^\d{16}$/.test(formData.cardNumber)) newErrors.cardNumber = 'Card number must be 16 digits.';
    if (!formData.address1.trim()) newErrors.address1 = 'Address Line 1 is required.';
    if (!formData.city.trim()) newErrors.city = 'City is required.';
    if (!formData.state.trim()) newErrors.state = 'State is required.';
    if (!/^\d{5}$/.test(formData.zip)) newErrors.zip = 'ZIP code must be 5 digits.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleOrder = (e) => {
    e.preventDefault();
    if (validate()) {
      // Prepare order data
      const orderedItems = Object.entries(cart).map(([productId, quantity]) => {
        const product = productsData.find((p) => p.id === parseInt(productId));
        return { ...product, quantity };
      });
      const total = orderedItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
      const tax = total * TAX_RATE;
      const grandTotal = total + tax;

      // Mask card number (show last 4 digits)
      const maskedCard = '**** **** **** ' + formData.cardNumber.slice(-4);

      const orderInfo = {
        items: orderedItems,
        total: total.toFixed(2),
        tax: tax.toFixed(2),
        grandTotal: grandTotal.toFixed(2),
        user: {
          fullName: formData.fullName,
          email: formData.email,
          cardNumber: maskedCard,
          address1: formData.address1,
          address2: formData.address2,
          city: formData.city,
          state: formData.state,
          zip: formData.zip
        }
      };

      clearCart();
      onOrder(orderInfo);
    }
  };

  // Prepare cart items
  const cartItems = Object.entries(cart).map(([productId, quantity]) => {
    const product = productsData.find((p) => p.id === parseInt(productId));
    return { ...product, quantity };
  });

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = total * TAX_RATE;
  const grandTotal = total + tax;

  return (
    <div>
      <h1 className="mb-4">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <table className="table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price (Each)</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mb-3">
            <h4>Summary</h4>
            <p>Total: ${total.toFixed(2)}</p>
            <p>Tax (7%): ${tax.toFixed(2)}</p>
            <p><strong>Grand Total: ${grandTotal.toFixed(2)}</strong></p>
          </div>
          <h4>Payment Information</h4>
          <form onSubmit={handleOrder} noValidate>
            <div className="mb-3">
              <label htmlFor="fullName" className="form-label">Full Name*</label>
              <input
                type="text"
                className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
              />
              {errors.fullName && <div className="invalid-feedback">{errors.fullName}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email*</label>
              <input
                type="email"
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="cardNumber" className="form-label">Card Number*</label>
              <input
                type="text"
                className={`form-control ${errors.cardNumber ? 'is-invalid' : ''}`}
                id="cardNumber"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                maxLength="16"
              />
              {errors.cardNumber && <div className="invalid-feedback">{errors.cardNumber}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="address1" className="form-label">Address Line 1*</label>
              <input
                type="text"
                className={`form-control ${errors.address1 ? 'is-invalid' : ''}`}
                id="address1"
                name="address1"
                value={formData.address1}
                onChange={handleChange}
              />
              {errors.address1 && <div className="invalid-feedback">{errors.address1}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="address2" className="form-label">Address Line 2</label>
              <input
                type="text"
                className="form-control"
                id="address2"
                name="address2"
                value={formData.address2}
                onChange={handleChange}
              />
            </div>
            <div className="row">
              <div className="col-md-4 mb-3">
                <label htmlFor="city" className="form-label">City*</label>
                <input
                  type="text"
                  className={`form-control ${errors.city ? 'is-invalid' : ''}`}
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                />
                {errors.city && <div className="invalid-feedback">{errors.city}</div>}
              </div>
              <div className="col-md-4 mb-3">
                <label htmlFor="state" className="form-label">State*</label>
                <input
                  type="text"
                  className={`form-control ${errors.state ? 'is-invalid' : ''}`}
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                />
                {errors.state && <div className="invalid-feedback">{errors.state}</div>}
              </div>
              <div className="col-md-4 mb-3">
                <label htmlFor="zip" className="form-label">ZIP Code*</label>
                <input
                  type="text"
                  className={`form-control ${errors.zip ? 'is-invalid' : ''}`}
                  id="zip"
                  name="zip"
                  value={formData.zip}
                  onChange={handleChange}
                  maxLength="5"
                />
                {errors.zip && <div className="invalid-feedback">{errors.zip}</div>}
              </div>
            </div>
            <button type="submit" className="btn btn-success">Order</button>
            <button type="button" className="btn btn-secondary ms-2" onClick={onReturn}>
              Return
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default CartView;
