import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import '../styles/navbar.css';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <header className="navbar">
      <Link to="/products" className="navbar__brand">
        Micro Marketplace
      </Link>
      <nav className="navbar__links">
        <NavLink to="/products" className={({ isActive }) => (isActive ? 'active' : '')}>
          Products
        </NavLink>
      </nav>
      <div className="navbar__auth">
        {isAuthenticated ? (
          <>
            <span className="navbar__user">{user?.name}</span>
            <button type="button" onClick={handleLogout} className="navbar__logout">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register" className="navbar__cta">
              Register
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;
