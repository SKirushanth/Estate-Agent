import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Lenis from "lenis";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import SearchPage from "./pages/SearchPage";
import PropertyPage from "./pages/PropertyPage";
import Navbar from "./components/Navbar";
// 1. Import the Footer
import Footer from "./components/Footer";

const FAVOURITES_STORAGE_KEY = "estate-agent-favourites";

function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}

function App() {
  // Central State for Favourites
  const [favourites, setFavourites] = useState(() => {
    try {
      const stored = localStorage.getItem(FAVOURITES_STORAGE_KEY);
      if (!stored) return [];

      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      return undefined;
    }

    const lenis = new Lenis({
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.2,
      lerp: 0.08,
    });

    let rafId;

    const raf = (time) => {
      lenis.raf(time);
      rafId = window.requestAnimationFrame(raf);
    };

    rafId = window.requestAnimationFrame(raf);

    return () => {
      window.cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    localStorage.setItem(FAVOURITES_STORAGE_KEY, JSON.stringify(favourites));
  }, [favourites]);

  // Function to add a property to favourites
  const addToFavourites = (property) => {
    // Check for duplicates (Distinction criteria)
    setFavourites((prevFavourites) => {
      if (prevFavourites.some((fav) => fav.id === property.id)) {
        alert("Property is already in your favourites!");
        return prevFavourites;
      }

      return [...prevFavourites, property];
    });
  };

  // Function to remove
  const removeFromFavourites = (id) => {
    setFavourites((prevFavourites) =>
      prevFavourites.filter((prop) => prop.id !== id),
    );
  };

  // Function to clear all
  const clearFavourites = () => {
    setFavourites([]);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Router
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <ScrollToTop />
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
