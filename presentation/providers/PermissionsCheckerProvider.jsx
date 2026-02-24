import { router } from 'expo-router';
import { useEffect } from 'react';
import { PermissionStatus } from '../../infrastucture/interfaces/location';
import { usePermissionsStore } from '../store/usePermissions';

const PermissionsCheckerProvider = ({ children }) => {

    const {locationStatus, checkLocationPermission} = usePermissionsStore();

    useEffect(() => {
        
        if( locationStatus === PermissionStatus.GRANTED){
            router.replace('/map')
        }else if( locationStatus !== PermissionStatus.CHECKING){
            router.replace('/permissions')
        }

    }, [locationStatus])

    useEffect(() => {
        checkLocationPermission();
    }, [])

    return <>{children}</>
}

export default PermissionsCheckerProvider