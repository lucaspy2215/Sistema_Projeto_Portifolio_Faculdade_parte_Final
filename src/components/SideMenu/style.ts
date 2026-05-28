import { StyleSheet, Dimensions } from 'react-native';
import { themas } from '../../global/themes';

const { height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute', top: 0, left: 0,
    width: '100%', height: '100%', zIndex: 999,
  },
  overlay: {
    position: 'absolute', top: 0, left: 0,
    width: '100%', height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  menu: {
    position: 'absolute', top: 0, left: 0,
    height: '100%', backgroundColor: '#fff',
    shadowColor: '#000', shadowOpacity: 0.2,
    shadowRadius: 20, elevation: 10,
  },
  menuHeader: {
    backgroundColor: themas.color.primary,
    paddingTop: 60, paddingBottom: 28, paddingHorizontal: 24,
  },
  avatarBox: {
    width: 68, height: 68, borderRadius: 34,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center', justifyContent: 'center',
    marginBottom: 14, overflow: 'hidden',
    borderWidth: 2, borderColor: 'rgba(255,255,255,0.3)',
  },
  avatar: { width: 68, height: 68, borderRadius: 34 },
  menuName: { fontSize: 17, fontWeight: '700', color: '#fff', marginBottom: 4 },
  menuEmail: { fontSize: 13, color: 'rgba(255,255,255,0.7)' },
  menuItems: { flex: 1, paddingTop: 12, paddingHorizontal: 16 },
  menuItem: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 14, paddingHorizontal: 8,
    borderRadius: 12, marginBottom: 2, gap: 12,
  },
  menuItemIcon: {
    width: 36, height: 36, borderRadius: 10,
    backgroundColor: `${themas.color.secondary}30`,
    alignItems: 'center', justifyContent: 'center',
  },
  menuItemText: { flex: 1, fontSize: 15, color: '#333', fontWeight: '500' },
  menuDivider: { height: 1, backgroundColor: '#f0f0f0', marginVertical: 8 },
  logoutBtn: {
    flexDirection: 'row', alignItems: 'center',
    gap: 12, padding: 24, paddingBottom: 44,
    borderTopWidth: 1, borderTopColor: '#f0f0f0',
  },
  logoutText: { fontSize: 15, color: '#e74c3c', fontWeight: '600' },
});