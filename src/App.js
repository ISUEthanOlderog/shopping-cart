// src/App.js
import React, { useState } from 'react';
import BrowseView from './components/BrowseView';
import CartView from './components/CartView';
import ConfirmationView from './components/ConfirmationView';

function App() {
  const [currentView, setCurrentView] = useState('browse');
  const [orderData, setOrderData] = useState(null);

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
