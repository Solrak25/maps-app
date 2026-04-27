import { create } from 'zustand';
import * as Location from 'expo-location';

export const useLocationStore = create((set, get) => ({
  lastKnownLocation: null,
  userLocationList: [],
  watchId: null,

  getLocation: async () => {
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Highest,
    });
    const coords = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
    set({ lastKnownLocation: coords });
    return coords;
  },

  watchLocation: async () => {
    if (get().watchId) return;

    const watchId = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.Highest,
        timeInterval: 1000,
        distanceInterval: 1,
      },
      (location) => {
        const coords = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };
        set({
          lastKnownLocation: coords,
          userLocationList: [...get().userLocationList, coords],
        });
      }
    );

    set({ watchId });
  },

  clearWatch: () => {
    const watchId = get().watchId;
    if (watchId) {
      watchId.remove();
      set({ watchId: null });
    }
  },
}));
