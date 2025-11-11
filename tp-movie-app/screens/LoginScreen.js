import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { initDB, insertDefaultAdmin, validateUser } from '../database/database';

export default function LoginScreen({ navigation }) {
    const { login } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        initDB();
        insertDefaultAdmin();
    }, []);

    const handleLogin = async () => {
        if (!username || !password) {
            Alert.alert('Error', 'Ingrese usuario y contraseña');
            return;
        }

        const userFound = await validateUser(username, password);
        if (userFound) {
            login(userFound);
            if (userFound.role === 'admin') navigation.replace('Admin');
            else navigation.replace('Home');
        } else {
            Alert.alert('Error', 'Credenciales inválidas');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Iniciar Sesión</Text>
            <TextInput
                placeholder="Usuario"
                style={styles.input}
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                placeholder="Contraseña"
                style={styles.input}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <Button title="Ingresar" onPress={handleLogin} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20 },
    title: { fontSize: 26, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
    input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 5 }
});
