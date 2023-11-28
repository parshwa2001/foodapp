import { store } from "./Store";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
const persistor = persistStore(store)
export default function ReduxProvider({ children }) {
    return (
        <PersistGate persistor={persistor}>
            <Provider store={store}>
                {children}
            </Provider>
        </PersistGate>
    )
}