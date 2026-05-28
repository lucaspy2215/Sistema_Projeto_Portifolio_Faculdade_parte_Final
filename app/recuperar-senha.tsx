import React, { useState } from 'react';
import {
    View, Text, SafeAreaView, TouchableOpacity,
    StatusBar, ActivityIndicator, Alert, KeyboardAvoidingView, Platform,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Input } from '../src/components/Input';
import { supabase } from '../src/lib/supabase';
import { themas } from '../src/global/themes';
import { StyleSheet } from 'react-native';

export default function RecuperarSenha() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);

    async function handleSend() {
        if (!email) {
            Alert.alert('Atenção', 'Informe seu email.');
            return;
        }
        setLoading(true);
        const { error } = await supabase.auth.resetPasswordForEmail(email.trim());
        setLoading(false);

        if (error) {
            Alert.alert('Erro', error.message);
            return;
        }
        setSent(true);
    }

    return (
        <SafeAreaView style={style.safeArea}>
            <StatusBar barStyle="light-content" backgroundColor={themas.color.primary} />
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>

                <View style={style.header}>
                    <TouchableOpacity style={style.backBtn} onPress={() => router.back()}>
                        <Ionicons name="chevron-back" size={22} color="#fff" />
                    </TouchableOpacity>
                    <Text style={style.headerTitle}>Recuperar senha</Text>
                    <Text style={style.headerSub}>INSIRA SEU EMAIL CADASTRADO</Text>
                </View>

                <View style={style.card}>
                    {!sent ? (
                        <>
                            <View style={style.iconBox}>
                                <MaterialIcons name="lock-reset" size={48} color={themas.color.primary} />
                            </View>
                            <Text style={style.title}>Esqueceu sua senha?</Text>
                            <Text style={style.subtitle}>
                                Enviaremos um link para você redefinir sua senha.
                            </Text>

                            <Input
                                title="Email"
                                placeholder="seu@email.com"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoComplete="email"
                                iconLeft={MaterialIcons}
                                iconLeftName="alternate-email"
                            />

                            <TouchableOpacity style={style.button} onPress={handleSend} disabled={loading}>
                                {loading
                                    ? <ActivityIndicator color="#fff" />
                                    : <Text style={style.buttonText}>Enviar link</Text>}
                            </TouchableOpacity>
                        </>
                    ) : (
                        <View style={style.successBox}>
                            <View style={style.successIcon}>
                                <Ionicons name="checkmark" size={40} color="#fff" />
                            </View>
                            <Text style={style.successTitle}>Email enviado!</Text>
                            <Text style={style.successText}>
                                Verifique sua caixa de entrada e siga as instruções para redefinir sua senha.
                            </Text>
                            <TouchableOpacity style={style.button} onPress={() => router.replace('/login')}>
                                <Text style={style.buttonText}>Voltar ao login</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>

            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const style = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: themas.color.primary },
    header: { paddingHorizontal: 24, paddingTop: 52, paddingBottom: 40 },
    backBtn: {
        width: 36, height: 36, borderRadius: 10,
        backgroundColor: 'rgba(255,255,255,0.15)',
        alignItems: 'center', justifyContent: 'center', marginBottom: 24,
    },
    headerTitle: { fontSize: 28, fontWeight: '700', color: '#fff', marginBottom: 4 },
    headerSub: { fontSize: 11, color: themas.color.secondary, fontWeight: '600', letterSpacing: 1.5 },
    card: {
        flex: 1, backgroundColor: '#f0f7f4',
        borderTopLeftRadius: 28, borderTopRightRadius: 28,
        padding: 28,
    },
    iconBox: { alignItems: 'center', marginTop: 16, marginBottom: 20 },
    title: { fontSize: 22, fontWeight: '700', color: themas.color.primary, textAlign: 'center', marginBottom: 8 },
    subtitle: { fontSize: 14, color: '#666', textAlign: 'center', lineHeight: 22, marginBottom: 8 },
    button: {
        height: 52, borderRadius: 14,
        backgroundColor: themas.color.primary,
        alignItems: 'center', justifyContent: 'center', marginTop: 24,
    },
    buttonText: { fontSize: 16, color: '#fff', fontWeight: '700' },
    successBox: { alignItems: 'center', paddingTop: 40 },
    successIcon: {
        width: 80, height: 80, borderRadius: 40,
        backgroundColor: themas.color.secondary,
        alignItems: 'center', justifyContent: 'center', marginBottom: 24,
    },
    successTitle: { fontSize: 24, fontWeight: '700', color: themas.color.primary, marginBottom: 12 },
    successText: { fontSize: 14, color: '#666', textAlign: 'center', lineHeight: 22 },
});