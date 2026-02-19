import { StyleSheet } from 'react-native';

const productDetailStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  image: {
    width: '100%',
    height: 300,
    backgroundColor: '#E2E8F0',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  title: {
    flex: 1,
    fontSize: 24,
    fontWeight: '600',
    color: '#0F172A',
  },
  favoriteButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(37, 99, 235, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  favoriteButtonActive: {
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
  },
  favoriteIcon: {
    fontSize: 22,
    color: '#EF4444',
  },
  price: {
    fontSize: 22,
    fontWeight: '600',
    color: '#2563EB',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
    color: '#475569',
    marginBottom: 12,
  },
  errorText: {
    marginTop: 24,
    textAlign: 'center',
    color: '#EF4444',
  },
});

export default productDetailStyles;
