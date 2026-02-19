import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import apiClient from '../api/axios.js';
import { useAuth } from '../context/AuthContext.jsx';
import '../styles/login.css';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data } = await apiClient.post('/auth/login', form);
      login(data);
      const redirectPath = location.state?.from || '/products';
      navigate(redirectPath, { replace: true });
    } catch (err) {
      const message = err.response?.data?.message || 'Invalid email or password';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-page">
      <h1>Log in</h1>
      <form className="auth-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
          minLength={6}
        />

        {error && (
          <p className="auth-form__error" role="alert">
            {error}
          </p>
        )}

        <button type="submit" disabled={loading}>
          {loading ? 'Signing in…' : 'Log in'}
        </button>
      </form>

      <p className="auth-page__hint">
        Need an account? <Link to="/register">Register here</Link>.
      </p>
    </section>
  );
};

export default Login;
