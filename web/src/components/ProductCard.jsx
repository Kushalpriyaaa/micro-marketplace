import { Link } from 'react-router-dom';
import '../styles/productCard.css';

const ProductCard = ({ product, onFavoriteToggle, isFavorite = false }) => {
  const priceLabel = Number(product.price || 0).toFixed(2);

  return (
    <article className="product-card">
      <div className="product-card__media">
        <img src={product.image} alt={product.title} loading="lazy" />
        <button
          type="button"
          className={`product-card__favorite ${isFavorite ? 'is-active' : ''}`}
          onClick={() => onFavoriteToggle?.(product)}
          aria-pressed={isFavorite}
        >
          <span className="sr-only">{isFavorite ? 'Remove from favorites' : 'Add to favorites'}</span>
          ♥
        </button>
      </div>
      <div className="product-card__body">
        <h3>{product.title}</h3>
        <p className="product-card__price">${priceLabel}</p>
        <p className="product-card__description">{product.description}</p>
        <Link to={`/products/${product._id}`} className="product-card__link">
          View details
        </Link>
      </div>
    </article>
  );
};

export default ProductCard;
