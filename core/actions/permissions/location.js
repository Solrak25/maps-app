import { PermissionStatus } from '@/infrastucture/interfaces/location';
import * as Location from 'expo-location';
import { Alert, Linking } from 'react-native';

export const requestLocationPermissions = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
        if (status === 'denied') {
            manualPermissionsRequest();
        }
        return PermissionStatus.DENIED;
    }

    return PermissionStatus.GRANTED;
}

export const checkLocationPermissions = async () => {
    const { status } = await Location.getForegroundPermissionsAsync();

    switch (status) {
        case 'granted':
            return PermissionStatus.GRANTED;
        case 'denied':
            return PermissionStatus.DENIED;
        default:
            return PermissionStatus.UNDETERMINED;
    }
}

const manualPermissionsRequest = async () => {
    Alert.alert(
        'Permiso de ubicacion necesario',
        'Para continuar debe de habilitar el permiso de ubicacion desde los ajustes del dispositivo',
        [
            {
                text: 'Abrir ajustes',
                onPress: () => {
                    Linking.openSettings();
                },
            },
        ],
    )
} 