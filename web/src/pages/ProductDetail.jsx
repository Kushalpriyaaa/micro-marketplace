import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiClient from '../api/axios.js';
import '../styles/productDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [favoriteError, setFavoriteError] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      setError('');
      setFavoriteError('');

      try {
        const { data } = await apiClient.get(`/api/products/${id}`);
        setProduct(data.product);

        try {
          const favoritesResponse = await apiClient.get('/api/favorites');
          const ids = (favoritesResponse.data.favorites || []).map((item) => item._id);
          setIsFavorite(ids.includes(data.product._id));
        } catch (_) {
          setIsFavorite(false);
        }
      } catch (err) {
        const message = err.response?.data?.message || 'Unable to fetch product';
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const handleFavoriteToggle = async () => {
    if (!product) {
      return;
    }

    try {
      if (isFavorite) {
        await apiClient.delete(`/api/favorites/${product._id}`);
        setIsFavorite(false);
      } else {
        await apiClient.post(`/api/favorites/${product._id}`);
        setIsFavorite(true);
      }
      setFavoriteError('');
    } catch (err) {
      const message = err.response?.data?.message || 'Unable to update favorite';
      setFavoriteError(message);
    }
  };

  if (loading) {
    return <p className="page-status">Loading product…</p>;
  }

  if (error) {
    return (
      <p className="page-status page-status--error" role="alert">
        {error}
      </p>
    );
  }

  if (!product) {
    return <p className="page-status page-status--error">Product not found.</p>;
  }

  const price = Number(product.price || 0).toFixed(2);

  return (
    <article className="product-detail">
      <div className="product-detail__media">
        <img src={product.image} alt={product.title} loading="lazy" />
      </div>
      <div className="product-detail__body">
        <div className="product-detail__header">
          <h1>{product.title}</h1>
          <button
            type="button"
            className={`product-detail__favorite ${isFavorite ? 'is-active' : ''}`}
            onClick={handleFavoriteToggle}
            aria-pressed={isFavorite}
          >
            <span className="sr-only">{isFavorite ? 'Remove from favorites' : 'Add to favorites'}</span>
            ♥
          </button>
        </div>
        <p className="product-detail__price">${price}</p>
        <p>{product.description}</p>
        {favoriteError && (
          <p className="page-status page-status--error" role="alert">
            {favoriteError}
          </p>
        )}
      </div>
    </article>
  );
};

export default ProductDetail;
