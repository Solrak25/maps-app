import { checkLocationPermissions, requestLocationPermissions } from '@/core/actions/permissions/location';
import { create } from 'zustand';
import { PermissionStatus } from '../../infrastucture/interfaces/location';

export const usePermissionsStore = create((set) => ({
  locationStatus: PermissionStatus.CHECKING,

  requestLocationPermission: async () => {
    console.log('usePermissionsStore: requestLocationPermission called');
    const status = await requestLocationPermissions();
    console.log('usePermissionsStore: status received:', status);
    set({ locationStatus: status });
    return PermissionStatus.GRANTED;
  },

  checkLocationPermission: async () => {
    const status = await checkLocationPermissions();
    set({ locationStatus: status });
    return PermissionStatus.LIMITED;
  },
}));