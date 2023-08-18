import React, { KeyboardEvent, useState } from "react";
import s from "./EmptyTodolist.module.css";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Input from "@mui/material/Input";
import { useDispatch } from "react-redux";
import {
  addTodolist,
} from "../../../redux/appReducer";
import { auth, database } from "../../../api/firebase";
import { setDoc, doc } from "firebase/firestore";
import { Dispatch } from "redux";
import { v1 } from "uuid";

const ariaLabel = { "aria-label": "description" };

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid white",
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  color: "gray",
  fontWeight: "bold",
  fontStyle: "italic",
};

type PropType = {};

const EmptyTodolist: React.FC = (props: PropType) => {
  const dispatch = useDispatch<Dispatch>();

  const [open, setOpen] = useState(false);
  const [todolistTitle, setTodolistTitle] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const currentUser = auth.currentUser;

  const addTodolistHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (todolistTitle.trim() !== "") {
      if (e.code === "Enter") {
        if (currentUser) {
          const userUID = currentUser.uid;
          const todolistData = {
            // todolistID: currentUser.uid,
            todolistID: v1(),
            todolistTitle: todolistTitle,
          };

          // console.log('new created todolistID',todolistData);
          

          const todolistCollectionRef = doc(
            database,
            `users/${userUID}/todolists`,
            todolistTitle
          );
          setDoc(todolistCollectionRef, todolistData)
            .then(() => {
              // console.log("Todolist title saved to Firestore", todolistData);
              dispatch(addTodolist(todolistTitle));
              setTodolistTitle("");
              setTimeout(() => {
                handleClose();
              }, 0);
            })
            .catch((error) => {
              console.error("Error saving todolist title to Firestore:", error);
            });
          setTodolistTitle("");
          setTimeout(() => {
            handleClose();
          }, 0);
        }
      }
    }
  };

  return (
    <>
      <div className={s.todolist}>
        <div className={s.todolistAdd}>
          <Button onClick={handleOpen}>
            <ControlPointIcon color="action" sx={{ fontSize: 100 }} />
          </Button>
        </div>
        <p>Create a new to do list...</p>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h3">
            Name your to do list
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Input
              placeholder="List name"
              inputProps={ariaLabel}
              onKeyDown={addTodolistHandler}
              value={todolistTitle}
              onChange={(e) => setTodolistTitle(e.target.value)}
            />
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

export default EmptyTodolist;
