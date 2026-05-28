import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { themas } from '../../global/themes';

// ── Tipos 
export type BarraItem = {
  iconName: string;
  iconBg: string;
  iconColor: string;
  title: string;
  subtitle: string;
  onPress?: () => void;
};

type BarrasProps = {
  items: BarraItem[];
};

// ── Componente 
export function Barras({ items }: BarrasProps) {
  return (
    <View>
      {items.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.menuItem}
          activeOpacity={0.75}
          onPress={item.onPress}
        >
          <View style={[styles.iconBox, { backgroundColor: item.iconBg }]}>
            <MaterialCommunityIcons name={item.iconName as any} size={22} color={item.iconColor} />
          </View>

          <View style={styles.textGroup}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subtitle}>{item.subtitle}</Text>
          </View>

          <View style={styles.chevronBox}>
            <Ionicons name="chevron-forward" size={16} color={themas.color.primary} />
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

// ── Estilos ───────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: themas.color.lightGray,
    shadowColor: themas.color.primary,
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  iconBox: {
    width: 46,
    height: 46,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  textGroup: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: themas.color.primary,
    marginBottom: 3,
  },
  subtitle: {
    fontSize: 12,
    color: themas.color.gray,
  },
  chevronBox: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: `${themas.color.secondary}40`,
    alignItems: 'center',
    justifyContent: 'center',
  },
});