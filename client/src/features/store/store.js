import { configureStore } from "@reduxjs/toolkit";
import ThemeReducer from "../ThemeSlice/ThemeSlice";
import { expanseApi } from "@/services/expanseApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import ExpanseReducer from "../expasneSlice/ExpanseSlice";
import AuthReducer from "../authSlice/AuthSlice";
import { userApi } from "@/services/usersApi";

export const store = configureStore({
  reducer: {
    Theme: ThemeReducer,
    Expanse: ExpanseReducer,
    Auth: AuthReducer,
    [expanseApi.reducerPath]: expanseApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(expanseApi.middleware, userApi.middleware),
});

setupListeners(store.dispatch);
