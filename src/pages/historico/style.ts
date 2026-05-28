import { StyleSheet } from 'react-native';
import { themas } from '../../global/themes';

export const style = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f0f7f4' },

  header: {
    backgroundColor: themas.color.primary,
    paddingHorizontal: 24,
    paddingTop: 52,
    paddingBottom: 28,
  },
  backBtn: {
    width: 36, height: 36, borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center', justifyContent: 'center', marginBottom: 20,
  },
  headerTitle: { fontSize: 26, fontWeight: '700', color: '#fff', marginBottom: 4 },
  headerSub: { fontSize: 11, color: themas.color.secondary, fontWeight: '600', letterSpacing: 1.5 },

  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },

  scrollContent: { padding: 20, paddingBottom: 40, flexGrow: 1 },

  emptyBox: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 80 },
  emptyTitle: { fontSize: 18, fontWeight: '700', color: '#aaa', marginTop: 16 },
  emptyText: { fontSize: 14, color: '#bbb', marginTop: 6, textAlign: 'center' },

  card: {
    backgroundColor: '#fff',
    borderRadius: 18, padding: 18,
    marginBottom: 14,
    borderWidth: 1, borderColor: '#e8f4ef',
    shadowColor: themas.color.primary,
    shadowOpacity: 0.06, shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between', marginBottom: 12,
  },
  badge: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 10, paddingVertical: 4,
    borderRadius: 20, gap: 5,
  },
  badgeConsulta: { backgroundColor: themas.color.primary },
  badgeExame: { backgroundColor: '#2E6BAD' },
  badgeText: { fontSize: 12, color: '#fff', fontWeight: '600' },

  statusChip: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#e8f7ef',
    paddingHorizontal: 10, paddingVertical: 4,
    borderRadius: 20, gap: 5,
  },
  chipAgendado: { backgroundColor: '#e8f7ef' },
  chipConcluido: { backgroundColor: '#f0f0f0' },
  statusDot: {
    width: 7, height: 7, borderRadius: 4,
    backgroundColor: '#2ecc71',
  },
  dotConcluido: { backgroundColor: '#aaa' },
  statusText: { fontSize: 12, color: '#2ecc71', fontWeight: '600' },
  textConcluido: { color: '#aaa' },

  cardType: { fontSize: 16, fontWeight: '700', color: themas.color.primary, marginBottom: 10 },

  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 },
  infoText: { fontSize: 13, color: '#555' },

  cardFooter: {
    marginTop: 12, paddingTop: 12,
    borderTopWidth: 1, borderTopColor: '#f0f7f4',
    flexDirection: 'row', justifyContent: 'flex-end',
  },
  price: { fontSize: 15, fontWeight: '700', color: themas.color.primary },
});