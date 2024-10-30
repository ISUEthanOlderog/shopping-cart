// src/components/ConfirmationView.js
import React from 'react';

const ConfirmationView = ({ orderData, onNewOrder }) => {
  if (!orderData) return null;

  const { items, total, tax, grandTotal, user } = orderData;

  return (
    <div>
      <h1 className="mb-4">Order Confirmation</h1>
      <h4>Thank you for your purchase, {user.fullName}!</h4>
      <div className="mt-4">
        <h5>Order Summary</h5>
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
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>{item.quantity}</td>
                <td>${item.price.toFixed(2)}</td>
                <td>${(item.price * item.quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>Total: ${total}</p>
        <p>Tax: ${tax}</p>
        <p>
          <strong>Grand Total: ${grandTotal}</strong>
        </p>
      </div>
      <div className="mt-4">
        <h5>Shipping Information</h5>
        <p>
          <strong>Name:</strong> {user.fullName}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Address:</strong> {user.address1}
          {user.address2 && `, ${user.address2}`}, {user.city}, {user.state} {user.zip}
        </p>
        <p>
          <strong>Card Number:</strong> {user.cardNumber}
        </p>
      </div>
      <button className="btn btn-primary mt-4" onClick={onNewOrder}>
        Back to Browse
      </button>
    </div>
  );
};

export default ConfirmationView;
