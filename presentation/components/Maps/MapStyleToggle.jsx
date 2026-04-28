import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocationStore } from '../../store/useLocationStore';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    flexDirection: 'column',
    gap: 10,
  },
  button: {
    backgroundColor: 'white',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  activeButton: {
    backgroundColor: '#6200EE',
  }
});

const MAP_TYPES = [
  { type: 'standard', icon: 'map' },
  { type: 'satellite', icon: 'earth' },
  { type: 'hybrid', icon: 'layers' },
  { type: 'terrain', icon: 'prism' },
];

export const MapStyleToggle = () => {
  const { mapType, setMapType } = useLocationStore();

  const toggleStyle = () => {
    const currentIndex = MAP_TYPES.findIndex(m => m.type === mapType);
    const nextIndex = (currentIndex + 1) % MAP_TYPES.length;
    setMapType(MAP_TYPES[nextIndex].type);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={[styles.button, mapType !== 'standard' && styles.activeButton]} 
        onPress={toggleStyle}
      >
        <Ionicons 
          name={MAP_TYPES.find(m => m.type === mapType)?.icon || 'map'} 
          size={24} 
          color={mapType === 'standard' ? '#6200EE' : 'white'} 
        />
      </TouchableOpacity>
    </View>
  );
};
