import { configureStore } from "@reduxjs/toolkit";
import ThemeReducer from "../ThemeSlice/ThemeSlice";
import { expanseApi } from "@/services/expanseApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import ExpanseReducer from "../expasneSlice/ExpanseSlice";
import AuthReducer from "../authSlice/AuthSlice";
import { userApi } from "@/services/usersApi";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "Auth",
  storage,
};

const persistedReducer = persistReducer(persistConfig, AuthReducer);

export const store = configureStore({
  reducer: {
    Theme: ThemeReducer,
    Expanse: ExpanseReducer,
    Auth: persistedReducer,
    [expanseApi.reducerPath]: expanseApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(expanseApi.middleware, userApi.middleware),
});

setupListeners(store.dispatch);
export const persistor = persistStore(store);
