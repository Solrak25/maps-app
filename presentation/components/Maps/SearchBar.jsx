import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Keyboard, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';

export const SearchBar = ({ onLocationFound }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setLoading(true);
    Keyboard.dismiss();
    
    try {
      const results = await Location.geocodeAsync(query);
      if (results.length > 0) {
        const { latitude, longitude } = results[0];
        onLocationFound({ latitude, longitude });
        setQuery('');
      }
    } catch (error) {
      console.error('Error searching location:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBox}>
        <Ionicons name="search" size={20} color="#888" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Buscar un lugar..."
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        {loading ? (
          <ActivityIndicator size="small" color="#6200EE" style={styles.icon} />
        ) : (
          query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery('')}>
              <Ionicons name="close-circle" size={20} color="#888" style={styles.icon} />
            </TouchableOpacity>
          )
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    zIndex: 1,
  },
  searchBox: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 15,
    alignItems: 'center',
    height: 50,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  icon: {
    marginHorizontal: 5,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
});
