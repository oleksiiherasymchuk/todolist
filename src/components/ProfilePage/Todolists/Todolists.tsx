import React, { DragEvent, useEffect, useRef, useState } from "react";
import s from "./Todolists.module.css";
import Todolist from "./Todolist/Todolist";
import EmptyTodolist from "../EmptyTodolist/EmptyTodolist";
import { useSelector } from "react-redux";
import {
  TodolistType,
  dragAndDropTL,
  setTodolists,
} from "../../../redux/appReducer";
import { AppReducerType } from "../../../redux/store";
import { useDispatch } from "react-redux";

type PropType = {};

const Todolists: React.FC = (props: PropType) => {
  const dispatch = useDispatch();
  const todolists: TodolistType[] = useSelector(
    (state: AppReducerType) => state.app.todolists
  );

  const [draggedOverIndex, setDraggedOverIndex] = useState<number | null | any>(
    null
  );
  const dragNode = useRef<HTMLDivElement | null>(null);

  const dragStartHandler = (e: DragEvent<HTMLDivElement>, index: number) => {
    dragNode.current = e.target as HTMLDivElement;
    dragNode.current.addEventListener("dragend", dragEndHandler);
  };

  const dragEnterHandler = (
    e: DragEvent<HTMLDivElement>,
    targetIndex: number
  ) => {
    e.preventDefault();

    if (draggedOverIndex !== targetIndex) {
      const newTodolists = [...todolists];
      const draggedTodolist = newTodolists.splice(draggedOverIndex, 1)[0];
      newTodolists.splice(targetIndex, 0, draggedTodolist);
      dispatch(setTodolists(newTodolists));
      setDraggedOverIndex(targetIndex);
    }
  };

  const dragEndHandler = () => {
    if (draggedOverIndex !== null) {
      const newTodolists = [...todolists];
      const draggedTodolist = newTodolists.splice(draggedOverIndex, 1)[0];
      newTodolists.splice(draggedOverIndex, 0, draggedTodolist);
      dispatch(dragAndDropTL(newTodolists));
    }
    dragNode.current?.removeEventListener("dragend", dragEndHandler);
    setDraggedOverIndex(null);
  };

  return (
    <div className={s.todolists}>
      <EmptyTodolist />
      {todolists.map((t, index) => (
        <div
          key={t.id}
          draggable={true}
          className={s.todolistsDraggable}
          onDragStart={(e) => dragStartHandler(e, index)}
          onDragEnter={(e) => dragEnterHandler(e, index)}
          onDragOver={(e) => e.preventDefault()}
        >
          <Todolist title={t.todolistTitle} listID={t.id} />
        </div>
      ))}
    </div>
  );
};

export default Todolists;
