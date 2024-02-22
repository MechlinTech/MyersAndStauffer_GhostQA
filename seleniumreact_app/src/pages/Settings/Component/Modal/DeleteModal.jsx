import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  DeleteApplication,
  DeleteBrowser,
  DeleteEnvironment,
} from "../../../../redux/actions/settingAction";
import { useDispatch } from "react-redux";

function DeleteModal({ open, onClose, item, types }) {
  const dispatch = useDispatch();
  const [name, setname] = useState("");
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
  const [linkedTestSuite, setlinkedTestSuite] = useState("")
  useEffect(() => {
    if (item) {
      setname(
        types === "application"
          ? item.ApplicationName
          : types === "environment"
          ? item.EnvironmentName
          : types === "browser"
          ? item.BrowserName
          : ""
      );
    }
  }, [item, types]);

  const handleDelete = async () => {
    try {
      if (types === "application") {
        const response = await dispatch(DeleteApplication(item.ApplicationId));
        setlinkedTestSuite(response.message)
        if (response.status === "fail") {
          setIsSecondModalOpen(true);
          onClose();
        } else {
          onClose();
        }
      } else if (types === "environment") {
        const response = await dispatch(DeleteEnvironment(item.EnvironmentId));
        setlinkedTestSuite(response.message)
        if (response.status === "fail") {
          setIsSecondModalOpen(true);
          onClose();
        } else {
          onClose();
        }
      } else {
        const response = await dispatch(DeleteBrowser(item.BrowserId));
        setlinkedTestSuite(response.message)
        if (response.status === "fail") {
          setIsSecondModalOpen(true);
          onClose();
        } else {
          onClose();
        }
      }
    } catch (error) {
      console.error("Error handling delete:", error);
    }
  };
  return (
    <div>
      {open && (
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
              Are you sure you want to delete this {types} <b>{name}</b>?
            </DialogContentText>
          </DialogContent>
          <DialogActions
            style={{ justifyContent: "center", marginBottom: "20px" }}
          >
            <Button
              onClick={handleDelete}
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
      )}
      {isSecondModalOpen && (
        <Dialog
          open={isSecondModalOpen}
          onClose={() => setIsSecondModalOpen(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Alert"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete this {types} <b>{name}</b>? It is linked
              to a <b> {linkedTestSuite} </b> test suite, and you will have to update the test suites before
              deleting it.
              </DialogContentText>
          </DialogContent >
          <DialogActions
            style={{ justifyContent: "center", marginBottom: "20px" }}
          >
            <Button
              onClick={() => {
                setIsSecondModalOpen(false);
                onClose();
              }}
              style={{
                marginRight: "10px",
                backgroundColor: "#654DF7",
                height: "30px",
                width: "100px",
                color: "white",
              }}
            >
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
}

export default DeleteModal;
