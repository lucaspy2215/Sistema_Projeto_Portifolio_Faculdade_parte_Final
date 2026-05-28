import React, { useEffect, useState } from 'react';
import {
    View, Text, SafeAreaView, ScrollView, TouchableOpacity,
    StatusBar, ActivityIndicator, Alert, Image,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { Input } from '../../src/components/Input';
import { supabase } from '../../src/lib/supabase';
import { themas } from '../../src/global/themes';
import { style } from '../../src/pages/perfil/style';

export default function Perfil() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [editing, setEditing] = useState(false);
    const [uploading, setUploading] = useState(false);

    const [userId, setUserId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');

    useEffect(() => { loadProfile(); }, []);

    async function loadProfile() {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;
        setUserId(user.id);
        setEmail(user.email || '');

        const { data } = await supabase
            .from('profiles').select('*')
            .eq('id', user.id).maybeSingle();

        if (data) {
            setName(data.full_name || '');
            setPhone(data.phone || '');
            setBirthDate(data.birth_date || '');
            setAvatarUrl(data.avatar_url || '');
        }
        setLoading(false);
    }

    function formatPhone(value: string) {
        const d = value.replace(/\D/g, '').slice(0, 11);
        if (d.length <= 2) return `(${d}`;
        if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
        if (d.length <= 11) return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
        return value;
    }

    function formatDate(value: string) {
        const d = value.replace(/\D/g, '').slice(0, 8);
        if (d.length <= 2) return d;
        if (d.length <= 4) return `${d.slice(0, 2)}/${d.slice(2)}`;
        return `${d.slice(0, 2)}/${d.slice(2, 4)}/${d.slice(4)}`;
    }

    async function handlePickImage() {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permissão necessária', 'Precisamos acessar sua galeria.');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true, aspect: [1, 1], quality: 0.7,
        });

        if (result.canceled) return;

        setUploading(true);
        const uri = result.assets[0].uri;
        const ext = uri.split('.').pop();
        const fileName = `${userId}/avatar.${ext}`;

        const formData = new FormData();
        formData.append('file', { uri, name: fileName, type: `image/${ext}` } as any);

        const { error } = await supabase.storage
            .from('avatars')
            .upload(fileName, formData, { upsert: true });

        if (error) {
            Alert.alert('Erro', 'Não foi possível enviar a foto.');
            setUploading(false);
            return;
        }

        const { data } = supabase.storage.from('avatars').getPublicUrl(fileName);
        const url = `${data.publicUrl}?t=${Date.now()}`;

        await supabase.from('profiles').update({ avatar_url: url }).eq('id', userId);
        setAvatarUrl(url);
        setUploading(false);
    }

    async function handleSave() {
        setSaving(true);
        const { error } = await supabase.from('profiles').update({
            full_name: name,
            phone,
            birth_date: birthDate,
        }).eq('id', userId);

        setSaving(false);

        if (error) {
            Alert.alert('Erro', 'Não foi possível salvar.');
            return;
        }

        setEditing(false);
        Alert.alert('Sucesso', 'Perfil atualizado!');
    }

    if (loading) {
        return (
            <View style={style.center}>
                <ActivityIndicator size="large" color={themas.color.primary} />
            </View>
        );
    }

    return (
        <SafeAreaView style={style.safeArea}>
            <StatusBar barStyle="light-content" backgroundColor={themas.color.primary} />

            <View style={style.header}>
                <TouchableOpacity style={style.backBtn} onPress={() => router.back()}>
                    <Ionicons name="chevron-back" size={22} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity style={style.editBtn} onPress={() => setEditing(!editing)}>
                    <MaterialCommunityIcons
                        name={editing ? 'close' : 'account-edit-outline'}
                        size={22} color="#fff"
                    />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={style.scrollContent} showsVerticalScrollIndicator={false}>

                {/* Avatar */}
                <View style={style.avatarSection}>
                    <TouchableOpacity style={style.avatarBox} onPress={handlePickImage} disabled={uploading}>
                        {avatarUrl
                            ? <Image source={{ uri: avatarUrl }} style={style.avatar} />
                            : <MaterialCommunityIcons name="account" size={52} color="rgba(255,255,255,0.8)" />}
                        <View style={style.cameraBtn}>
                            {uploading
                                ? <ActivityIndicator size="small" color="#fff" />
                                : <Ionicons name="camera" size={14} color="#fff" />}
                        </View>
                    </TouchableOpacity>
                    <Text style={style.avatarName}>{name}</Text>
                    <Text style={style.avatarEmail}>{email}</Text>
                </View>

                {/* Card de dados */}
                <View style={style.card}>
                    {!editing ? (
                        <>
                            <InfoRow icon="person-outline" lib="ion" label="Nome" value={name || '—'} />
                            <InfoRow icon="mail-outline" lib="ion" label="Email" value={email || '—'} />
                            <InfoRow icon="call-outline" lib="ion" label="Telefone" value={phone || '—'} />
                            <InfoRow icon="calendar-outline" lib="ion" label="Data de Nascimento" value={birthDate || '—'} />
                        </>
                    ) : (
                        <>
                            <Input title="Nome" value={name} onChangeText={setName}
                                iconLeft={Ionicons} iconLeftName="person-outline" />
                            <Input title="Telefone" value={phone}
                                onChangeText={(v) => setPhone(formatPhone(v))}
                                iconLeft={Ionicons} iconLeftName="call-outline"
                                keyboardType="numeric" />
                            <Input title="Data de Nascimento" value={birthDate}
                                onChangeText={(v) => setBirthDate(formatDate(v))}
                                iconLeft={Ionicons} iconLeftName="calendar-outline"
                                keyboardType="numeric" placeholder="DD/MM/AAAA" />

                            <TouchableOpacity style={style.saveBtn} onPress={handleSave} disabled={saving}>
                                {saving
                                    ? <ActivityIndicator color="#fff" />
                                    : <Text style={style.saveBtnText}>Salvar alterações</Text>}
                            </TouchableOpacity>
                        </>
                    )}
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

function InfoRow({ icon, lib, label, value }: { icon: string; lib: 'ion'; label: string; value: string }) {
    return (
        <View style={style.infoRow}>
            <View style={style.infoIcon}>
                <Ionicons name={icon as any} size={18} color={themas.color.primary} />
            </View>
            <View style={{ flex: 1 }}>
                <Text style={style.infoLabel}>{label}</Text>
                <Text style={style.infoValue}>{value}</Text>
            </View>
        </View>
    );
}