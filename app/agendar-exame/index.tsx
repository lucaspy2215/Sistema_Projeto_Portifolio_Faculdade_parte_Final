import React, { useState } from 'react';
import {
    View, Text, SafeAreaView, ScrollView,
    TouchableOpacity, Modal, StatusBar, Alert,
} from 'react-native';
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import { Input } from '../../src/components/Input';
import { style } from '../../src/pages/agendar-exame/style';
import { themas } from '../../src/global/themes';
import { supabase } from '../../src/lib/supabase';

// ── Constantes ────────────────────────────────────────────────────────────

const EXAMES = [
    'Hemograma completo',
    'Glicemia em jejum',
    'Colesterol total',
    'Raio-X tórax',
    'Ultrassom abdominal',
    'Eletrocardiograma',
    'Tomografia',
    'Ressonância magnética',
];

const HORARIOS = [
    '07:00', '07:30', '08:00', '08:30', '09:00', '09:30',
    '10:00', '10:30', '11:00', '11:30', '13:00', '13:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
];

function generateDates() {
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    const weekdays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    const today = new Date();
    const dates: { label: string; full: string }[] = [];

    for (let i = 1; i <= 20; i++) {
        const d = new Date(today);
        d.setDate(today.getDate() + i);
        if (d.getDay() !== 0 && d.getDay() !== 6) {
            dates.push({
                label: `${d.getDate()} ${months[d.getMonth()]}`,
                full: `${weekdays[d.getDay()]}, ${d.getDate()} de ${months[d.getMonth()]}`,
            });
        }
    }
    return dates;
}

const DATAS = generateDates();

// ── Componente SelectModal ────────────────────────────────────────────────

type SelectModalProps = {
    visible: boolean;
    title: string;
    options: string[];
    onSelect: (v: string) => void;
    onClose: () => void;
};

function SelectModal({ visible, title, options, onSelect, onClose }: SelectModalProps) {
    return (
        <Modal visible={visible} transparent animationType="slide">
            <TouchableOpacity style={style.modalOverlay} onPress={onClose} activeOpacity={1}>
                <View style={style.modalSheet}>
                    <View style={style.modalHandle} />
                    <Text style={style.modalTitle}>{title}</Text>

                    {options.map((opt) => (
                        <TouchableOpacity
                            key={opt}
                            style={style.modalOption}
                            onPress={() => { onSelect(opt); onClose(); }}
                        >
                            <Text style={style.modalOptionText}>{opt}</Text>
                            <Ionicons name="chevron-forward" size={16} color={themas.color.primary} />
                        </TouchableOpacity>
                    ))}
                </View>
            </TouchableOpacity>
        </Modal>
    );
}

// ── Helpers ───────────────────────────────────────────────────────────────

function formatCPF(value: string) {
    const d = value.replace(/\D/g, '').slice(0, 11);
    if (d.length <= 3) return d;
    if (d.length <= 6) return `${d.slice(0, 3)}.${d.slice(3)}`;
    if (d.length <= 9) return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6)}`;
    return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}-${d.slice(9)}`;
}

// ── Tela principal ────────────────────────────────────────────────────────

