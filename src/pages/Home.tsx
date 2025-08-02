import { useEffect, useState } from "react";
import axios from "axios";
import { themes } from "../theme/theme";
import { useTheme } from "../context/ThemeProvider";

/**
 * Product interface defines the shape of each product object
 * fetched from the fake store API.
 */
interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
}

/**
 * Home component fetches and displays a list of products from a fake store API.
 * It utilizes the current theme context to style product cards and buttons dynamically.
 */
export default function Home() {
  // State to store fetched products, initially empty array
  const [products, setProducts] = useState<Product[]>([]);
  
  // Loading state to show loading indicator while fetching data
  const [loading, setLoading] = useState(true);
  
  // Access current theme from theme context
  const { theme } = useTheme();

  // Retrieve button and card styles from the current theme's configuration
  const buttonClassname = themes[theme].button;
  const cardClassName = themes[theme].card;

  /**
   * useEffect to fetch product data when component mounts
   * using Axios to send GET request to the fake store API.
   * On response, update products state with received data.
   * Whether fulfilled or failed, finally set loading false.
   */
  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")  // API endpoint for dummy products
      .then((res) => setProducts(res.data))      // Update products state with API response
      .finally(() => setLoading(false));          // Stop loading spinner regardless of outcome
  }, []);

  return (
    <div className="col-span-full">
      {/* Page heading */}
      <h1 className="text-3xl font-bold mb-4">Welcome to Our Store</h1>

      {/* Introductory paragraph */}
      <p className="mb-6">
        Discover a range of dummy products fetched from a fake store API. Great
        for practicing frontend work with real data structure.
      </p>

      {/* Shop Now button styled according to the current theme */}
      <button className={`mb-8 ${buttonClassname}`}>
        Shop Now
      </button>

      {/* Conditional rendering: Show loading text if fetching, else show products grid */}
      {loading ? (
        // Loading indicator shown while data is being fetched
        <p>Loading...</p>
      ) : (
        // Grid container for product cards, responsive columns
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Map over fetched products and render each as a styled card */}
          {products.map((product) => (
            <div key={product.id} className={`${cardClassName}`}>
              {/* Product image, centered and constrained height with object-contain */}
              <img
                src={product.image}
                alt={product.title}
                className="h-40 object-contain mx-auto mb-4"
              />

              {/* Product title, bold, truncated if too long */}
              <h2 className="text-lg font-semibold mb-2 truncate">
                {product.title}
              </h2>

              {/* Product description, truncated to 2 lines using Tailwind line-clamp */}
              <p className="text-sm line-clamp-2 mb-2">
                {product.description}
              </p>

              {/* Product price with emphasis */}
              <p className="text-xl font-bold text-blue-700">
                ${product.price}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
