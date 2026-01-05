import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import SearchPage from './pages/SearchPage';
import PropertyPage from './pages/PropertyPage';
import Navbar from './components/Navbar';
// 1. Import the Footer
import Footer from './components/Footer';

function App() {
  // Central State for Favourites
  const [favourites, setFavourites] = useState([]);

  // Function to add a property to favourites
  const addToFavourites = (property) => {
    // Check for duplicates (Distinction criteria)
    if (!favourites.some(fav => fav.id === property.id)) {
      setFavourites([...favourites, property]);
    } else {
      alert("Property is already in your favourites!");
    }
  };

  // Function to remove
  const removeFromFavourites = (id) => {
    setFavourites(favourites.filter(prop => prop.id !== id));
  };

  // Function to clear all
  const clearFavourites = () => {
    setFavourites([]);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Router>
        {/* 2. Added 'flex flex-col' to make the layout vertical */}
        <div className="min-h-screen bg-gray-50 text-slate-900 font-sans flex flex-col">
          <Navbar />
          
          {/* 3. Wrapped Routes in 'main' with 'flex-grow' to push footer down */}
          <main className="flex-grow">
            <Routes>
              <Route 
                path="/" 
                element={
                  <SearchPage 
                    favourites={favourites} 
                    addToFavourites={addToFavourites} 
                    removeFromFavourites={removeFromFavourites}
                    clearFavourites={clearFavourites}
                  />
                } 
              />
              <Route 
                path="/property/:id" 
                element={
                  <PropertyPage 
                    addToFavourites={addToFavourites} 
                    favourites={favourites}
                  />
                } 
              />
            </Routes>
          </main>

          {/* 4. Added Footer at the bottom */}
          <Footer />
          
        </div>
      </Router>
    </DndProvider>
  );
}

export default App;