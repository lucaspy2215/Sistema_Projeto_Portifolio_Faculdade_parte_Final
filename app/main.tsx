import React, { useState, useCallback } from 'react';
import {
    View, Text, TextInput, ScrollView, TouchableOpacity,
    SafeAreaView, StatusBar, Modal, ActivityIndicator, Alert,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter, useFocusEffect } from 'expo-router';

import { Barras, BarraItem } from '../src/components/barras';
import { SideMenu } from '../src/components/SideMenu';
import { themas } from '../src/global/themes';
import { supabase } from '../src/lib/supabase';
import { style } from '../src/pages/main/style_main';

// ── Tipos 

type NextAppointment = {
    id: string;
    kind: 'consulta' | 'exame';
    type: string;
    doctor?: string;
    date: string;
    time: string;
    price: number;
    status: string;
};

// ── Tela 

export default function Main() {
    const router = useRouter();

    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');
    const [menuVisible, setMenuVisible] = useState(false);
    const [next, setNext] = useState<NextAppointment | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [confirming, setConfirming] = useState(false);

    // ── Itens de navegação 

    const agendamentoItems: BarraItem[] = [
        {
            iconName: 'calendar-plus',
            iconBg: `${themas.color.secondary}30`,
            iconColor: themas.color.primary,
            title: 'Agendar consulta',
            subtitle: 'Geral ou especializada',
            onPress: () => router.push('/agendar-consulta'),
        },
        {
            iconName: 'calendar-arrow-right',
            iconBg: '#D6E4F5',
            iconColor: '#2E6BAD',
            title: 'Agendar exame',
            subtitle: 'Laboratorio ou imagem',
            onPress: () => router.push('/agendar-exame'),
        },
    ];

    const acompanhamentoItems: BarraItem[] = [
        {
            iconName: 'calendar-month',
            iconBg: '#FCE9D8',
            iconColor: '#D2722A',
            title: 'Minha agenda',
            subtitle: 'Próximos agendamentos',
            onPress: () => router.push('/minha-agenda'),
        },
        {
            iconName: 'calendar-clock',
            iconBg: '#EDE0F7',
            iconColor: '#8A4DB5',
            title: 'Histórico',
            subtitle: 'Consultas e exames anteriores',
            onPress: () => router.push('/historico'),
        },
    ];

    // ── Recarrega toda vez que a tela recebe foco 

    useFocusEffect(
        useCallback(() => {
            loadProfile();
            loadNextAppointment();
        }, [])
    );

    // ── Carregamento de dados 

    async function loadProfile() {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        setUserEmail(user.email || '');

        const metaName = user.user_metadata?.full_name;
        if (metaName) setUserName(metaName);

        const { data } = await supabase
            .from('profiles')
            .select('full_name, avatar_url')
            .eq('id', user.id)
            .maybeSingle();

        if (data?.full_name) setUserName(data.full_name);
        if (data?.avatar_url) setAvatarUrl(data.avatar_url);
    }

    async function loadNextAppointment() {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const [{ data: consultas }, { data: exames }] = await Promise.all([
            supabase.from('appointments').select('*')
                .eq('patient_id', user.id)
                .in('status', ['agendado', 'confirmado'])
                .order('created_at', { ascending: false })
                .limit(1),
            supabase.from('exams').select('*')
                .eq('patient_id', user.id)
                .in('status', ['agendado', 'confirmado'])
                .order('created_at', { ascending: false })
                .limit(1),
        ]);

        const all = [
            ...(consultas || []).map(c => ({ ...c, kind: 'consulta' as const })),
            ...(exames || []).map(e => ({ ...e, kind: 'exame' as const })),
        ];

        if (all.length > 0) setNext(all[0]);
        else setNext(null);
    }

    // ── Confirmar presença 

    async function handleConfirmarPresenca() {
        if (!next) return;
        setConfirming(true);

        const table = next.kind === 'consulta' ? 'appointments' : 'exams';
        const { error } = await supabase
            .from(table)
            .update({ status: 'confirmado' })
            .eq('id', next.id);

        setConfirming(false);

        if (error) {
            Alert.alert('Erro', 'Não foi possível confirmar presença.');
            return;
        }

        setNext(prev => prev ? { ...prev, status: 'confirmado' } : null);
        setModalVisible(false);
        Alert.alert('✅ Presença confirmada!', 'Sua presença foi registrada com sucesso.');
    }

    const isConfirmado = next?.status === 'confirmado';

    // ── Render 

    return (
        <SafeAreaView style={style.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor={themas.color.bgScreen} />

            <ScrollView
                style={style.scroll}
                contentContainerStyle={style.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Header com busca */}
                <View style={style.header}>
                    <View style={style.searchContainer}>
                        <Ionicons name="search" size={18} color={themas.color.gray} style={style.searchIcon} />
                        <TextInput
                            placeholder="Buscar consultas, médicos..."
                            placeholderTextColor={themas.color.gray}
                            style={style.searchInput}
                        />
                    </View>
                    <TouchableOpacity style={style.menuBtn} onPress={() => setMenuVisible(true)}>
                        <Ionicons name="menu" size={22} color="#fff" />
                    </TouchableOpacity>
                </View>

                {/* Card de boas-vindas */}
                <View style={style.welcomeCard}>
                    <View style={style.welcomeIconBox}>
                        <MaterialCommunityIcons name="heart-pulse" size={24} color={themas.color.secondary} />
                    </View>
                    <Text style={style.welcomeLabel}>Bem-vindo,</Text>
                    <Text style={style.welcomeName}>{userName || 'Carregando...'}</Text>
                </View>

                {/* Card de confirmação de presença */}
                {next ? (
                    <TouchableOpacity
                        style={[style.confirmCard, isConfirmado && style.confirmCardGreen]}
                        onPress={() => setModalVisible(true)}
                        activeOpacity={0.8}
                    >
                        <View style={style.confirmCardHeader}>
                            <Text style={[style.confirmTitle, isConfirmado && style.confirmTitleGreen]}>
                                {isConfirmado ? '✅ Presença confirmada' : 'Confirmação de presença'}
                            </Text>
                            <View style={[style.confirmBadge, isConfirmado && style.confirmBadgeGreen]}>
                                <Text style={style.confirmBadgeText}>Ver detalhes</Text>
                            </View>
                        </View>
                        <View style={style.confirmRow}>
                            <View style={[style.confirmDot, isConfirmado && style.confirmDotGreen]} />
                            <Text style={[style.confirmText, isConfirmado && style.confirmTextGreen]}>
                                {next.kind === 'consulta' ? 'Consulta' : 'Exame'} — {next.type} em {next.date} às {next.time}
                            </Text>
                        </View>
                    </TouchableOpacity>
                ) : (
                    <View style={[style.confirmCard, { opacity: 0.5 }]}>
                        <Text style={style.confirmTitle}>Nenhum agendamento pendente</Text>
                        <Text style={style.confirmText}>Você não tem consultas ou exames marcados.</Text>
                    </View>
                )}

                {/* Seções */}
                <Text style={style.sectionLabel}>Agendamento</Text>
                <Barras items={agendamentoItems} />

                <Text style={style.sectionLabel}>Acompanhamento</Text>
                <Barras items={acompanhamentoItems} />

            </ScrollView>

            {/* Modal de detalhes */}
            <Modal visible={modalVisible} transparent animationType="slide">
                <View style={style.modalOverlay}>
                    <View style={style.modalSheet}>
                        <View style={style.modalHandle} />

                        <View style={[style.modalIconBox, isConfirmado && style.modalIconBoxGreen]}>
                            <MaterialCommunityIcons
                                name={next?.kind === 'consulta' ? 'stethoscope' : 'flask-outline'}
                                size={28} color="#fff"
                            />
                        </View>

                        <Text style={style.modalTitle}>
                            {isConfirmado
                                ? '✅ Presença confirmada'
                                : `${next?.kind === 'consulta' ? 'Consulta' : 'Exame'} agendado`}
                        </Text>

                        <View style={style.modalDivider} />

                        <View style={style.modalRow}>
                            <View style={style.modalRowIcon}>
                                <MaterialCommunityIcons
                                    name={next?.kind === 'consulta' ? 'stethoscope' : 'flask-outline'}
                                    size={18} color={themas.color.primary}
                                />
                            </View>
                            <View>
                                <Text style={style.modalLabel}>Tipo</Text>
                                <Text style={style.modalValue}>{next?.type}</Text>
                            </View>
                        </View>

                        {next?.doctor && (
                            <View style={style.modalRow}>
                                <View style={style.modalRowIcon}>
                                    <MaterialCommunityIcons name="doctor" size={18} color={themas.color.primary} />
                                </View>
                                <View>
                                    <Text style={style.modalLabel}>Médico(a)</Text>
                                    <Text style={style.modalValue}>{next.doctor}</Text>
                                </View>
                            </View>
                        )}

                        <View style={style.modalRow}>
                            <View style={style.modalRowIcon}>
                                <Ionicons name="calendar-outline" size={18} color={themas.color.primary} />
                            </View>
                            <View>
                                <Text style={style.modalLabel}>Data</Text>
                                <Text style={style.modalValue}>{next?.date}</Text>
                            </View>
                        </View>

                        <View style={style.modalRow}>
                            <View style={style.modalRowIcon}>
                                <Ionicons name="time-outline" size={18} color={themas.color.primary} />
                            </View>
                            <View>
                                <Text style={style.modalLabel}>Horário</Text>
                                <Text style={style.modalValue}>{next?.time}</Text>
                            </View>
                        </View>

                        <View style={style.modalRow}>
                            <View style={style.modalRowIcon}>
                                <Ionicons name="location-outline" size={18} color={themas.color.primary} />
                            </View>
                            <View>
                                <Text style={style.modalLabel}>Local</Text>
                                <Text style={style.modalValue}>Clínica +Saúde — Av. Principal, 100</Text>
                            </View>
                        </View>

                        <View style={style.modalRow}>
                            <View style={style.modalRowIcon}>
                                <Ionicons name="cash-outline" size={18} color={themas.color.primary} />
                            </View>
                            <View>
                                <Text style={style.modalLabel}>Valor</Text>
                                <Text style={style.modalValue}>R$ {Number(next?.price || 0).toFixed(2)}</Text>
                            </View>
                        </View>

                        <View style={style.modalDivider} />

                        {!isConfirmado && (
                            <TouchableOpacity
                                style={style.modalConfirmBtn}
                                onPress={handleConfirmarPresenca}
                                disabled={confirming}
                            >
                                {confirming
                                    ? <ActivityIndicator color="#fff" />
                                    : <>
                                        <Ionicons name="checkmark-circle-outline" size={20} color="#fff" />
                                        <Text style={style.modalConfirmText}>Confirmar presença</Text>
                                    </>
                                }
                            </TouchableOpacity>
                        )}

                        <TouchableOpacity style={style.modalCancelBtn} onPress={() => setModalVisible(false)}>
                            <Text style={style.modalCancelText}>Fechar</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </Modal>

            {/* Menu lateral */}
            <SideMenu
                visible={menuVisible}
                onClose={() => setMenuVisible(false)}
                userName={userName}
                userEmail={userEmail}
                avatarUrl={avatarUrl}
            />

        </SafeAreaView>
    );
}