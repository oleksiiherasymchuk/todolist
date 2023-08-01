import React from "react";
import s from "./Todolists.module.css";
import Todolist from "./Todolist/Todolist";
import EmptyTodolist from "../EmptyTodolist/EmptyTodolist";
import { useSelector } from "react-redux";
import { TodolistType } from "../../../redux/appReducer";
import { AppReducerType } from "../../../redux/store";

type PropType = {};

const Todolists: React.FC = (props: PropType) => {
  const todolists: TodolistType[] = useSelector(
    (state: AppReducerType) => state.app.todolists
  );

  return (
    <div className={s.todolists}>
      <EmptyTodolist />
      {todolists.map((t) => {
        return (
          <div key={t.id} draggable={true}>
            <Todolist title={t.todolistTitle} listID={t.id} />
          </div>
        );
      })}
    </div>
  );
};

export default Todolists;
