import { v1 } from "uuid";

const initialAppState: appStateType = {
  todolists: [
    { id: "1", todolistTitle: "Home tasks" },
    { id: "2", todolistTitle: "Works tasks" },
  ],
  tasks: {
    ["1"]: [
      { id: v1(), task: "task11", isDone: false },
      { id: v1(), task: "task12", isDone: true },
      { id: v1(), task: "task13", isDone: false },
    ],
    ["2"]: [
      { id: v1(), task: "task21", isDone: false },
      { id: v1(), task: "task22", isDone: true },
      { id: v1(), task: "task23", isDone: false },
      { id: v1(), task: "task24", isDone: false },
    ],
  },
};

const appReducer = (
  state: appStateType = initialAppState,
  action: ActionType
): appStateType => {
  switch (action.type) {
    case "todolist/appReducer/ADD_TODOLIST": {
      const newTodolist = {
        id: v1(),
        todolistTitle: action.payload,
      };
      return {
        ...state,
        todolists: [...state.todolists, newTodolist],
      };
    }
    case "todolist/appReducer/ADD_TASK": {
      const newTask = {
        id: v1(),
        task: action.payload,
        isDone: false,
      };
      return {
        ...state,
        [action.payload.todolistID]: [
          ...(state.tasks[action.payload.todolistID] || []),
          newTask,
        ],
      };
    }
    case "todolist/appReducer/CHANGE_TASK_STATUS":
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [action.payload.todolistID]: state.tasks[
            action.payload.todolistID
          ].map((task) =>
            task.id === action.payload.taskID
              ? { ...task, isDone: action.payload.status }
              : task
          ),
        },
      };
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

export enum typesAppReducer {
  ADD_TODOLIST = "todolist/appReducer/ADD_TODOLIST",
  ADD_TASK = "todolist/appReducer/ADD_TASK",
  CHANGE_TASK_STATUS = "todolist/appReducer/CHANGE_TASK_STATUS",
}

export const addTodolist = (todolistTitle: string) =>
  ({ type: typesAppReducer.ADD_TODOLIST, payload: todolistTitle } as const);

export const addTask = (todolistID: string | number, task: string) =>
  ({ type: typesAppReducer.ADD_TASK, payload: { todolistID, task } } as const);

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

type ActionType = addTaskACType | addTodolistACType | changeTaskStatusACType;
