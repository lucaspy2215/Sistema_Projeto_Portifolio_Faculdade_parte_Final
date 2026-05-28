import React, { useState } from 'react';
import {
    View, Text, SafeAreaView, ScrollView,
    TouchableOpacity, Modal, StatusBar, ActivityIndicator, Alert,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { supabase } from '../../src/lib/supabase';
import { style } from '../../src/pages/agendar-consulta/resumo';
import { themas } from '../../src/global/themes';

type DetailRowProps = {
    icon: string;
    lib: 'ion' | 'mci';
    label: string;
    value: string;
    sub?: string;
    highlight?: boolean;
};

function DetailRow({ icon, lib, label, value, sub, highlight }: DetailRowProps) {
    return (
        <View style={style.detailRow}>
            <View style={style.detailIconBox}>
                {lib === 'ion'
                    ? <Ionicons name={icon as any} size={18} color={themas.color.primary} />
                    : <MaterialCommunityIcons name={icon as any} size={18} color={themas.color.primary} />}
            </View>
            <View style={{ flex: 1 }}>
                <Text style={style.detailLabel}>{label}</Text>
                <Text style={style.detailValue}>{value}</Text>
                {sub && (
                    <Text style={[style.detailSub, highlight && { color: themas.color.primary, fontWeight: '600' }]}>
                        {sub}
                    </Text>
                )}
            </View>
        </View>
    );
}

export default function Resumo() {
    const router = useRouter();
    const { nome, cpf, tipo, medico, data, horario } = useLocalSearchParams<{
        nome: string; cpf: string; tipo: string;
        medico: string; data: string; horario: string;
    }>();

    const [loading, setLoading] = useState(false);
    const [confirmado, setConfirmado] = useState(false);

    async function handleConfirmar() {
        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();

        const { error } = await supabase.from('appointments').insert({
            patient_id: user?.id,
            patient_name: nome,
            cpf, type: tipo, doctor: medico,
            date: data, time: horario, price: 150,
        });

        setLoading(false);

        if (error) {
            Alert.alert('Erro', 'Não foi possível confirmar o agendamento.');
            return;
        }

        setConfirmado(true);
    }

    return (
        <SafeAreaView style={style.safeArea}>
            <StatusBar barStyle="light-content" backgroundColor={themas.color.primary} />
            <ScrollView contentContainerStyle={style.scrollContent} showsVerticalScrollIndicator={false}>

                <View style={style.header}>
                    <TouchableOpacity style={style.backBtn} onPress={() => router.back()}>
                        <Ionicons name="chevron-back" size={22} color="#fff" />
                    </TouchableOpacity>
                    <Text style={style.headerTitle}>Resumo</Text>
                    <Text style={style.headerSub}>CONFIRA OS DADOS</Text>
                </View>

                <View style={style.card}>
                    <Text style={style.cardTitle}>Detalhes da consulta</Text>
                    <DetailRow lib="ion" icon="person-outline" label="Paciente" value={nome} />
                    <DetailRow lib="mci" icon="stethoscope" label="Tipo de consulta" value={tipo} />
                    <DetailRow lib="mci" icon="doctor" label="Médico(a)" value={medico} />
                    <DetailRow lib="ion" icon="calendar-outline" label="Data e Horário"
                        value={data} sub={`${horario} - Duração aprox. 30 min`} highlight />
                    <DetailRow lib="ion" icon="cash-outline" label="Valor da consulta" value="R$ 150,00" />
                </View>

                <View style={style.recomCard}>
                    <Text style={style.recomTitle}>Recomendações</Text>
                    {[
                        'Chegue com 10 minutos de antecedência',
                        'Traga documento de identificação',
                        'Em caso de cancelamento, avisar com 2h de antecedência',
                    ].map((r, i) => (
                        <View key={i} style={style.recomRow}>
                            <View style={style.recomDot} />
                            <Text style={style.recomText}>{r}</Text>
                        </View>
                    ))}
                </View>

                <TouchableOpacity style={style.button} onPress={handleConfirmar} disabled={loading}>
                    {loading
                        ? <ActivityIndicator color="#fff" />
                        : <Text style={style.buttonText}>Confirma</Text>}
                </TouchableOpacity>

            </ScrollView>

            {/* Modal confirmação */}
            <Modal visible={confirmado} transparent animationType="fade">
                <View style={style.confirmOverlay}>
                    <View style={style.confirmModal}>
                        <TouchableOpacity style={style.confirmClose} onPress={() => router.replace('/main')}>
                            <Ionicons name="close" size={18} color="#fff" />
                        </TouchableOpacity>
                        <View style={style.confirmIconBox}>
                            <Ionicons name="checkmark" size={36} color="#fff" />
                        </View>
                        <Text style={style.confirmTitle}>Agendamento{'\n'}confirmado!</Text>
                        <Text style={style.confirmSub}>Você receberá um lembrete{'\n'}1h antes</Text>
                        <TouchableOpacity style={style.confirmBtn} onPress={() => router.replace('/main')}>
                            <Text style={style.confirmBtnText}>Voltar ao início</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}