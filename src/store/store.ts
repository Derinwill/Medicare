import { configureStore } from "@reduxjs/toolkit";
import authSlice  from '../store/auth'
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; 
const persistConfig = {
  key: "root", // Key for storage
  storage, // Local Storage
};

// Wrap Reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, authSlice);
export const store = configureStore({
  reducer: {
    auth: persistedReducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Required to prevent errors
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;