import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import db from '../database/database';

export default function UserFormScreen({ route, navigation }) {
  const userToEdit = route.params?.userToEdit;
  const isEdit = !!userToEdit;

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');

  useEffect(() => {
    if (isEdit) {
      setName(userToEdit.name);
      setUsername(userToEdit.username);
      setPassword(userToEdit.password);
      setRole(userToEdit.role);
    }
  }, [userToEdit]);

  const handleSave = () => {
    if (!name || !username || !password) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    db.transaction(tx => {
      if (isEdit) {
        tx.executeSql(
          'UPDATE users SET name=?, username=?, password=?, role=? WHERE id=?;',
          [name, username, password, role, userToEdit.id],
          () => {
            Alert.alert('Éxito', 'Usuario actualizado');
            navigation.goBack();
          },
          (_, err) => console.error(err)
        );
      } else {
        tx.executeSql(
          'INSERT INTO users (name, username, password, role) VALUES (?, ?, ?, ?);',
          [name, username, password, role],
          () => {
            Alert.alert('Éxito', 'Usuario creado');
            navigation.goBack();
          },
          (_, err) => console.error(err)
        );
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isEdit ? 'Editar Usuario' : 'Nuevo Usuario'}</Text>

      <TextInput
        placeholder="Nombre completo"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
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
      <TextInput
        placeholder="Rol (admin / user)"
        style={styles.input}
        value={role}
        onChangeText={setRole}
      />

      <Button title={isEdit ? 'Guardar Cambios' : 'Crear Usuario'} onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f9f9f9' },
  title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 6, marginBottom: 12 }
});
