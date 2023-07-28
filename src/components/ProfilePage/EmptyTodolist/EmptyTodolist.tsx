import React, { useState } from "react";
import s from "./EmptyTodolist.module.css";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Input from '@mui/material/Input';

const ariaLabel = { 'aria-label': 'description' };

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
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
          <Typography id="modal-modal-title" variant="h6" component="h3" >
            Name your to do list
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <Input placeholder="List name" inputProps={ariaLabel} />
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

export default EmptyTodolist;
