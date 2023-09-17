interface Task {
    id: string;
    content: string;
}

interface Column {
    id: string;
    name: string;
    items: Task[];
}

interface AppState {
    columns: Record<string, Column>;
}

interface MovePayloadActionType {
    taskId: string; source: string; destination: string; index: number
}


export type { Task, Column, AppState, MovePayloadActionType }