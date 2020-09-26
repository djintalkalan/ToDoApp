import AsyncStorage from '@react-native-community/async-storage';
import { combineReducers, createStore } from "redux";
import { persistReducer, persistStore } from 'redux-persist';
import * as Reducer from '../reducers';



const persistConfig = {
  // Root
  key: 'root',
  // Storage Method (React Native)
  storage: AsyncStorage,
  // Whitelist (Save Specific Reducers)
  whitelist: [
    "toDoReducer"
  ],
  blacklist: [],
  throttle: 1000,
  debounce: 1000,
};

const rootReducer = combineReducers({
  isLoadingReducer: Reducer.isLoadingReducer,
  toDoReducer: Reducer.toDoReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

let store = createStore(persistedReducer)


// Middleware: Redux Persist Persister
let persistor = persistStore(store);

// sagaMiddleware.run(rootSaga);

export { store, persistor };
