import React, { ChangeEvent, useState } from "react";
import s from "./Todolist.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import { TextField } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { useSelector } from "react-redux";
import { AppReducerType } from "../../../../redux/store";
import {
  TaskType,
  addTask,
  removeTask,
  deleteTodolist,
} from "../../../../redux/appReducer";
import { useDispatch } from "react-redux";

type PropType = {
  title: string;
  listID: string | number;
};

const Todolist: React.FC<PropType> = ({ title, listID }) => {
  const dispatch = useDispatch();

  const tasks: { [key: string | number]: TaskType[] } = useSelector(
    (state: AppReducerType) => state.app.tasks
  );

  const todolistID = useSelector(
    (state: AppReducerType) =>
      state.app.todolists.find((todolist) => todolist.todolistTitle === title)
        ?.id
  );

  const tasksForCurrentTodolist = todolistID ? tasks[todolistID] : [];

  const [newTask, setNewTask] = useState<string>("");

  const addTaskHandler = () => {
    if (newTask.trim() !== "") {
      dispatch(addTask(listID, newTask));
      setNewTask("");
    } else {
      alert("You can not add empty task");
    }
  };

  const onChangeTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTask(e.target.value);
  };

  const deleteTodolistHandler = () => dispatch(deleteTodolist(listID));

  return (
    <div className={s.todolist}>
      <div className={s.todolistDelete} onClick={deleteTodolistHandler}>
        <DeleteIcon color="primary" />
      </div>
      <h1>{title}</h1>
      <div className={s.todolistInput}>
        <TextField
          id="demo-helper-text-misaligned-no-helper"
          label="Task to do"
          size="small"
          value={newTask}
          onChange={onChangeTaskHandler}
        />
        <button onClick={addTaskHandler}>
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
            const removeTaskHandler = () => {
              dispatch(removeTask(listID, task.id));
            };
            return (
              <div className={s.todolistItemsGroup} key={task.id}>
                <li className={s.todolistItemsGroupItem}>{task.task}</li>
                <button className={s.delete} onClick={removeTaskHandler}>
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
