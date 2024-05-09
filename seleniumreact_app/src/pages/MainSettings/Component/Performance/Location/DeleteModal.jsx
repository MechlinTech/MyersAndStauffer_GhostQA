import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

function DeleteModal({ open, onClose, deleteItem, handleDelete }) {
    console.log("deleteItem",deleteItem)
  return (
    <div>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete Confirmation"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete {deleteItem?.location_name}?
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ justifyContent: "center" }}>
          <Button
            onClick={() => handleDelete(deleteItem.ref)}
            style={{
              marginRight: "10px",
              backgroundColor: "#654DF7",
              height: "30px",
              width: "100px",
              color: "white",
            }}
          >
            Delete
          </Button>
          <Button
            onClick={onClose}
            color="primary"
            style={{
              backgroundColor: "#6c757d",
              width: "100px",
              height: "30px",
              color: "white",
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DeleteModal;
