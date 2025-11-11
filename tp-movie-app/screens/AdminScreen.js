import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Button, FlatList, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import db from '../database/database';
import { AuthContext } from '../context/AuthContext';

export default function AdminScreen({ navigation }) {
  const [users, setUsers] = useState([]);
  const { user, logout } = useContext(AuthContext);

  // Cargar usuarios al iniciar
  useEffect(() => {
    fetchUsers();
    const unsubscribe = navigation.addListener('focus', fetchUsers);
    return unsubscribe;
  }, [navigation]);

  const fetchUsers = () => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM users;',
        [],
        (_, { rows }) => setUsers(rows._array),
        (_, error) => console.error(error)
      );
    });
  };

  const deleteUser = (id) => {
    if (id === user.id) {
      Alert.alert('Acción no permitida', 'No puedes eliminar tu propio usuario.');
      return;
    }

    Alert.alert('Confirmar eliminación', '¿Seguro que deseas eliminar este usuario?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: () => {
          db.transaction(tx => {
            tx.executeSql('DELETE FROM users WHERE id = ?;', [id], () => fetchUsers());
          });
        }
      }
    ]);
  };

  const renderItem = ({ item }) => (
    <View style={styles.userItem}>
      <View>
        <Text style={styles.username}>{item.username}</Text>
        <Text style={styles.role}>{item.role === 'admin' ? '👑 Administrador' : '👤 Usuario'}</Text>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity 
          style={[styles.btn, styles.editBtn]} 
          onPress={() => navigation.navigate('UserForm', { userToEdit: item })}
        >
          <Text style={styles.btnText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.btn, styles.delBtn]} 
          onPress={() => deleteUser(item.id)}
        >
          <Text style={styles.btnText}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Panel de Administración</Text>

      <Button 
        title="➕ Nuevo Usuario" 
        onPress={() => navigation.navigate('UserForm')} 
      />

      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        style={{ marginTop: 15 }}
      />

      <View style={{ marginTop: 15 }}>
        <Button title="Cerrar Sesión" color="gray" onPress={logout} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f9f9f9' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 15 },
  userItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  username: { fontSize: 16, fontWeight: '600' },
  role: { color: '#555', fontSize: 14 },
  buttons: { flexDirection: 'row' },
  btn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginLeft: 8
  },
  editBtn: { backgroundColor: '#4caf50' },
  delBtn: { backgroundColor: '#f44336' },
  btnText: { color: '#fff', fontWeight: '600' }
});
