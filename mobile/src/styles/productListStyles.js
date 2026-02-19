import { StyleSheet } from 'react-native';

const productListStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#CBD5F5',
    fontSize: 16,
  },
  searchButton: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 12,
    marginLeft: 12,
  },
  searchButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  listContent: {
    paddingTop: 4,
    paddingBottom: 24,
  },
  loadingWrapper: {
    marginTop: 48,
    alignItems: 'center',
  },
  errorText: {
    marginTop: 24,
    textAlign: 'center',
    color: '#EF4444',
  },
});

export default productListStyles;
