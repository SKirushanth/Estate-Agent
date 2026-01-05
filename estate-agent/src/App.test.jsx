import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
// FIXED IMPORTS: Changed from "../" to "./" to match your file location
import SearchPage from './pages/SearchPage';
import PropertyCard from './components/PropertyCard';

const TestWrapper = ({ children }) => (
  <DndProvider backend={HTML5Backend}>
    <BrowserRouter>
      {children}
    </BrowserRouter>
  </DndProvider>
);

const mockProperty = {
  id: "prop1",
  type: "house",
  price: 500000,
  bedrooms: 3,
  postcode: "BR1",
  description: "Beautiful Family Home",
  location: "Bromley",
  images: ["img1.jpg"]
};

describe('Prestige Estate Agent Tests', () => {

  it('renders the Search Page hero section correctly', () => {
    render(
      <TestWrapper>
        <SearchPage favourites={[]} addToFavourites={() => {}} removeFromFavourites={() => {}} clearFavourites={() => {}} />
      </TestWrapper>
    );
    expect(screen.getByText(/Find Your Dream Home/i)).toBeInTheDocument();
    expect(screen.getByText(/Find Your Perfect Property/i)).toBeInTheDocument();
  });

  it('updates the postcode filter input when typed', () => {
    render(
      <TestWrapper>
        <SearchPage favourites={[]} addToFavourites={() => {}} removeFromFavourites={() => {}} clearFavourites={() => {}} />
      </TestWrapper>
    );
    
    const postcodeInput = screen.getByPlaceholderText(/E.G. BR1, NW1/i);
    fireEvent.change(postcodeInput, { target: { value: 'NW1' } });
    
    expect(postcodeInput.value).toBe('NW1');
  });

  it('displays property price and description correctly', () => {
    render(
      <TestWrapper>
        <PropertyCard property={mockProperty} />
      </TestWrapper>
    );

    expect(screen.getByText('£500,000')).toBeInTheDocument();
    expect(screen.getByText('Beautiful Family Home')).toBeInTheDocument();
  });

  it('shows the correct number of favourites in sidebar', () => {
    const mockFavourites = [mockProperty]; 

    render(
      <TestWrapper>
        <SearchPage favourites={mockFavourites} addToFavourites={() => {}} removeFromFavourites={() => {}} clearFavourites={() => {}} />
      </TestWrapper>
    );

    expect(screen.getByText(/Favourites \(1\)/i)).toBeInTheDocument();
  });

  it('clears filters when Reset button is clicked', () => {
    render(
      <TestWrapper>
        <SearchPage favourites={[]} addToFavourites={() => {}} removeFromFavourites={() => {}} clearFavourites={() => {}} />
      </TestWrapper>
    );

    const postcodeInput = screen.getByPlaceholderText(/E.G. BR1, NW1/i);
    fireEvent.change(postcodeInput, { target: { value: 'SE1' } });
    expect(postcodeInput.value).toBe('SE1');

    const resetButton = screen.getByText(/Reset Filters/i);
    fireEvent.click(resetButton);

    expect(postcodeInput.value).toBe('');
  });

});