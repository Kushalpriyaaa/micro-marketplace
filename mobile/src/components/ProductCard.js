import { Image, Pressable, Text, View } from 'react-native';
import styles from '../styles/productCardStyles';

const ProductCard = ({ product, onPress, onToggleFavorite, isFavorite, disabled }) => {
  const handleFavoritePress = (event) => {
    event.stopPropagation();
    if (!disabled) {
      onToggleFavorite(product);
    }
  };

  const priceLabel = Number(product.price || 0).toFixed(2);

  return (
    <Pressable style={styles.card} onPress={() => onPress(product)}>
      {product.image ? (
        <Image source={{ uri: product.image }} style={styles.image} resizeMode="cover" />
      ) : (
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>No image</Text>
        </View>
      )}
      <View style={styles.content}>
        <View style={styles.headerRow}>
          <Text numberOfLines={1} style={styles.title}>
            {product.title}
          </Text>
          <Pressable
            onPress={handleFavoritePress}
            style={[
              styles.heartButton,
              isFavorite && styles.heartButtonActive,
              disabled && styles.heartButtonDisabled,
            ]}
            android_disableSound
            disabled={disabled}
          >
            <Text style={styles.heartIcon}>♥</Text>
          </Pressable>
        </View>
        <Text style={styles.price}>${priceLabel}</Text>
        <Text numberOfLines={2} style={styles.description}>
          {product.description}
        </Text>
      </View>
    </Pressable>
  );
};

export default ProductCard;
