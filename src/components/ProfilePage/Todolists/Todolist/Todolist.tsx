import React from "react";
import s from "./Todolist.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import { TextField } from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import ClearIcon from "@mui/icons-material/Clear";
import { useSelector } from "react-redux";
import { AppReducerType } from "../../../../redux/store";
import { TaskType } from "../../../../redux/appReducer";

type PropType = {
  title: string;
  // tasks: { [key: string]: TaskType[]; [key: number]: TaskType[]; },
};

const Todolist: React.FC<PropType> = ({ title }) => {
  const tasks: { [key: string | number]: TaskType[] } = useSelector(
    (state: AppReducerType) => state.app.tasks
  );

  // Get the Todolist ID of the current Todolist based on its title
  const todolistID = useSelector(
    (state: AppReducerType) =>
      state.app.todolists.find((todolist) => todolist.todolistTitle === title)
        ?.id
  );

  // Filter tasks belonging to the current Todolist ID
  const tasksForCurrentTodolist = todolistID ? tasks[todolistID] : [];

  return (
    <div className={s.todolist}>
      <div className={s.todolistDelete}>
        <DeleteIcon color="primary" />
      </div>
      <h1>{title}</h1>
      <div className={s.todolistInput}>
        <TextField
          id="demo-helper-text-misaligned-no-helper"
          label="Task to do"
          size="small"
        />
        <button>
          <AddBoxRoundedIcon color="primary" sx={{ fontSize: 40 }} />
        </button>
      </div>

      <ol className={s.todolistItems}>
        {tasksForCurrentTodolist.length === 0 && (
          <div className={s.todolistEmpty}>
            <p>Your to do list is empty...</p>
          </div>
        )}
        {tasksForCurrentTodolist.length !== 0 &&
          tasksForCurrentTodolist.map((task) => {
            console.log(tasksForCurrentTodolist.length);
            return (
              <div className={s.todolistItemsGroup} key={task.id}>
                <li className={s.todolistItemsGroupItem}>{task.task}</li>
                <button className={s.edit}>
                  <EditRoundedIcon sx={{ color: "#3f50b5" }} />
                </button>
                <button className={s.delete}>
                  <ClearIcon sx={{ color: "red" }} />
                </button>
              </div>
            );
          })}
      </ol>
    </div>
  );
};

export default Todolist;
