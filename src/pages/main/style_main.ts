import { StyleSheet } from 'react-native';
import { themas } from '../../global/themes';

export const style = StyleSheet.create({

  safeArea: {
    flex: 1,
    backgroundColor: themas.color.bgScreen,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 52,
    paddingBottom: 40,
    flexGrow: 1,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 20,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 50,
    paddingHorizontal: 14,
    height: 48,
    borderWidth: 1,
    borderColor: themas.color.lightGray,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: themas.color.primary,
    paddingVertical: 0,
  },
  menuBtn: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: themas.color.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  welcomeCard: {
    backgroundColor: themas.color.primary,
    borderRadius: 20,
    padding: 22,
    marginBottom: 14,
  },
  welcomeIconBox: {
    width: 46,
    height: 46,
    borderRadius: 13,
    backgroundColor: 'rgba(145, 245, 184, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(145, 245, 184, 0.3)',
  },
  welcomeLabel: {
    fontSize: 15,
    color: themas.color.secondary,
    fontWeight: '400',
    opacity: 0.9,
  },
  welcomeName: {
    fontSize: 24,
    color: '#fff',
    fontWeight: '700',
    marginTop: 2,
  },

  // ── Confirm Card ──────────────────────────────────────
  confirmCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 26,
    borderLeftWidth: 4,
    borderLeftColor: '#F0A500',
    borderWidth: 1,
    borderColor: themas.color.lightGray,
  },
  confirmCardGreen: {
    borderLeftColor: '#2ecc71',
    backgroundColor: '#f0fff6',
    borderColor: '#c3f0d6',
  },
  confirmCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  confirmBadge: {
    backgroundColor: '#F0A500',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
  },
  confirmBadgeGreen: {
    backgroundColor: '#2ecc71',
  },
  confirmBadgeText: {
    fontSize: 11,
    color: '#fff',
    fontWeight: '600',
  },
  confirmTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#C97A1A',
    marginBottom: 6,
  },
  confirmTitleGreen: {
    color: '#1a8a4a',
  },
  confirmRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  confirmDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#F0A500',
    marginTop: 4,
  },
  confirmDotGreen: {
    backgroundColor: '#2ecc71',
  },
  confirmText: {
    flex: 1,
    fontSize: 13,
    color: '#8A6020',
    lineHeight: 20,
  },
  confirmTextGreen: {
    color: '#1a6b3a',
  },

  sectionLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: themas.color.primary,
    marginBottom: 10,
    marginTop: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },

  // ── Modal ─────────────────────────────────────────────
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 24,
    paddingBottom: 44,
  },
  modalHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#ddd',
    alignSelf: 'center',
    marginBottom: 20,
  },
  modalIconBox: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: themas.color.primary,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 12,
  },
  modalIconBoxGreen: {
    backgroundColor: '#2ecc71',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: themas.color.primary,
    textAlign: 'center',
    marginBottom: 16,
  },
  modalDivider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginVertical: 16,
  },
  modalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 14,
  },
  modalRowIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: `${themas.color.secondary}30`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalLabel: {
    fontSize: 11,
    color: '#999',
    marginBottom: 2,
  },
  modalValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a3a2a',
  },
  modalConfirmBtn: {
    height: 52,
    borderRadius: 14,
    backgroundColor: themas.color.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 12,
  },
  modalConfirmText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '700',
  },
  modalCancelBtn: {
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalCancelText: {
    fontSize: 15,
    color: themas.color.gray,
  },
});