import { StyleSheet } from 'react-native';
import { themas } from '../../global/themes';

export const style = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: themas.color.primary },
  scrollContent: { flexGrow: 1, paddingBottom: 40 },

  header: { paddingHorizontal: 24, paddingTop: 52, paddingBottom: 40 },
  backBtn: {
    width: 36, height: 36, borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center', justifyContent: 'center', marginBottom: 24,
  },
  headerTitle: { fontSize: 28, fontWeight: '700', color: '#fff', marginBottom: 4 },
  headerSub: { fontSize: 11, color: themas.color.secondary, fontWeight: '600', letterSpacing: 1.5 },

  card: {
    backgroundColor: '#fff', marginHorizontal: 20,
    borderRadius: 20, padding: 20, marginBottom: 16,
    borderWidth: 1, borderColor: '#e8f4ef',
  },
  cardTitle: { fontSize: 15, fontWeight: '700', color: themas.color.primary, marginBottom: 16 },

  detailRow: {
    flexDirection: 'row', alignItems: 'flex-start',
    paddingVertical: 12,
    borderBottomWidth: 1, borderBottomColor: '#f0f7f4', gap: 12,
  },
  detailIconBox: {
    width: 36, height: 36, borderRadius: 10,
    backgroundColor: `${themas.color.secondary}30`,
    alignItems: 'center', justifyContent: 'center',
  },
  detailLabel: { fontSize: 12, color: '#999', marginBottom: 2 },
  detailValue: { fontSize: 14, color: '#1a3a2a', fontWeight: '500' },
  detailSub: { fontSize: 12, color: '#888', marginTop: 2 },

  recomCard: {
    backgroundColor: '#fff', marginHorizontal: 20,
    borderRadius: 20, padding: 20, marginBottom: 24,
    borderWidth: 1, borderColor: '#e8f4ef',
  },
  recomTitle: { fontSize: 14, fontWeight: '700', color: themas.color.primary, marginBottom: 12 },
  recomRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginBottom: 8 },
  recomDot: {
    width: 7, height: 7, borderRadius: 4,
    backgroundColor: themas.color.secondary, marginTop: 5,
  },
  recomText: { flex: 1, fontSize: 13, color: '#555', lineHeight: 18 },

  button: {
    height: 52, borderRadius: 14,
    backgroundColor: themas.color.primary,
    alignItems: 'center', justifyContent: 'center', marginHorizontal: 20,
  },
  buttonText: { fontSize: 16, color: '#fff', fontWeight: '700' },

  confirmOverlay: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center', justifyContent: 'center', padding: 30,
  },
  confirmModal: {
    backgroundColor: themas.color.primary,
    borderRadius: 24, padding: 28,
    width: '100%', alignItems: 'center', position: 'relative',
  },
  confirmClose: {
    position: 'absolute', top: 16, right: 16,
    width: 30, height: 30, borderRadius: 15,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center', justifyContent: 'center',
  },
  confirmIconBox: {
    width: 68, height: 68, borderRadius: 34,
    backgroundColor: themas.color.secondary,
    alignItems: 'center', justifyContent: 'center',
    marginBottom: 20, marginTop: 10,
  },
  confirmTitle: {
    fontSize: 22, fontWeight: '700', color: '#fff',
    textAlign: 'center', marginBottom: 10, lineHeight: 30,
  },
  confirmSub: {
    fontSize: 14, color: 'rgba(255,255,255,0.7)',
    textAlign: 'center', lineHeight: 22, marginBottom: 24,
  },
  confirmBtn: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 12, paddingVertical: 12, paddingHorizontal: 32,
  },
  confirmBtnText: { color: '#fff', fontWeight: '600', fontSize: 14 },
});