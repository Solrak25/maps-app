import { router, useRootNavigationState } from 'expo-router';
import { useEffect } from 'react';
import { AppState } from 'react-native';
import { PermissionStatus } from '../../infrastucture/interfaces/location';
import { usePermissionsStore } from '../store/usePermissions';

const PermissionsCheckerProvider = ({ children }) => {

    const { locationStatus, checkLocationPermission } = usePermissionsStore();
    const rootNavigationState = useRootNavigationState();

    useEffect(() => {
        if (!rootNavigationState?.key) return;

        if (locationStatus === PermissionStatus.GRANTED) {
            router.replace('/map')
        } else if (locationStatus !== PermissionStatus.CHECKING) {
            router.replace('/permissions')
        }

    }, [locationStatus, rootNavigationState?.key])

    useEffect(() => {
        checkLocationPermission();
    }, [])

    useEffect(() => {
        const subcription = AppState.addEventListener('change', (nextAppState) => {
            if (nextAppState === 'active') {
                checkLocationPermission();
            }
        })

        return () => {
            subcription.remove();
        }
    }, [])

    return <>{children}</>
}

export default PermissionsCheckerProvider