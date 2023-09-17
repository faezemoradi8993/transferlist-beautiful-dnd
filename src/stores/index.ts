import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState, MovePayloadActionType } from '../types';


const initialState: AppState = {
    columns: {
        toDo: {
            id: '0',
            name: 'To do',
            items: [
                { id: '1', content: 'First task' },
                { id: '2', content: 'Second task' },
                { id: '3', content: 'Third task' },
                { id: '4', content: 'Fourth task' },
                { id: '5', content: 'Fifth task' },
            ],
        },
        done: {
            id: '1',
            name: 'Done',
            items: [],
        },
    },
};

// <------------- Slice -------------->
const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        move: (
            state: AppState,
            action: PayloadAction<MovePayloadActionType>
        ) => {
            const { taskId, source, destination, index } = action.payload;
            const sourceColumn = state.columns[source];
            const destColumn = state.columns[destination];
            const task = sourceColumn.items.find((item) => item.id === taskId);

            if (task) {
                sourceColumn.items = sourceColumn.items.filter((item) => item.id !== taskId);
                destColumn.items.splice(index, 0, task);
            }
        },
    },
});

// <------------- Export actions -------------->
export const { move } = appSlice.actions;

// <------------- Create store -------------->
const store = configureStore({
    reducer: appSlice.reducer,
});

// <------------- Define RootState type -------------->
export type RootState = ReturnType<typeof store.getState>; 

export default store;
