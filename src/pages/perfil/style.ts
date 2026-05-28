import { StyleSheet } from 'react-native';
import { themas } from '../../global/themes';

export const style = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: themas.color.primary },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },

  header: {
    flexDirection: 'row', justifyContent: 'space-between',
    paddingHorizontal: 24, paddingTop: 52, paddingBottom: 8,
  },
  backBtn: {
    width: 36, height: 36, borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center', justifyContent: 'center',
  },
  editBtn: {
    width: 36, height: 36, borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center', justifyContent: 'center',
  },
  scrollContent: { flexGrow: 1, paddingBottom: 40 },

  avatarSection: { alignItems: 'center', paddingTop: 16, paddingBottom: 32 },
  avatarBox: {
    width: 100, height: 100, borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center', justifyContent: 'center',
    marginBottom: 14, overflow: 'visible',
    borderWidth: 3, borderColor: 'rgba(255,255,255,0.3)',
  },
  avatar: { width: 100, height: 100, borderRadius: 50 },
  cameraBtn: {
    position: 'absolute', bottom: 0, right: 0,
    width: 28, height: 28, borderRadius: 14,
    backgroundColor: themas.color.secondary,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: '#fff',
  },
  avatarName: { fontSize: 20, fontWeight: '700', color: '#fff', marginBottom: 4 },
  avatarEmail: { fontSize: 13, color: 'rgba(255,255,255,0.7)' },

  card: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 28, borderTopRightRadius: 28,
    padding: 24, minHeight: 400,
  },
  infoRow: {
    flexDirection: 'row', alignItems: 'center',
    gap: 14, paddingVertical: 14,
    borderBottomWidth: 1, borderBottomColor: '#f0f7f4',
  },
  infoIcon: {
    width: 38, height: 38, borderRadius: 11,
    backgroundColor: `${themas.color.secondary}30`,
    alignItems: 'center', justifyContent: 'center',
  },
  infoLabel: { fontSize: 11, color: '#999', marginBottom: 2 },
  infoValue: { fontSize: 15, fontWeight: '500', color: '#1a3a2a' },

  saveBtn: {
    height: 52, borderRadius: 14,
    backgroundColor: themas.color.primary,
    alignItems: 'center', justifyContent: 'center', marginTop: 24,
  },
  saveBtnText: { fontSize: 16, color: '#fff', fontWeight: '700' },
});