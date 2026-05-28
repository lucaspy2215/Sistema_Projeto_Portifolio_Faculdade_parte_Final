import { StyleSheet } from 'react-native';
import { themas } from '../../global/themes';

export const style = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: themas.color.primary },
  scrollContent: { flexGrow: 1, paddingBottom: 40 },

  header: {
    paddingHorizontal: 24,
    paddingTop: 52,
    paddingBottom: 40,
    overflow: 'hidden',
  },
  backBtn: {
    width: 36, height: 36, borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center', justifyContent: 'center',
    marginBottom: 24,
  },
  headerBgIcon: { position: 'absolute', right: -10, top: 20 },
  headerTitle: { fontSize: 28, fontWeight: '700', color: '#fff', marginBottom: 4 },
  headerSub: { fontSize: 11, color: themas.color.secondary, fontWeight: '600', letterSpacing: 1.5 },

  card: {
    backgroundColor: '#f0f7f4',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 24,
    minHeight: 500,
  },

  fieldLabel: {
    marginLeft: 4, color: '#333',
    marginTop: 16, marginBottom: 6,
    fontSize: 13, fontWeight: '500',
  },
  selectBox: {
    width: '100%', height: 48, borderRadius: 10,
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    borderWidth: 1, borderColor: '#d0e8dc',
  },
  selectDisabled: { opacity: 0.4 },
  selectText: { flex: 1, fontSize: 14, color: '#1a3a2a' },
  selectPlaceholder: { color: '#aaa' },

  checkRow: {
    flexDirection: 'row', alignItems: 'center',
    marginTop: 10, marginLeft: 4, gap: 8,
  },
  checkbox: {
    width: 18, height: 18, borderRadius: 4,
    borderWidth: 1.5, borderColor: themas.color.primary,
    alignItems: 'center', justifyContent: 'center',
  },
  checkboxActive: { backgroundColor: themas.color.primary },
  checkLabel: { fontSize: 13, color: '#555' },

  row: { flexDirection: 'row' },

  button: {
    height: 52, borderRadius: 14,
    backgroundColor: themas.color.primary,
    alignItems: 'center', justifyContent: 'center',
    marginTop: 28,
  },
  buttonText: { fontSize: 16, color: '#fff', fontWeight: '700' },

  modalOverlay: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24, borderTopRightRadius: 24,
    padding: 24, paddingBottom: 44,
  },
  modalHandle: {
    width: 40, height: 4, borderRadius: 2,
    backgroundColor: '#ddd', alignSelf: 'center', marginBottom: 20,
  },
  modalTitle: {
    fontSize: 16, fontWeight: '700',
    color: themas.color.primary, marginBottom: 16,
  },
  modalOption: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1, borderBottomColor: '#f0f0f0',
  },
  modalOptionText: { flex: 1, fontSize: 15, color: '#333' },
});