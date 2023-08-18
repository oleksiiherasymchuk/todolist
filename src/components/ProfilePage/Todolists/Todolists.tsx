import React, { DragEvent, useEffect, useRef, useState } from "react";
import s from "./Todolists.module.css";
import Todolist from "./Todolist/Todolist";
import EmptyTodolist from "../EmptyTodolist/EmptyTodolist";
import { useSelector } from "react-redux";
import {
  TodolistType,
  // TodolistWithTasksType,
  dragAndDropTL,
  setTodolists,
} from "../../../redux/appReducer";
import { AppReducerType } from "../../../redux/store";
import { useDispatch } from "react-redux";
// import { collection, getDocs, query } from "firebase/firestore";
// import { auth, database } from "../../../api/firebase";

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

  // const [currentUserTodolists, setCurrentUserTodolists] = useState<
  //   TodolistWithTasksType[]
  // >([]);

  // const todolistsWithTasks: any = [];

  // const getT = async () => {
  //   const currentUser = auth.currentUser;
  //   const userUID = currentUser?.uid;

  //   const todolistQuery = query(
  //     collection(database, `users/${userUID}/todolists`)
  //   );

  //   const querySnapshot = await getDocs(todolistQuery);

  //   // const todolistsWithTasks: TodolistWithTasksType[] = [];
  //   querySnapshot.forEach((doc) => {
  //     const todolistData = doc.data();
  //     const todolistTitle = doc.id;
  //     // const loadedTodolistID = doc.data()?.todolistID;
  //     // setTodolistID(loadedTodolistID);
  //     // console.log(todolistID);
  //     // console.log(todolistData);
  //     // console.log(todolistTitle);
  //     todolistsWithTasks.push({ todolistTitle, ...todolistData });
  //     // todolists.push({ todolistTitle, tasks: todolistData.tasks });
  //     // console.log(todolistsWithTasks);
  //   });
  //   return todolistsWithTasks;
  //   // setCurrentUserTodolists(todolists);
  // };

  // useEffect(() => {
  //   getT();
  // });

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const todolistsWithTasks = await getT();
  //     setCurrentUserTodolists(todolistsWithTasks);
  //   };

  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   console.log(currentUserTodolists);
  // }, [currentUserTodolists, todolists]);

  return (
    <div className={s.todolists}>
      <EmptyTodolist />
      {/* {todolistsWithTasks.map((t: any, index: any) => { */}
      {/* {currentUserTodolists.map((t, index) => { */}
         {todolists.map((t, index) => {
        // console.log(t);
        return (
          <div
            key={t.id}
            // key={t.todolistID}
            draggable={true}
            className={s.todolistsDraggable}
            onDragStart={(e) => dragStartHandler(e, index)}
            onDragEnter={(e) => dragEnterHandler(e, index)}
            onDragOver={(e) => e.preventDefault()}
          >
            <Todolist
              title={t.todolistTitle}
              listID={t.id}

              // listID={t.todolistID}
              // loadedTasks={t.tasks}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Todolists;
