import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import reserverReducer from "../reducers/reserveReducer";
import shopReducer from "../reducers/shopReducer";

const persistConfig1 = {
  key: "root1",
  storage,
};

const persistConfig2 = {
  key: "root2",
  storage,
};

const ReservePersistedReducer = persistReducer(persistConfig1, reserverReducer);
const ShopPersistedReducer = persistReducer(persistConfig2, shopReducer);

const store = configureStore({
  reducer: {
    shop: ShopPersistedReducer,
    reserve: ReservePersistedReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
export default store;
