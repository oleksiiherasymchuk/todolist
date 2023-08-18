import React, { ChangeEvent, useEffect, useState } from "react";
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
import { auth, database } from "../../../../api/firebase";
import {
  doc,
  deleteDoc,
  collection,
  getDocs,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { v1 } from "uuid";

type PropType = {
  title: string;
  listID: string | number | any;
  // loadedTasks: TaskType[];
  // todolistsWithTasks: any
};

const Todolist: React.FC<PropType> = ({ title, listID }) => {
  const dispatch = useDispatch();
  const [newTask, setNewTask] = useState<string>("");
  const tasks: { [key: string | number]: TaskType[] } = useSelector(
    (state: AppReducerType) => state.app.tasks
  );

  const todolistID = useSelector(
    (state: AppReducerType) =>
      state.app.todolists.find((todolist) => todolist.todolistTitle === title)
        ?.id
  ) as any;

  // const [tasks, setTasks] = useState<TaskType[]>(loadedTasks); // Initialize with loaded tasks

  const currentUser = auth.currentUser;

  // const tasksForCurrentTodolist = todolistID ? tasks[todolistID] : loadedTasks;
  const tasksForCurrentTodolist = todolistID ? tasks[todolistID] : [];
  // const addTaskHandler = () => {
  //   if (newTask.trim() !== "") {
  //     if (currentUser && todolistID) {
  //       const userUID = currentUser.uid;

  //       const tasksDocRef = doc(database, `users/${userUID}/todolists/${title}`);

  //       getDoc(tasksDocRef)
  //         .then((docSnapshot) => {
  //           if (docSnapshot.exists()) {
  //             const existingTasks = docSnapshot.data()?.tasks || [];
  //             const updatedTasks = [
  //               ...existingTasks,
  //               { taskID: v1(), task: newTask },
  //             ];

  //             updateDoc(tasksDocRef, { tasks: updatedTasks })
  //               .then(() => {
  //                 console.log("Task saved to Firebase");
  //                 dispatch(addTask(listID, newTask));
  //                 // setNewTasks(updatedTasks); // Update tasks state

  //                 setNewTask("");
  //               })
  //               .catch((error) => {
  //                 console.error("Save task to Firebase error", error);
  //               });
  //           }
  //         })
  //         .catch((error) => {
  //           console.error("Fetch existing tasks error", error);
  //         });
  //     }
  //   } else {
  //     alert("You cannot add an empty task");
  //   }
  // };

  const addTaskHandler = () => {
    if (newTask.trim() !== "") {
      if (currentUser && todolistID) {
        const userUID = currentUser.uid;

        const tasksDocRef = doc(
          database,
          `users/${userUID}/todolists/${title}`
        );

        getDoc(tasksDocRef)
          .then((docSnapshot) => {
            if (docSnapshot.exists()) {
              const existingTasks = docSnapshot.data()?.tasks || [];
              const updatedTasks = [
                ...existingTasks,
                { task: newTask },
                // { taskID: v1(), task: newTask },
              ];
              console.log("new created taskID", updatedTasks);

              updateDoc(tasksDocRef, { tasks: updatedTasks })
                .then(() => {
                  // console.log("Task saved to Firebase");
                  // console.log("add task", existingTasks);
                  console.log('add task', updatedTasks, tasks);
                  dispatch(addTask(listID, newTask));
                  // console.log(docSnapshot.data().tasks)
                  setNewTask("");
                })
                .catch((error) => {
                  console.error("Save task to Firebase error", error);
                });
            }
          })
          .catch((error) => {
            console.error("Fetch existing tasks error", error);
          });
      }
    } else {
      alert("You cannot add an empty task");
    }
  };

  const deleteTaskHandler = async (taskID: string | number) => {
    if (currentUser && todolistID) {
      try {
        const userUID = currentUser.uid;
        const tasksDocRef = doc(database, `users/${userUID}/todolists/${title}`);
        const docSnapshot = await getDoc(tasksDocRef);
        // console.log(tasksDocRef);
        // console.log(docSnapshot);
        
        if (docSnapshot.exists()) {
          const existingTasks = docSnapshot.data()?.tasks || [];
          // console.log(existingTasks);
          const updatedTasks = existingTasks.filter((task: any) => {
            console.log(task);
            return task.taskID !== taskID
          });
          // console.log(updatedTasks);
          await updateDoc(tasksDocRef, { tasks: updatedTasks });
          console.log("Task deleted from Firebase", taskID);
          console.log(tasks);
          console.log(updatedTasks);
          
          
          dispatch(removeTask(listID, taskID)); // Update Redux store
        }
      } catch (error) {
        console.error("Error deleting task from Firebase:", error);
      }
    }
  };
  
  // const deleteTaskHandler = (taskID: string | number) => {
  //   if (currentUser && todolistID) {
  //     const userUID = currentUser.uid;

  //     const tasksDocRef = doc(database, `users/${userUID}/todolists/${title}`);
  //     console.log(tasksDocRef);
      

  //     getDoc(tasksDocRef)
  //       .then((docSnapshot) => {
  //         if (docSnapshot.exists()) {
  //           const existingTasks = docSnapshot.data()?.tasks || [];
  //           console.log(existingTasks);
  //           const updatedTasks = existingTasks.filter((task: any) => {
  //             console.log(task);
  //             return task.taskID !== taskID; // Keep tasks that don't match the taskID
  //           });
  //           console.log(updatedTasks);

  //           updateDoc(tasksDocRef, { tasks: updatedTasks })
  //             .then(() => {
  //               console.log("Task deleted from Firebase", taskID);
  //               dispatch(removeTask(listID, taskID)); // Update Redux store
  //             })
  //             .catch((error) => {
  //               console.error("Delete task from Firebase error", error);
  //             });
  //         }
  //       })
  //       .catch((error) => {
  //         console.error("Fetch existing tasks error", error);
  //       });
  //   }
  // };

  // const deleteTaskHandler = (taskID: string | number) => {
  //   if (currentUser && todolistID) {
  //     const userUID = currentUser.uid;

  //     const tasksDocRef = doc(database, `users/${userUID}/todolists/${title}`);
  //     //     const tasksDocRef = doc(
  //     //       database,
  //     //       `users/${userUID}/todolists/${title}/tasks`,
  //     //       title
  //     //     );

  //     getDoc(tasksDocRef)
  //       .then((docSnapshot) => {
  //         if (docSnapshot.exists()) {
  //           // console.log(docSnapshot.data())
  //           const existingTasks = docSnapshot.data()?.tasks || [];
  //           console.log(existingTasks);
  //           // const existingTasks = docSnapshot.data().tasks || {};
  //           // if (existingTasks[todolistID]) {
  //           //   const updatedTasks = existingTasks[todolistID].filter(
  //           //     (task: any) => task.id !== taskID
  //           //   );
  //           //   existingTasks[todolistID] = updatedTasks;
  //           // console.log(existingTasks);
  //           const updatedTasks = existingTasks.filter((task: any) => {
  //             return task.taskID !== taskID;
  //           });
  //           console.log(updatedTasks);

  //           // const myTasks = Object.values(tasks);
  //           // console.log(myTasks[0]);
  //           // console.log(myTasks[todolistID]);

  //           // updateDoc(tasksDocRef, { tasks: myTasks[0] })
  //           updateDoc(tasksDocRef, { tasks: updatedTasks })
  //             .then(() => {
  //               console.log("Task deleted from Firebase");
  //               dispatch(removeTask(listID, taskID));
  //             })
  //             .catch((error) => {
  //               console.error("Delete task from Firebase error", error);
  //             });
  //         }
  //         // }
  //       })
  //       .catch((error) => {
  //         console.error("Fetch existing tasks error", error);
  //       });
  //   }
  // };

  const deleteTodolistHandler = () => {
    // debugger;
    if (currentUser && todolistID) {
      // if (currentUser && listID) {
      const userUID = currentUser.uid;

      const tasksCollectionRef = collection(
        database,
        `users/${userUID}/todolists/${title}/tasks`
      );

      getDocs(tasksCollectionRef)
        .then((tasksQuerySnapshot) => {
          // debugger
          const deleteTasksPromises = tasksQuerySnapshot.docs.map((doc) =>
            deleteDoc(doc.ref)
          );
          return Promise.all(deleteTasksPromises);
        })
        .then(() => {
          const todolistDocRef = doc(
            database,
            `users/${userUID}/todolists`,
            title
          );

          deleteDoc(todolistDocRef)
            .then(() => {
              console.log("Todolist and tasks deleted from Firestore");
              dispatch(deleteTodolist(listID)); // Dispatch Redux action to remove the todolist from state
            })
            .catch((error) => {
              console.error(
                "Error deleting todolist and tasks from Firestore:",
                error
              );
            });
        })
        .catch((error) => {
          console.error("Error deleting tasks from Firestore:", error);
        });
    }
  };

  const onChangeTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTask(e.target.value);
  };

  // useEffect(() => {
  //   console.log(tasks);
  //   console.log(tasks[todolistID]);
  // }, [tasks]);

  // // useEffect(() => {},[])
  // useEffect(() => {},[tasksForCurrentTodolist])

  // useEffect(() => {
  //   // Update tasks state when loadedTasks prop changes
  //   setTasks(loadedTasks);
  // }, [loadedTasks]);

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
          // {/* {tasks.length === 0 && ( */}
          <div className={s.todolistEmpty}>
            <p>Your to do list is empty...</p>
          </div>
        )}
        {tasksForCurrentTodolist.length !== 0 &&
          tasksForCurrentTodolist.map((task) => {
            // console.log(task);
            // {tasks.length !== 0 &&
            //   tasks.map((task) => {

            return (
              <div className={s.todolistItemsGroup} key={task.taskID}>
                <li className={s.todolistItemsGroupItem}>{task.task}</li>
                <button
                  className={s.delete}
                  onClick={() => deleteTaskHandler(task.taskID)}
                >
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
