import React, { useEffect, useState, useCallback } from 'react';
import {
    View, Text, SafeAreaView, ScrollView,
    TouchableOpacity, StatusBar, ActivityIndicator, RefreshControl,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { supabase } from '../../src/lib/supabase';
import { themas } from '../../src/global/themes';
import { style } from '../../src/pages/minha-agenda/style';

type Item = {
    id: string;
    kind: 'consulta' | 'exame';
    patient_name: string;
    type: string;
    doctor?: string;
    date: string;
    time: string;
    price: number;
    status: string;
};

export default function MinhaAgenda() {
    const router = useRouter();
    const [items, setItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    async function loadData() {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const [{ data: consultas }, { data: exames }] = await Promise.all([
            supabase.from('appointments').select('*').eq('patient_id', user.id).eq('status', 'agendado').order('created_at', { ascending: false }),
            supabase.from('exams').select('*').eq('patient_id', user.id).eq('status', 'agendado').order('created_at', { ascending: false }),
        ]);

        const merged: Item[] = [
            ...(consultas || []).map(c => ({ ...c, kind: 'consulta' as const })),
            ...(exames || []).map(e => ({ ...e, kind: 'exame' as const, type: e.type })),
        ];

        setItems(merged);
        setLoading(false);
        setRefreshing(false);
    }

    useEffect(() => { loadData(); }, []);

    const onRefresh = useCallback(() => { setRefreshing(true); loadData(); }, []);

    return (
        <SafeAreaView style={style.safeArea}>
            <StatusBar barStyle="light-content" backgroundColor={themas.color.primary} />

            <View style={style.header}>
                <TouchableOpacity style={style.backBtn} onPress={() => router.back()}>
                    <Ionicons name="chevron-back" size={22} color="#fff" />
                </TouchableOpacity>
                <Text style={style.headerTitle}>Minha agenda</Text>
                <Text style={style.headerSub}>PRÓXIMOS AGENDAMENTOS</Text>
            </View>

            {loading ? (
                <View style={style.center}>
                    <ActivityIndicator size="large" color={themas.color.primary} />
                </View>
            ) : (
                <ScrollView
                    contentContainerStyle={style.scrollContent}
                    showsVerticalScrollIndicator={false}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                >
                    {items.length === 0 ? (
                        <View style={style.emptyBox}>
                            <MaterialCommunityIcons name="calendar-blank-outline" size={64} color="#ccc" />
                            <Text style={style.emptyTitle}>Nenhum agendamento</Text>
                            <Text style={style.emptyText}>Você não tem consultas ou exames marcados.</Text>
                        </View>
                    ) : (
                        items.map((item) => (
                            <View key={item.id} style={style.card}>
                                <View style={style.cardHeader}>
                                    <View style={[style.badge, item.kind === 'consulta' ? style.badgeConsulta : style.badgeExame]}>
                                        <MaterialCommunityIcons
                                            name={item.kind === 'consulta' ? 'stethoscope' : 'flask-outline'}
                                            size={13} color="#fff"
                                        />
                                        <Text style={style.badgeText}>
                                            {item.kind === 'consulta' ? 'Consulta' : 'Exame'}
                                        </Text>
                                    </View>
                                    <View style={style.statusChip}>
                                        <View style={style.statusDot} />
                                        <Text style={style.statusText}>Agendado</Text>
                                    </View>
                                </View>

                                <Text style={style.cardType}>{item.type}</Text>
                                {item.doctor && (
                                    <View style={style.infoRow}>
                                        <MaterialCommunityIcons name="doctor" size={15} color={themas.color.gray} />
                                        <Text style={style.infoText}>{item.doctor}</Text>
                                    </View>
                                )}
                                <View style={style.infoRow}>
                                    <Ionicons name="calendar-outline" size={15} color={themas.color.gray} />
                                    <Text style={style.infoText}>{item.date}</Text>
                                </View>
                                <View style={style.infoRow}>
                                    <Ionicons name="time-outline" size={15} color={themas.color.gray} />
                                    <Text style={style.infoText}>{item.time}</Text>
                                </View>

                                <View style={style.cardFooter}>
                                    <Text style={style.price}>R$ {Number(item.price).toFixed(2)}</Text>
                                </View>
                            </View>
                        ))
                    )}
                </ScrollView>
            )}
        </SafeAreaView>
    );
}