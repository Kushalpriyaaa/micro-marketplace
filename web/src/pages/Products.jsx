import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import apiClient from '../api/axios.js';
import { useAuth } from '../context/AuthContext.jsx';
import ProductCard from '../components/ProductCard.jsx';
import Pagination from '../components/Pagination.jsx';
import SearchBar from '../components/SearchBar.jsx';
import '../styles/products.css';

const PAGE_SIZE = 6;

const Products = () => {
  const { isAuthenticated } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState(() => new Set());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [pagination, setPagination] = useState({ total: 0, page: 1, pages: 1 });

  const searchTerm = searchParams.get('search') ?? '';
  const currentPage = useMemo(() => {
    const parsed = Number(searchParams.get('page'));
    return Number.isNaN(parsed) || parsed < 1 ? 1 : parsed;
  }, [searchParams]);

  const fetchFavorites = useCallback(async () => {
    if (!isAuthenticated) {
      setFavoriteIds(new Set());
      return;
    }

    const { data } = await apiClient.get('/api/favorites');
    const ids = (data.favorites || []).map((item) => item._id);
    setFavoriteIds(new Set(ids));
  }, [isAuthenticated]);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const { data } = await apiClient.get('/api/products', {
        params: {
          search: searchTerm,
          page: currentPage,
          limit: PAGE_SIZE,
        },
      });

      setProducts(data.products || []);
      setPagination({
        total: data.total || 0,
        page: data.page || 1,
        pages: data.pages || 1,
      });

      await fetchFavorites();
    } catch (err) {
      const message = err.response?.data?.message || 'Could not load products';
      setError(message);
      setProducts([]);
      setPagination({ total: 0, page: 1, pages: 1 });
    } finally {
      setLoading(false);
    }
  }, [currentPage, fetchFavorites, searchTerm]);

  useEffect(() => {
    // Refetch whenever query params change.
    fetchProducts();
  }, [fetchProducts]);

  const handleSearch = (term) => {
    const params = {};
    if (term) {
      params.search = term;
    }
    params.page = '1';
    setSearchParams(params, { replace: true });
  };

  const handlePageChange = (nextPage) => {
    const params = {};
    if (searchTerm) {
      params.search = searchTerm;
    }
    params.page = String(nextPage);
    setSearchParams(params, { replace: true });
  };

  const handleFavoriteToggle = async (product) => {
    const productId = product._id;
    const isFavorite = favoriteIds.has(productId);

    try {
      setError('');
      if (isFavorite) {
        await apiClient.delete(`/api/favorites/${productId}`);
        setFavoriteIds((prev) => {
          const next = new Set(prev);
          next.delete(productId);
          return next;
        });
      } else {
        await apiClient.post(`/api/favorites/${productId}`);
        setFavoriteIds((prev) => new Set(prev).add(productId));
      }
    } catch (err) {
      const message = err.response?.data?.message || 'Unable to update favorites';
      setError(message);
    }
  };

  if (loading) {
    return (
      <section className="products-page">
        <p className="page-status">Loading products…</p>
      </section>
    );
  }

  return (
    <section className="products-page">
      <SearchBar initialValue={searchTerm} onSearch={handleSearch} />
      {error && (
        <p className="page-status page-status--error" role="alert">
          {error}
        </p>
      )}
      {products.length ? (
        <>
          <div className="products-grid">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onFavoriteToggle={handleFavoriteToggle}
                isFavorite={favoriteIds.has(product._id)}
              />
            ))}
          </div>
          <Pagination
            page={pagination.page}
            totalPages={pagination.pages}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <p className="page-status">No products found.</p>
      )}
    </section>
  );
};

export default Products;
