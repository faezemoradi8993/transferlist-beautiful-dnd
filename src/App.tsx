import TransferList from './components/TransferList';
import { Provider } from "react-redux";
import store from "./stores";


function App() {
    // <------------- Render Component -------------->
    return (
        <Provider store={store}>
            <TransferList />
        </Provider>
    );
}

export default App;
