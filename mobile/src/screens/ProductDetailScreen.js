import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import productDetailStyles from '../styles/productDetailStyles';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

const ProductDetailScreen = ({ route }) => {
  const { productId, initialFavorite } = route.params;
  const { logout } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isFavorite, setIsFavorite] = useState(Boolean(initialFavorite));
  const [updatingFavorite, setUpdatingFavorite] = useState(false);

  const loadProduct = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await api.get(`/products/${productId}`);
      setProduct(response.data?.product || null);
    } catch (err) {
      const message = err.response?.data?.message || 'Unable to load this product.';
      setError(message);
      if (err.response?.status === 401) {
        await logout();
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProduct();
  }, [productId]);

  const handleToggleFavorite = async () => {
    if (updatingFavorite) {
      return;
    }

    setUpdatingFavorite(true);

    try {
      if (isFavorite) {
        await api.delete(`/favorites/${productId}`);
        setIsFavorite(false);
      } else {
        await api.post(`/favorites/${productId}`);
        setIsFavorite(true);
      }
    } catch (err) {
      const message = err.response?.data?.message || 'Unable to update favorite status.';
      Alert.alert('Favorite update failed', message);
      if (err.response?.status === 401) {
        await logout();
      }
    } finally {
      setUpdatingFavorite(false);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <Text style={productDetailStyles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!product) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <Text style={productDetailStyles.errorText}>Product not found.</Text>
      </View>
    );
  }

  const priceLabel = Number(product.price || 0).toFixed(2);

  return (
    <ScrollView style={productDetailStyles.container}>
      {product.image ? (
        <Image source={{ uri: product.image }} style={productDetailStyles.image} resizeMode="cover" />
      ) : (
        <View style={[productDetailStyles.image, { alignItems: 'center', justifyContent: 'center' }]}>
          <Text style={{ color: '#64748B' }}>No image available</Text>
        </View>
      )}

      <View style={productDetailStyles.content}>
        <View style={productDetailStyles.titleRow}>
          <Text style={productDetailStyles.title}>{product.title}</Text>
          <TouchableOpacity
            style={[
              productDetailStyles.favoriteButton,
              isFavorite && productDetailStyles.favoriteButtonActive,
            ]}
            onPress={handleToggleFavorite}
            disabled={updatingFavorite}
            activeOpacity={0.85}
          >
            <Text style={productDetailStyles.favoriteIcon}>♥</Text>
          </TouchableOpacity>
        </View>

        <Text style={productDetailStyles.price}>${priceLabel}</Text>
        <Text style={productDetailStyles.description}>{product.description}</Text>
      </View>
    </ScrollView>
  );
};

export default ProductDetailScreen;
