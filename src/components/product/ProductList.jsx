'use client';

import { useState, useEffect, useRef } from 'react';
import ProductCard from './ProductCard';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { FaFilter, FaTimes, FaSearch } from 'react-icons/fa';

export default function ProductList({ initialProducts, selectedCategory }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const productListRef = useRef(null);
  // Make sure products are visible by default
  const isInView = useInView(productListRef, { once: true, amount: 0.1, initialInView: true });
  
  // Initialize products from props
  useEffect(() => {
    if (initialProducts && initialProducts.length > 0) {
      setProducts(initialProducts);
      setFilteredProducts(initialProducts);
    }
  }, [initialProducts]);
  
  // Check for touch device on client-side only
  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window);
  }, []);
  
  const [filters, setFilters] = useState({
    category: selectedCategory || '',
    minPrice: '',
    maxPrice: '',
    inStock: false,
    sortBy: 'newest',
  });
  
  // Update filters when selectedCategory changes
  useEffect(() => {
    if (selectedCategory !== filters.category) {
      setFilters(prev => ({
        ...prev,
        category: selectedCategory || ''
      }));
    }
  }, [selectedCategory]);
  

  // Apply filters whenever they change
  useEffect(() => {
    if (!products || products.length === 0) return;
    
    let result = [...products];
    console.log('Starting filtering with', result.length, 'products');
    console.log('Current filters:', filters);
    
    // Filter by category (case-insensitive)
    if (filters.category && filters.category !== '') {
      console.log('Filtering by category:', filters.category);
      result = result.filter(product => {
        if (!product.category) {
          console.log(`Product ${product.name} has no category, excluding`);
          return false;
        }
        
        const productCategory = product.category.toLowerCase();
        const filterCategory = filters.category.toLowerCase();
        
        // Special handling for research chemicals
        if (filterCategory === 'research chemicals') {
          const matches = productCategory === 'research chemicals';
          console.log(`Research chemicals filter: ${product.name} (${productCategory}) matches? ${matches}`);
          return matches;
        }
        
        // Direct match for all other categories
        const matches = productCategory === filterCategory;
        console.log(`Category filter: ${product.name} (${productCategory}) matches ${filterCategory}? ${matches}`);
        return matches;
      });
    } else {
      console.log('No category filter applied, showing all products');
    }
    
    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(product => 
        (product.name && product.name.toLowerCase().includes(query)) ||
        (product.description && product.description.toLowerCase().includes(query)) ||
        (product.category && product.category.toLowerCase().includes(query))
      );
    }

    // Filter by price range
    if (filters.minPrice !== '') {
      result = result.filter(product => {
        // Use product.price if priceVariants doesn't exist
        if (!product.priceVariants) {
          return product.price >= Number(filters.minPrice);
        }
        
        const lowestPrice = product.priceVariants.reduce(
          (min, variant) => (variant.price < min ? variant.price : min),
          product.priceVariants[0]?.price || 0
        );
        return lowestPrice >= Number(filters.minPrice);
      });
    }

    if (filters.maxPrice !== '') {
      result = result.filter(product => {
        // Use product.price if priceVariants doesn't exist
        if (!product.priceVariants) {
          return product.price <= Number(filters.maxPrice);
        }
        
        const lowestPrice = product.priceVariants.reduce(
          (min, variant) => (variant.price < min ? variant.price : min),
          product.priceVariants[0]?.price || 0
        );
        return lowestPrice <= Number(filters.maxPrice);
      });
    }

    // Filter by stock
    if (filters.inStock) {
      result = result.filter(product => product.countInStock > 0);
    }

    // Sort products
    switch (filters.sortBy) {
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'price-low-high':
        result.sort((a, b) => {
          // Use product.price if priceVariants doesn't exist
          const aPrice = a.priceVariants ? a.priceVariants.reduce(
            (min, variant) => (variant.price < min ? variant.price : min),
            a.priceVariants[0]?.price || 0
          ) : (a.price || 0);
          
          const bPrice = b.priceVariants ? b.priceVariants.reduce(
            (min, variant) => (variant.price < min ? variant.price : min),
            b.priceVariants[0]?.price || 0
          ) : (b.price || 0);
          
          return aPrice - bPrice;
        });
        break;
      case 'price-high-low':
        result.sort((a, b) => {
          // Use product.price if priceVariants doesn't exist
          const aPrice = a.priceVariants ? a.priceVariants.reduce(
            (min, variant) => (variant.price < min ? variant.price : min),
            a.priceVariants[0]?.price || 0
          ) : (a.price || 0);
          
          const bPrice = b.priceVariants ? b.priceVariants.reduce(
            (min, variant) => (variant.price < min ? variant.price : min),
            b.priceVariants[0]?.price || 0
          ) : (b.price || 0);
          
          return bPrice - aPrice;
        });
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    setFilteredProducts(result);
  }, [filters, products, searchQuery]);

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Log the filter change for debugging
    console.log(`Filter changed: ${name} = ${value}`);
    
    // Special handling for category changes
    if (name === 'category') {
      // When selecting All Categories, reset to empty string
      const categoryValue = value === '' ? '' : value;
      
      // Update URL with the new category if possible
      if (typeof window !== 'undefined') {
        const url = new URL(window.location.href);
        if (categoryValue) {
          url.searchParams.set('category', categoryValue);
        } else {
          url.searchParams.delete('category');
        }
        
        // Reload the page to get fresh products from the server
        // This ensures we get all products when All Categories is selected
        window.location.href = url.toString();
        return; // Stop here since we're reloading the page
      }
      
      setFilters({
        ...filters,
        category: categoryValue
      });
    } else {
      // Handle other filter changes normally
      setFilters({
        ...filters,
        [name]: type === 'checkbox' ? checked : value,
      });
    }
  };

  const clearFilters = () => {
    // Reset filters to default values
    setFilters({
      category: '',
      minPrice: '',
      maxPrice: '',
      inStock: false,
      sortBy: 'newest',
    });
    
    // Reset URL parameters and reload page to get all products
    if (typeof window !== 'undefined') {
      // Create a new URL without any search parameters
      const url = new URL(window.location.pathname, window.location.origin);
      window.location.href = url.toString();
    }
  };

  return (
    <div ref={productListRef} className="relative">
      {/* Search + controls bar */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-bone-faint" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            className="field pl-9"
          />
          {searchQuery && (
            <button
              className="absolute right-3 top-1/2 -translate-y-1/2 text-bone-faint hover:text-volt"
              onClick={() => setSearchQuery('')}
              aria-label="Clear search"
            >
              <FaTimes className="text-xs" />
            </button>
          )}
        </div>

        <select
          name="sortBy"
          value={filters.sortBy}
          onChange={handleFilterChange}
          className="field cursor-pointer sm:w-56"
        >
          <option value="newest">Newest</option>
          <option value="price-low-high">Price: Low to High</option>
          <option value="price-high-low">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
        </select>

        {/* Mobile filter toggle */}
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="btn-ghost md:hidden"
        >
          {isFilterOpen ? <><FaTimes className="h-3 w-3" /> Close</> : <><FaFilter className="h-3 w-3" /> Filters</>}
        </button>
      </div>

      <div className="flex flex-col gap-6 md:flex-row">
        {/* Filters sidebar */}
        <AnimatePresence>
          {(isFilterOpen || !isTouchDevice) && (
            <motion.aside
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="cell flex-shrink-0 overflow-hidden p-5 md:w-56"
            >
              <div className="mb-5 flex items-center justify-between border-b border-line pb-4">
                <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-bone">Filters</h2>
                <button
                  onClick={clearFilters}
                  className="font-mono text-[11px] uppercase tracking-[0.14em] text-bone-faint transition-colors hover:text-volt"
                >
                  Clear all
                </button>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="field-label">Category</label>
                  <select
                    name="category"
                    value={filters.category}
                    onChange={handleFilterChange}
                    className="field cursor-pointer"
                  >
                    <option value="">All Categories</option>
                    <option value="k2-paper-sheets">K2 Paper Sheets</option>
                    <option value="k2-liquid-spray">K2 Liquid Spray</option>
                    <option value="k2-powder">K2 Powder</option>
                    <option value="etomidate">Etomidate</option>
                    <option value="vapes-kpods">Vapes / K-Pods</option>
                  </select>
                </div>

                <div>
                  <label className="field-label">Price Range</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      name="minPrice"
                      placeholder="Min"
                      value={filters.minPrice}
                      onChange={handleFilterChange}
                      className="field w-1/2"
                    />
                    <input
                      type="number"
                      name="maxPrice"
                      placeholder="Max"
                      value={filters.maxPrice}
                      onChange={handleFilterChange}
                      className="field w-1/2"
                    />
                  </div>
                </div>

                <label className="flex cursor-pointer items-center gap-2.5 text-sm text-bone-muted">
                  <input
                    type="checkbox"
                    name="inStock"
                    checked={filters.inStock}
                    onChange={handleFilterChange}
                    className="checkbox"
                  />
                  In Stock Only
                </label>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Product grid */}
        <div className="flex-1">
          <div className="mb-5 flex items-center justify-between">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-bone-muted">
              <span className="text-volt">{filteredProducts.length}</span>{' '}
              {filteredProducts.length === 1 ? 'item' : 'items'}
              {searchQuery && <span className="text-bone-faint"> / &ldquo;{searchQuery}&rdquo;</span>}
            </p>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product._id || index}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: Math.min(index, 10) * 0.04 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="cell p-12 text-center">
              <p className="mb-2 font-display text-base font-bold uppercase tracking-wide text-bone">
                No products found
              </p>
              <p className="mb-6 text-sm text-bone-muted">Try adjusting your filters or search term.</p>
              <button onClick={clearFilters} className="btn-volt">
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
