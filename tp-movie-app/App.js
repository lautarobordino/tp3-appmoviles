import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider, AuthContext } from './context/AuthContext';

import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import DetailScreen from './screens/DetailScreen';
import AdminScreen from './screens/AdminScreen';
import UserFormScreen from './screens/UserFormScreen';

const Stack = createStackNavigator();

function AppNavigator() {
  const { user } = useContext(AuthContext);

  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      {!user ? (
        <Stack.Screen name="Login" component={LoginScreen} />
      ) : user.role === 'admin' ? (
        <>
          <Stack.Screen name="Admin" component={AdminScreen} />
          <Stack.Screen name="UserForm" component={UserFormScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Detail" component={DetailScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}
