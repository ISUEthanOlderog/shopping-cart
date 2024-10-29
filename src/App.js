// src/App.js
import React, { useState } from 'react';
import BrowseView from './components/BrowseView';
import CartView from './components/CartView';
import ConfirmationView from './components/ConfirmationView';

function App() {
  // Manage current view: 'browse', 'cart', 'confirmation'
  const [currentView, setCurrentView] = useState('browse');

  // Data to pass to confirmation view
  const [orderData, setOrderData] = useState(null);

  // Handlers to switch views
  const goToBrowse = () => setCurrentView('browse');
  const goToCart = () => setCurrentView('cart');
  const goToConfirmation = (data) => {
    setOrderData(data);
    setCurrentView('confirmation');
  };

  return (
    <div className="container my-4">
      {currentView === 'browse' && <BrowseView onCheckout={goToCart} />}
      {currentView === 'cart' && (
        <CartView onReturn={goToBrowse} onOrder={goToConfirmation} />
      )}
      {currentView === 'confirmation' && (
        <ConfirmationView orderData={orderData} onNewOrder={goToBrowse} />
      )}
    </div>
  );
}

export default App;