export default function AgendarExame() {
    const router = useRouter();

    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [exame, setExame] = useState('');
    const [data, setData] = useState(DATAS[0]);
    const [horario, setHorario] = useState('');

    const [modalExame, setModalExame] = useState(false);
    const [modalData, setModalData] = useState(false);
    const [modalHorario, setModalHorario] = useState(false);

    // ── Verificação e navegação ───────────────────────────────────────────────

    async function handleConfirm() {
        if (!nome || !cpf || !exame || !horario) {
            Alert.alert('Atenção', 'Preencha todos os campos!');
            return;
        }

        const { data: { user } } = await supabase.auth.getUser();

        if (user) {
            const now = new Date();
            const inicioMes = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
            const fimMes = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString();

            const { data: existing } = await supabase
                .from('exams')
                .select('id')
                .eq('patient_id', user.id)
                .in('status', ['agendado', 'confirmado'])
                .gte('created_at', inicioMes)
                .lte('created_at', fimMes);

            if (existing && existing.length > 0) {
                Alert.alert(
                    '⚠️ Exame já agendado',
                    'Você já possui um exame agendado este mês.\n\nAguarde o resultado ou volte à Clínica +Saúde para saber mais.',
                    [{ text: 'Entendido', style: 'default' }]
                );
                return;
            }
        }

        router.push({
            pathname: '/agendar-exame/resumo',
            params: {
                nome,
                cpf,
                exame,
                data: data.full,
                dataLabel: data.label,
                horario,
            },
        });
    }

    // ── Render ────────────────────────────────────────────────────────────────

    return (
        <SafeAreaView style={style.safeArea}>
            <StatusBar barStyle="light-content" backgroundColor={themas.color.primary} />

            <ScrollView contentContainerStyle={style.scrollContent} showsVerticalScrollIndicator={false}>

                <View style={style.header}>
                    <TouchableOpacity style={style.backBtn} onPress={() => router.back()}>
                        <Ionicons name="chevron-back" size={22} color="#fff" />
                    </TouchableOpacity>
                    <View style={style.headerBgIcon}>
                        <MaterialCommunityIcons name="flask-outline" size={100} color="rgba(255,255,255,0.07)" />
                    </View>
                    <Text style={style.headerTitle}>Agendar exame</Text>
                    <Text style={style.headerSub}>PREENCHA OS DADOS</Text>
                </View>

                <View style={style.card}>

                    <Input title="Paciente" placeholder="Nome completo"
                        iconLeft={Ionicons} iconLeftName="person-outline"
                        value={nome} onChangeText={setNome} />

                    <Input title="CPF" placeholder="Ex: 123.456.789-00"
                        iconLeft={MaterialIcons} iconLeftName="credit-card"
                        value={cpf} onChangeText={(v) => setCpf(formatCPF(v))}
                        keyboardType="numeric" />

                    <Text style={style.fieldLabel}>Exame</Text>
                    <TouchableOpacity style={style.selectBox} onPress={() => setModalExame(true)}>
                        <MaterialCommunityIcons name="flask-outline" size={20} color={themas.color.gray} style={{ marginRight: 10 }} />
                        <Text style={[style.selectText, !exame && style.selectPlaceholder]}>
                            {exame || 'Selecione o exame'}
                        </Text>
                        <Ionicons name="chevron-down" size={18} color={themas.color.gray} />
                    </TouchableOpacity>

                    <View style={style.row}>
                        <View style={{ flex: 1 }}>
                            <Text style={style.fieldLabel}>Data</Text>
                            <TouchableOpacity style={style.selectBox} onPress={() => setModalData(true)}>
                                <Ionicons name="calendar-outline" size={18} color={themas.color.gray} style={{ marginRight: 8 }} />
                                <Text style={style.selectText}>{data?.label || 'Selecione'}</Text>
                                <Ionicons name="chevron-down" size={16} color={themas.color.gray} />
                            </TouchableOpacity>
                        </View>

                        <View style={{ width: 12 }} />

                        <View style={{ flex: 1 }}>
                            <Text style={style.fieldLabel}>Horário</Text>
                            <TouchableOpacity style={style.selectBox} onPress={() => setModalHorario(true)}>
                                <Ionicons name="time-outline" size={18} color={themas.color.gray} style={{ marginRight: 8 }} />
                                <Text style={[style.selectText, !horario && style.selectPlaceholder]}>
                                    {horario || '--:--'}
                                </Text>
                                <Ionicons name="chevron-down" size={16} color={themas.color.gray} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <TouchableOpacity style={style.button} onPress={handleConfirm}>
                        <Text style={style.buttonText}>Confirma agendamento</Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>

            <SelectModal visible={modalExame} title="Selecione o exame" options={EXAMES}
                onSelect={setExame} onClose={() => setModalExame(false)} />

            <SelectModal visible={modalData} title="Selecione a data"
                options={DATAS.map(d => d.label)}
                onSelect={(label) => setData(DATAS.find(d => d.label === label)!)}
                onClose={() => setModalData(false)} />

            <SelectModal visible={modalHorario} title="Selecione o horário" options={HORARIOS}
                onSelect={setHorario} onClose={() => setModalHorario(false)} />

        </SafeAreaView>
    );
}