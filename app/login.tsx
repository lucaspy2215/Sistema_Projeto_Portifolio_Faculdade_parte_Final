import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Alert, ActivityIndicator, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { MaterialIcons, Octicons, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Input } from '../src/components/Input';
import { style } from '../src/pages/login/style';
import { supabase } from '../src/lib/supabase';

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    async function getLogin() {
        if (!email || !password)
            return Alert.alert('Atenção', 'Informe os campos obrigatórios!');
        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword({
            email: email.trim(), password,
        });
        setLoading(false);
        if (error) {
            if (error.message.includes('Invalid login credentials'))
                return Alert.alert('Erro', 'Email ou senha incorretos.');
            if (error.message.includes('Email not confirmed'))
                return Alert.alert('Atenção', 'Confirme seu email antes de entrar.');
            return Alert.alert('Erro', error.message);
        }
        router.replace('/main');
    }

    return (
        <KeyboardAwareScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ flexGrow: 1 }}
            enableOnAndroid
            extraScrollHeight={20}
            keyboardShouldPersistTaps="handled"
        >
            <View style={style.container}>
                <View style={style.header}>
                    <Image
                        source={require('../assets/images/logo.png')}
                        style={style.logo}
                        resizeMode="contain"
                    />
                    <Text style={style.brandName}>+Saúde</Text>
                    <Text style={style.brandSub}>AGENDAMENTO CLÍNICO</Text>
                </View>

                <View style={style.card}>
                    <Text style={style.title}>Login</Text>

                    <Input value={email} onChangeText={setEmail}
                        title="Usuário" placeholder="seu@email.com"
                        keyboardType="email-address" autoCapitalize="none"
                        iconLeft={MaterialIcons} iconLeftName="alternate-email" />

                    <Input value={password} onChangeText={setPassword}
                        title="Senha"
                        iconLeft={Ionicons} iconLeftName="lock-closed-outline"
                        iconRigth={Octicons} iconRighName={showPassword ? 'eye' : 'eye-closed'}
                        secureTextEntry={!showPassword}
                        onIconRigthPress={() => setShowPassword(!showPassword)} />

                    <TouchableOpacity onPress={() => router.push('/recuperar-senha')}>
                        <Text style={style.forgotText}>Esqueci minha senha</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={style.button} onPress={getLogin} disabled={loading}>
                        {loading
                            ? <ActivityIndicator color="#FFF" size="small" />
                            : <Text style={style.buttonText}>Login</Text>}
                    </TouchableOpacity>

                    <Text style={style.registerText}>
                        Não possui uma conta?{' '}
                        <Text style={style.registerLink} onPress={() => router.push('/cadastro')}>
                            Cadastre-se
                        </Text>
                    </Text>
                </View>
            </View>
        </KeyboardAwareScrollView>
    );
}