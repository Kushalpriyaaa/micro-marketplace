import { useEffect, useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import productListStyles from '../styles/productListStyles';

const SearchBar = ({ value, onSearch }) => {
  const [term, setTerm] = useState(value || '');

  useEffect(() => {
    setTerm(value || '');
  }, [value]);

  const handleSubmit = () => {
    if (onSearch) {
      onSearch(term.trim());
    }
  };

  return (
    <View style={productListStyles.searchContainer}>
      <TextInput
        style={productListStyles.searchInput}
        placeholder="Search products"
        value={term}
        onChangeText={setTerm}
        returnKeyType="search"
        onSubmitEditing={handleSubmit}
      />
      <Pressable style={productListStyles.searchButton} onPress={handleSubmit}>
        <Text style={productListStyles.searchButtonText}>Search</Text>
      </Pressable>
    </View>
  );
};

export default SearchBar;
