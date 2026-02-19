import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Text, View } from 'react-native';
import productListStyles from '../styles/productListStyles';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

const ProductListScreen = ({ navigation }) => {
  const { logout } = useAuth();
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [pendingFavoriteIds, setPendingFavoriteIds] = useState([]);

  const fetchFavorites = async () => {
    try {
      const response = await api.get('/favorites');
      const ids = (response.data?.favorites || []).map((item) => item._id);
      setFavorites(ids);
    } catch (err) {
      if (err.response?.status === 401) {
        await logout();
      }
    }
  };

  const fetchProducts = async (query) => {
    setLoading(true);
    setError('');

    try {
      const response = await api.get('/products', {
        params: {
          search: query,
          page: 1,
          limit: 6,
        },
      });

      setProducts(response.data?.products || []);
    } catch (err) {
      const message = err.response?.data?.message || 'Unable to load products right now.';
      setError(message);
      Alert.alert('Error', message);
      if (err.response?.status === 401) {
        await logout();
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts('');
    fetchFavorites();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchProducts(searchTerm);
      fetchFavorites();
    });

    return unsubscribe;
  }, [navigation, searchTerm]);

  const handleSearch = (query) => {
    setSearchTerm(query);
    fetchProducts(query);
  };

  const handleProductPress = (product) => {
    const isFavorite = favorites.includes(product._id);
    navigation.navigate('ProductDetail', {
      productId: product._id,
      initialFavorite: isFavorite,
    });
  };

  const handleToggleFavorite = async (product) => {
    const productId = product._id;

    if (pendingFavoriteIds.includes(productId)) {
      return;
    }

    const nextPending = [...pendingFavoriteIds, productId];
    setPendingFavoriteIds(nextPending);

    const isFavorite = favorites.includes(productId);

    try {
      if (isFavorite) {
        await api.delete(`/favorites/${productId}`);
        setFavorites((prev) => prev.filter((id) => id !== productId));
      } else {
        await api.post(`/favorites/${productId}`);
        setFavorites((prev) => [...prev, productId]);
      }
    } catch (err) {
      const message = err.response?.data?.message || 'Unable to update favorites.';
      Alert.alert('Favorite update failed', message);
      if (err.response?.status === 401) {
        await logout();
      }
    } finally {
      setPendingFavoriteIds((prev) => prev.filter((id) => id !== productId));
    }
  };

  const renderItem = ({ item }) => (
    <ProductCard
      product={item}
      onPress={handleProductPress}
      onToggleFavorite={handleToggleFavorite}
      isFavorite={favorites.includes(item._id)}
      disabled={pendingFavoriteIds.includes(item._id)}
    />
  );

  const emptyComponent = () => (
    <View style={productListStyles.loadingWrapper}>
      <Text style={{ color: '#475569' }}>No products found.</Text>
    </View>
  );

  return (
    <View style={productListStyles.container}>
      <SearchBar value={searchTerm} onSearch={handleSearch} />

      {error ? <Text style={productListStyles.errorText}>{error}</Text> : null}

      {loading ? (
        <View style={productListStyles.loadingWrapper}>
          <ActivityIndicator size="large" color="#2563EB" />
        </View>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          contentContainerStyle={productListStyles.listContent}
          ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
          ListEmptyComponent={error ? undefined : emptyComponent}
        />
      )}
    </View>
  );
};

export default ProductListScreen;
