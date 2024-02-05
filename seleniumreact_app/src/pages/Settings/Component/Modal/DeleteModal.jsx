import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { DeleteApplication, DeleteBrowser } from '../../../../redux/actions/seleniumAction';
import { useDispatch } from 'react-redux';

function DeleteModal({ open,onClose,item,AppOrBrow }) {
  const dispatch = useDispatch()
 const [name, setname] = useState("")

  const handleDelete = () => {
    
    if(AppOrBrow === 'application'){
        dispatch(DeleteApplication(item.ApplicationId))
        setname(item.ApplicationName)
      }
    else{
     dispatch(DeleteBrowser(item.BrowserId))
     setname(item.BrowserName)
    }

    onClose()
  };

  return (
    <div>
      <Dialog open={open} onClose={onClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{"Delete Confirmation"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this {AppOrBrow} {name}? It may be linked to a test suite, and you will have to update the test suites after deleting it.
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ justifyContent: 'center',marginBottom:'20px'}}>
        <Button onClick={handleDelete} 
                style={{
                  marginRight: "10px",
                  backgroundColor: "#654DF7",
                  height: "30px",
                  width: "100px",
                  color:'white'
                }}>
            Delete
          </Button>
          <Button onClick={onClose} color="primary"  style={{
                  backgroundColor: "#6c757d",
                  width: "100px",
                  height: "30px",
                  color:'white'
                }}>
            Cancel
          </Button>
          
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DeleteModal;
