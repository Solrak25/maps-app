import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const Map = () => {
  return (
    <View style={styles.container}>
      <Ionicons name="map-outline" size={64} color="#666" />
      <Text style={styles.text}>
        El mapa no está disponible en la versión Web.
      </Text>
      <Text style={styles.subtext}>
        Por favor, abre la aplicación en un emulador de Android/iOS o en un dispositivo real usando Expo Go para ver el mapa en tiempo real.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  text: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  subtext: {
    marginTop: 10,
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
  },
});
