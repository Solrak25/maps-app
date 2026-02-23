import { PermissionStatus } from '@/infrastucture/interfaces/location';
import * as Location from 'expo-location';

export const requestLocationPermissions = async() =>{
     const { status } = await Location.requestForegroundPermissionsAsync();

     if (status !== 'granted'){
        manualPermissionsRequest();
        return PermissionStatus.DENIED;
     }

     return PermissionStatus.GRANTED;
} 

export const checkLocationPermissions = async() =>{
    const { status } = await Location.getForegroundPermissionsAsync();

    switch( status){
        case 'granted':
            return PermissionStatus.GRANTED;
        case 'denied':
            return PermissionStatus.DENIED;
        default:
            return PermissionStatus.UNDETERMINED;
    }
} 

const manualPermissionsRequest = async() =>{
     
} 