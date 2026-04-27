import { View, ActivityIndicator } from 'react-native';
import { ThemedText } from '../../presentation/components/Shared/themed-text';

const LoadingScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' }}>
      <ActivityIndicator size="large" color="#6200EE" />
      <ThemedText style={{ marginTop: 10 }}>Cargando mapa...</ThemedText>
    </View>
  )
}

export default LoadingScreen