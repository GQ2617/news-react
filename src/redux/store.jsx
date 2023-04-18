import { legacy_createStore as createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import allReducer from "./reducers";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["sidemenu"],
};

const persistedReducer = persistReducer(persistConfig, allReducer);
let store = createStore(persistedReducer);
let persistor = persistStore(store);
export { store, persistor };
