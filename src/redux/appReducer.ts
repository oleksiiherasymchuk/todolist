import { v1 } from "uuid";

export enum typesAppReducer {
  ADD_TODOLIST = "todolist/appReducer/ADD_TODOLIST",
  ADD_TASK = "todolist/appReducer/ADD_TASK",
  REMOVE_TASK = "todolist/appReducer/REMOVE_TASK",
  DELETE_TODOLIST = "todolist/appReducer/DELETE_TODOLIST",
  SET_TASKS = "todolist/appReducer/SET_TASKS",
  SET_TODOLISTS = "todolist/appReducer/SET_TODOLISTS",
  DRAG_AND_DROP_TL = "todolist/appReducer/DRAG_AND_DROP_T"
}

const initialAppState: appStateType = {
  todolists: [],
  tasks: {}
};

const appReducer = (
  state: appStateType = initialAppState,
  action: ActionType
): appStateType => {
  switch (action.type) {
    case typesAppReducer.ADD_TASK: {
      const { todolistID, task } = action.payload;
      const newTask = {
        id: v1(),
        task: task,
        isDone: false,
      };
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [todolistID]: [...(state.tasks[todolistID] || []), newTask],
        },
      };
    }
    case typesAppReducer.REMOVE_TASK: {
      const { todolistID, taskID } = action.payload;
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [todolistID]: [
            ...state.tasks[todolistID].filter((task) => task.id !== taskID),
          ],
        },
      };
    }
    case typesAppReducer.ADD_TODOLIST: {
      const newTodolist: TodolistType = {
        id: v1(),
        todolistTitle: action.payload,
      };
      return {
        ...state,
        todolists: [...state.todolists, newTodolist],
        tasks: {
          ...state.tasks,
          [newTodolist.id]: [], // Add an empty array for the new Todolist's tasks
        },
        // tasks: {...state.tasks[newTodolist]}
      };
    }
    case typesAppReducer.DELETE_TODOLIST: {
      const { todolistID } = action.payload;
      const updatedTodolists = state.todolists.filter(
        (todolist) => todolist.id !== todolistID
      );
      const updatedTasks = { ...state.tasks };
      delete updatedTasks[todolistID];
      return {
        ...state,
        todolists: updatedTodolists,
        tasks: updatedTasks,
      };
    }
    case typesAppReducer.SET_TASKS: {
      return {
        ...state,
        tasks: action.payload.tasks,
      };
    }
    case typesAppReducer.SET_TODOLISTS: {
      return {
        ...state,
        todolists: action.payload.todolists,
      };
    }
    case typesAppReducer.DRAG_AND_DROP_TL: {
      return {
        ...state,
        todolists: action.payload.todolists
      }
    }
    default:
      return state;
  }
};

export default appReducer;

export type TaskType = {
  id: string | number;
  task: string;
  isDone: boolean;
};

export type TodolistType = {
  id: string | number;
  todolistTitle: string;
};

export type appStateType = {
  todolists: TodolistType[];
  tasks: { [key: string | number]: TaskType[] };
};

export const addTodolist = (todolistTitle: string) =>
  ({ type: typesAppReducer.ADD_TODOLIST, payload: todolistTitle } as const);

export const deleteTodolist = (todolistID: string | number) =>
  ({
    type: typesAppReducer.DELETE_TODOLIST,
    payload: { todolistID },
  } as const);

export const addTask = (todolistID: string | number, task: string) =>
  ({ type: typesAppReducer.ADD_TASK, payload: { todolistID, task } } as const);

export const removeTask = (
  todolistID: string | number,
  taskID: string | number
) =>
  ({
    type: typesAppReducer.REMOVE_TASK,
    payload: { todolistID, taskID },
  } as const);

export const setTasks = (tasks: { [key: string]: TaskType[] }) =>
  ({ type: typesAppReducer.SET_TASKS, payload: { tasks } } as const);
export const setTodolists = (todolists: TodolistType[]) =>
  ({ type: typesAppReducer.SET_TODOLISTS, payload: { todolists } } as const);

export const dragAndDropTL = (todolists: TodolistType[]) => 
  ({ type: typesAppReducer.DRAG_AND_DROP_TL, payload: { todolists } } as const)

export type addTodolistACType = ReturnType<typeof addTodolist>;
export type addTaskACType = ReturnType<typeof addTask>;
export type removeTaskACType = ReturnType<typeof removeTask>;
export type deleteTodolistACType = ReturnType<typeof deleteTodolist>;
export type setTasksACType = ReturnType<typeof setTasks>;
export type setTodolistsACType = ReturnType<typeof setTodolists>;
export type dragAndDropTLACType = ReturnType<typeof dragAndDropTL> 

type ActionType =
  | addTaskACType
  | addTodolistACType
  | removeTaskACType
  | deleteTodolistACType
  | setTasksACType
  | setTodolistsACType
  | dragAndDropTLACType;
