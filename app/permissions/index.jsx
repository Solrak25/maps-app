import { Text, View } from 'react-native';
import ThemedPressable from '../../presentation/components/Shared/ThemedPressable';
import { usePermissionsStore } from '../../presentation/store/usePermissions';

const PermissionsScreen = () => {

  const { locationStatus, requestLocationPermission } = usePermissionsStore();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

      <ThemedPressable
        onPress={requestLocationPermission}
        texto='Habilitar ubicación'
      />

      <Text>Estado actual: {locationStatus}</Text>
    </View>
  )
}

export default PermissionsScreen