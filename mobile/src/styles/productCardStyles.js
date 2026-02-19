import { StyleSheet } from 'react-native';

const productCardStyles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    overflow: 'hidden',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.1,
    shadowRadius: 18,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 160,
    backgroundColor: '#E2E8F0',
  },
  placeholder: {
    width: '100%',
    height: 160,
    backgroundColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    color: '#64748B',
    fontSize: 14,
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: '#0F172A',
    marginRight: 12,
  },
  heartButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(37, 99, 235, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heartButtonActive: {
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
  },
  heartButtonDisabled: {
    opacity: 0.6,
  },
  heartIcon: {
    fontSize: 20,
    color: '#EF4444',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2563EB',
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: '#475569',
    marginBottom: 4,
  },
});

export default productCardStyles;
