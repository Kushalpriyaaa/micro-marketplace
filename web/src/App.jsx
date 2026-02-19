import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import Navbar from './components/Navbar.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Products from './pages/Products.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <Navbar />
      <main className="app-shell">
        <Routes>
          <Route path="/" element={<Navigate to="/products" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/products"
            element={(
              <ProtectedRoute>
                <Products />
              </ProtectedRoute>
            )}
          />
          <Route
            path="/products/:id"
            element={(
              <ProtectedRoute>
                <ProductDetail />
              </ProtectedRoute>
            )}
          />
          <Route path="*" element={<Navigate to="/products" replace />} />
        </Routes>
      </main>
    </BrowserRouter>
  </AuthProvider>
);

export default App;
