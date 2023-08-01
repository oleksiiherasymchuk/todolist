import { v1 } from "uuid";

export enum typesAppReducer {
  ADD_TODOLIST = "todolist/appReducer/ADD_TODOLIST",
  ADD_TASK = "todolist/appReducer/ADD_TASK",
  CHANGE_TASK_STATUS = "todolist/appReducer/CHANGE_TASK_STATUS",
  REMOVE_TASK = "todolist/appReducer/REMOVE_TASK",
  DELETE_TODOLIST = "todolist/appReducer/DELETE_TODOLIST",
}

// const todolistID1 = v1();
// const todolistID2 = v1();
// const todolistID3 = v1();

const initialAppState: appStateType = {
  todolists: [
    // { id: todolistID1, todolistTitle: "Home tasks" },
    // { id: todolistID2, todolistTitle: "Work tasks" },
    // { id: todolistID3, todolistTitle: "IT tasks" },
  ],
  tasks: {
    // [todolistID1]: [
    //   { id: v1(), task: "task11", isDone: false },
    //   { id: v1(), task: "task12", isDone: true },
    //   { id: v1(), task: "task13", isDone: false },
    // ],
    // [todolistID2]: [
    //   { id: v1(), task: "task21", isDone: false },
    //   { id: v1(), task: "task22", isDone: true },
    //   { id: v1(), task: "task23", isDone: false },
    //   { id: v1(), task: "task24", isDone: false },
    // ],
    // [todolistID3]: [
    //   { id: v1(), task: "task31", isDone: false },
    //   { id: v1(), task: "task32", isDone: true },
    //   { id: v1(), task: "task33", isDone: false },
    //   { id: v1(), task: "task34", isDone: false },
    // ],
  },
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
    // case "todolist/appReducer/CHANGE_TASK_STATUS":
    //   return {
    //     ...state,
    //     tasks: {
    //       ...state.tasks,
    //       [action.payload.todolistID]: state.tasks[
    //         action.payload.todolistID
    //       ].map((task) =>
    //         task.id === action.payload.taskID
    //           ? { ...task, isDone: action.payload.status }
    //           : task
    //       ),
    //     },
    //   };
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

export const changeTaskStatus = (
  todolistID: string | number,
  taskID: string | number,
  status: boolean
) =>
  ({
    type: typesAppReducer.CHANGE_TASK_STATUS,
    payload: { todolistID, taskID, status },
  } as const);

export type addTodolistACType = ReturnType<typeof addTodolist>;
export type addTaskACType = ReturnType<typeof addTask>;
export type changeTaskStatusACType = ReturnType<typeof changeTaskStatus>;
export type removeTaskACType = ReturnType<typeof removeTask>;
export type deleteTodolistACType = ReturnType<typeof deleteTodolist>;

type ActionType =
  | addTaskACType
  | addTodolistACType
  | changeTaskStatusACType
  | removeTaskACType
  | deleteTodolistACType;
