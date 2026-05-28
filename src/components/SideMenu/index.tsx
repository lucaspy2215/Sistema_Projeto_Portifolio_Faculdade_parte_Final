import React, { useEffect, useRef } from 'react';
import {
    View, Text, TouchableOpacity, Animated,
    Dimensions, TouchableWithoutFeedback, Image,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { supabase } from '../../lib/supabase';
import { themas } from '../../global/themes';
import { styles } from './style';

const { width } = Dimensions.get('window');
const MENU_WIDTH = width * 0.75;

type Props = {
    visible: boolean;
    onClose: () => void;
    userName: string;
    userEmail: string;
    avatarUrl?: string;
};

export function SideMenu({ visible, onClose, userName, userEmail, avatarUrl }: Props) {
    const router = useRouter();
    const translateX = useRef(new Animated.Value(-MENU_WIDTH)).current;
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (visible) {
            Animated.parallel([
                Animated.timing(translateX, { toValue: 0, duration: 280, useNativeDriver: true }),
                Animated.timing(opacity, { toValue: 1, duration: 280, useNativeDriver: true }),
            ]).start();
        } else {
            Animated.parallel([
                Animated.timing(translateX, { toValue: -MENU_WIDTH, duration: 220, useNativeDriver: true }),
                Animated.timing(opacity, { toValue: 0, duration: 220, useNativeDriver: true }),
            ]).start();
        }
    }, [visible]);

    async function handleLogout() {
        onClose();
        await supabase.auth.signOut();
    }

    function navigate(route: string) {
        onClose();
        setTimeout(() => router.push(route as any), 250);
    }

    if (!visible) return null;

    return (
        <View style={styles.wrapper}>
            <TouchableWithoutFeedback onPress={onClose}>
                <Animated.View style={[styles.overlay, { opacity }]} />
            </TouchableWithoutFeedback>

            <Animated.View style={[styles.menu, { width: MENU_WIDTH, transform: [{ translateX }] }]}>

                {/* Header do menu */}
                <View style={styles.menuHeader}>
                    <View style={styles.avatarBox}>
                        {avatarUrl
                            ? <Image source={{ uri: avatarUrl }} style={styles.avatar} />
                            : <MaterialCommunityIcons name="account" size={36} color="#fff" />}
                    </View>
                    <Text style={styles.menuName} numberOfLines={1}>{userName}</Text>
                    <Text style={styles.menuEmail} numberOfLines={1}>{userEmail}</Text>
                </View>

                {/* Itens */}
                <View style={styles.menuItems}>
                    <TouchableOpacity style={styles.menuItem} onPress={() => navigate('/perfil')}>
                        <View style={styles.menuItemIcon}>
                            <Ionicons name="person-outline" size={20} color={themas.color.primary} />
                        </View>
                        <Text style={styles.menuItemText}>Meu perfil</Text>
                        <Ionicons name="chevron-forward" size={16} color="#ccc" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuItem} onPress={() => navigate('/minha-agenda')}>
                        <View style={styles.menuItemIcon}>
                            <Ionicons name="calendar-outline" size={20} color={themas.color.primary} />
                        </View>
                        <Text style={styles.menuItemText}>Minha agenda</Text>
                        <Ionicons name="chevron-forward" size={16} color="#ccc" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuItem} onPress={() => navigate('/historico')}>
                        <View style={styles.menuItemIcon}>
                            <MaterialCommunityIcons name="history" size={20} color={themas.color.primary} />
                        </View>
                        <Text style={styles.menuItemText}>Histórico</Text>
                        <Ionicons name="chevron-forward" size={16} color="#ccc" />
                    </TouchableOpacity>

                    <View style={styles.menuDivider} />

                    <TouchableOpacity style={styles.menuItem}>
                        <View style={styles.menuItemIcon}>
                            <Ionicons name="notifications-outline" size={20} color={themas.color.primary} />
                        </View>
                        <Text style={styles.menuItemText}>Notificações</Text>
                        <Ionicons name="chevron-forward" size={16} color="#ccc" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuItem}>
                        <View style={styles.menuItemIcon}>
                            <Ionicons name="settings-outline" size={20} color={themas.color.primary} />
                        </View>
                        <Text style={styles.menuItemText}>Configurações</Text>
                        <Ionicons name="chevron-forward" size={16} color="#ccc" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuItem}>
                        <View style={styles.menuItemIcon}>
                            <Ionicons name="help-circle-outline" size={20} color={themas.color.primary} />
                        </View>
                        <Text style={styles.menuItemText}>Ajuda</Text>
                        <Ionicons name="chevron-forward" size={16} color="#ccc" />
                    </TouchableOpacity>
                </View>

                {/* Sair */}
                <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
                    <Ionicons name="log-out-outline" size={20} color="#e74c3c" />
                    <Text style={styles.logoutText}>Sair</Text>
                </TouchableOpacity>

            </Animated.View>
        </View>
    );
}