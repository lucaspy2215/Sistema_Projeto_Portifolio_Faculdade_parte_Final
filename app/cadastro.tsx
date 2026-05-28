import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { MaterialIcons, Ionicons, Octicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Input } from '../src/components/Input';
import { style } from '../src/pages/cadastro/style_cadastro';
import { supabase } from '../src/lib/supabase';

function formatCPF(value: string) {
    const digits = value.replace(/\D/g, '').slice(0, 11);
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`;
    if (digits.length <= 9) return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
    return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`;
}

export default function Cadastro() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(true);
    const [showConfirmPassword, setShowConfirmPassword] = useState(true);

    async function handleRegister() {
        if (!name || !cpf || !email || !password || !confirmPassword)
            return Alert.alert('Atenção', 'Preencha todos os campos obrigatórios!');
        if (password !== confirmPassword)
            return Alert.alert('Atenção', 'As senhas não coincidem!');
        if (password.length < 6)
            return Alert.alert('Atenção', 'A senha precisa ter no mínimo 6 caracteres.');

        setLoading(true);
        const { data, error } = await supabase.auth.signUp({
            email: email.trim(), password,
            options: { data: { full_name: name, cpf } },
        });

        if (error) {
            setLoading(false);
            if (error.message.includes('already registered'))
                return Alert.alert('Erro', 'Este email já está cadastrado.');
            return Alert.alert('Erro', error.message);
        }

        if (data.user) {
            await supabase.from('profiles').insert({
                id: data.user.id, full_name: name,
                cpf, email: email.trim(),
            });
        }

        setLoading(false);
        router.replace('/main');
    }

    return (
        <SafeAreaView style={style.container}>
            <KeyboardAwareScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ flexGrow: 1 }}
                enableOnAndroid
                extraScrollHeight={20}
                keyboardShouldPersistTaps="handled"
            >
                <View style={style.header}>
                    <TouchableOpacity style={style.backButton} onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={28} color="#fff" />
                    </TouchableOpacity>
                    <Ionicons name="add-circle" size={50} color="#fff" />
                    <Text style={style.brandName}>+Saúde</Text>
                </View>

                <View style={style.card}>
                    <Text style={style.title}>Cadastro</Text>

                    <Input title="Nome" placeholder="Nome completo"
                        iconLeft={Ionicons} iconLeftName="person-outline"
                        value={name} onChangeText={setName} />

                    <Input title="CPF" placeholder="000.000.000-00"
                        iconLeft={MaterialIcons} iconLeftName="credit-card"
                        value={cpf} onChangeText={(v) => setCpf(formatCPF(v))}
                        keyboardType="numeric" />

                    <Input title="Email" placeholder="seu@email.com"
                        iconLeft={MaterialIcons} iconLeftName="alternate-email"
                        value={email} onChangeText={setEmail}
                        keyboardType="email-address" autoCapitalize="none"
                        autoComplete="email" />

                    <Input title="Senha" placeholder="********"
                        iconLeft={Ionicons} iconLeftName="lock-closed-outline"
                        secureTextEntry={showPassword}
                        iconRigth={Octicons} iconRighName={showPassword ? 'eye-closed' : 'eye'}
                        onIconRigthPress={() => setShowPassword(!showPassword)}
                        value={password} onChangeText={setPassword} />

                    <Input title="Confirmar Senha" placeholder="********"
                        iconLeft={Ionicons} iconLeftName="lock-closed-outline"
                        secureTextEntry={showConfirmPassword}
                        iconRigth={Octicons} iconRighName={showConfirmPassword ? 'eye-closed' : 'eye'}
                        onIconRigthPress={() => setShowConfirmPassword(!showConfirmPassword)}
                        value={confirmPassword} onChangeText={setConfirmPassword} />

                    <TouchableOpacity style={style.button} onPress={handleRegister} disabled={loading}>
                        {loading
                            ? <ActivityIndicator color="#FFF" />
                            : <Text style={style.buttonText}>Cadastrar</Text>}
                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
}