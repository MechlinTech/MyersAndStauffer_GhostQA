import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { DeleteApplication, DeleteBrowser } from '../../../../redux/actions/seleniumAction';
import { DeleteEnvironment } from '../../../../redux/actions/settingAction';
import { useDispatch } from 'react-redux';

function DeleteModal({ open, onClose, item, types }) {
  const dispatch = useDispatch();
  const [name, setname] = useState("");

  useEffect(() => {
    if (item) {
      setname(types === 'application' ? item.ApplicationName :
        types === 'environment' ? item.EnvironmentName :
          types === 'browser' ? item.BrowserName : "");
    }
  }, [item, types]);

  const handleDelete = () => {
    if (types === 'application') {
      dispatch(DeleteApplication(item.ApplicationId));
    } else if (types === 'environment') {
      dispatch(DeleteEnvironment(item.EnvironmentId));
    } else {
      dispatch(DeleteBrowser(item.BrowserId));
    }
    onClose();
  };

  return (
    <div>
      <Dialog open={open} onClose={onClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{"Delete Confirmation"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this {types} {name}? It may be linked to a test suite, and you will have to update the test suites after deleting it.
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ justifyContent: 'center', marginBottom: '20px' }}>
          <Button onClick={handleDelete}
            style={{
              marginRight: "10px",
              backgroundColor: "#654DF7",
              height: "30px",
              width: "100px",
              color: 'white'
            }}>
            Delete
          </Button>
          <Button onClick={onClose} color="primary" style={{
            backgroundColor: "#6c757d",
            width: "100px",
            height: "30px",
            color: 'white'
          }}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DeleteModal;
