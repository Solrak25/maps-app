import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const Map = React.forwardRef(({ showPolyline = true }, ref) => {
  return (
    <View style={styles.container} ref={ref}>
      <Text style={styles.text}>El mapa no está disponible en la versión web todavía.</Text>
      <Text style={styles.subtext}>Usa un dispositivo Android o iOS para ver la funcionalidad completa.</Text>
    </View>
  );
});

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
