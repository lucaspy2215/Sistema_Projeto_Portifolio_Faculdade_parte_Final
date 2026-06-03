import React, { useEffect, useState, useCallback } from 'react';
import {
  View, Text, SafeAreaView, ScrollView,
  TouchableOpacity, StatusBar, ActivityIndicator, RefreshControl, Alert,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import { supabase } from '../../src/lib/supabase';
import { themas } from '../../src/global/themes';
import { style } from '../../src/pages/historico/style';

// ── Tipos 

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
  created_at: string;
};

// ── Tela 

export default function Historico() {
  const router = useRouter();

  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  // ── Carregamento 

  async function loadData() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const [{ data: consultas }, { data: exames }] = await Promise.all([
      supabase.from('appointments').select('*').eq('patient_id', user.id).order('created_at', { ascending: false }),
      supabase.from('exams').select('*').eq('patient_id', user.id).order('created_at', { ascending: false }),
    ]);

    const merged: Item[] = [
      ...(consultas || []).map(c => ({ ...c, kind: 'consulta' as const })),
      ...(exames || []).map(e => ({ ...e, kind: 'exame' as const })),
    ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    setItems(merged);
    setLoading(false);
    setRefreshing(false);
  }

  useEffect(() => { loadData(); }, []);

  const onRefresh = useCallback(() => { setRefreshing(true); loadData(); }, []);

  // ── Exclusão 

  function confirmDelete(item: Item) {
    Alert.alert(
      'Excluir registro',
      `Deseja excluir "${item.type}" do histórico?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Excluir', style: 'destructive', onPress: () => handleDelete(item) },
      ]
    );
  }

  async function handleDelete(item: Item) {
    setDeleting(item.id);

    const table = item.kind === 'consulta' ? 'appointments' : 'exams';
    const { error } = await supabase.from(table).delete().eq('id', item.id);

    setDeleting(null);

    if (error) {
      Alert.alert('Erro', `Não foi possível excluir: ${error.message}`);
      return;
    }

    // Remove da lista local somente após confirmação do banco
    setItems(prev => prev.filter(i => i.id !== item.id));
  }

  // ── Helpers de status 

  function getStatusLabel(status: string) {
    if (status === 'agendado') return 'Agendado';
    if (status === 'confirmado') return 'Confirmado';
    return 'Concluído';
  }

  function getStatusChipStyle(status: string) {
    if (status === 'agendado') return style.chipAgendado;
    if (status === 'confirmado') return style.chipConfirmado;
    return style.chipConcluido;
  }

  function getStatusDotStyle(status: string) {
    if (status === 'agendado') return style.statusDot;
    if (status === 'confirmado') return style.dotConfirmado;
    return style.dotConcluido;
  }

  function getStatusTextStyle(status: string) {
    if (status === 'agendado') return style.statusText;
    if (status === 'confirmado') return style.textConfirmado;
    return style.textConcluido;
  }

  // ── Render 

  return (
    <SafeAreaView style={style.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={themas.color.primary} />

      <View style={style.header}>
        <TouchableOpacity style={style.backBtn} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={22} color="#fff" />
        </TouchableOpacity>
        <Text style={style.headerTitle}>Histórico</Text>
        <Text style={style.headerSub}>CONSULTAS E EXAMES ANTERIORES</Text>
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
              <MaterialCommunityIcons name="history" size={64} color="#ccc" />
              <Text style={style.emptyTitle}>Nenhum registro</Text>
              <Text style={style.emptyText}>Seu histórico aparecerá aqui.</Text>
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

                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <View style={[style.statusChip, getStatusChipStyle(item.status)]}>
                      <View style={[style.statusDot, getStatusDotStyle(item.status)]} />
                      <Text style={[style.statusText, getStatusTextStyle(item.status)]}>
                        {getStatusLabel(item.status)}
                      </Text>
                    </View>

                    <TouchableOpacity
                      style={style.deleteBtn}
                      onPress={() => confirmDelete(item)}
                      disabled={deleting === item.id}
                    >
                      {deleting === item.id
                        ? <ActivityIndicator size="small" color="#e74c3c" />
                        : <Ionicons name="trash-outline" size={16} color="#e74c3c" />}
                    </TouchableOpacity>
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