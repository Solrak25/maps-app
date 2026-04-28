import React, { useEffect, useRef } from 'react';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { useLocationStore } from '../../store/useLocationStore';
import { View, StyleSheet, Platform, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const Map = React.forwardRef(({ showPolyline = true }, ref) => {
  const mapRef = useRef(null);
  
  React.useImperativeHandle(ref, () => ({
    moveToLocation: (latitude, longitude) => {
      if (mapRef.current) {
        mapRef.current.animateToRegion({
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }, 1000);
      }
    }
  }));

  const { 
    lastKnownLocation, 
    userLocationList, 
    watchLocation, 
    clearWatch,
    mapType,
    customMarkers,
    addMarker,
    removeMarker 
  } = useLocationStore();

  useEffect(() => {
    watchLocation();
    return () => clearWatch();
  }, []);

  const centerOnUser = () => {
    if (lastKnownLocation && mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: lastKnownLocation.latitude,
        longitude: lastKnownLocation.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }, 1000);
    }
  };

  const handleLongPress = (event) => {
    const { coordinate } = event.nativeEvent;
    addMarker({
      coordinate,
      title: 'Nuevo Marcador',
      description: 'Presiona el marcador para opciones'
    });
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
        style={styles.map}
        showsUserLocation
        mapType={mapType}
        onLongPress={handleLongPress}
        initialRegion={{
          latitude: lastKnownLocation?.latitude || 37.78825,
          longitude: lastKnownLocation?.longitude || -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {showPolyline && (
          <Polyline
            coordinates={userLocationList}
            strokeColor="#6200EE"
            strokeWidth={4}
          />
        )}

        {customMarkers.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={marker.coordinate}
            title={marker.title}
            description={marker.description}
            pinColor="red"
            onCalloutPress={() => removeMarker(marker.id)}
          />
        ))}
      </MapView>

      <TouchableOpacity 
        style={styles.fab}
        onPress={centerOnUser}
      >
        <Ionicons name="locate" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#6200EE',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  }
});
