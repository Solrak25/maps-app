import { useRef } from 'react';
import { View } from 'react-native';
import { Map } from '../../presentation/components/Maps/Map';
import { SearchBar } from '../../presentation/components/Maps/SearchBar';
import { MapStyleToggle } from '../../presentation/components/Maps/MapStyleToggle';

const MapScreen = () => {
  const mapRef = useRef(null);

  const handleLocationFound = (coords) => {
    // We can't easily pass the ref through the generic Map export if it uses it internally,
    // but we can add a way to listen to changes or just use the store to trigger a jump.
    // However, the cleanest way is often to have the mapRef here.
    // Let's modify Map.jsx to accept a forwardRef or just use the store.
    // For now, I'll pass a prop to Map to trigger an animation.
    // Actually, I'll just use the store and have Map listen to it.
  };

  return (
    <View style={{ flex: 1 }}>
      <Map ref={mapRef} />
      <SearchBar onLocationFound={(coords) => {
         if (mapRef.current) {
           mapRef.current.moveToLocation(coords.latitude, coords.longitude);
         }
      }} />
      <MapStyleToggle />
    </View>
  );
};

export default MapScreen;
