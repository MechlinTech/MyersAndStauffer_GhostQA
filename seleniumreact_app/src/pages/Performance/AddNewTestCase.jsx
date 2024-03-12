import React, { useState } from "react";
import { TextField, Button } from "@mui/material";

const AddNewTestCase = ({ onAdd }) => {
  const [title, setTitle] = useState("");

  const handleAdd = () => {
    if (title.trim() !== "") {
      onAdd(title);
      setTitle(""); // Clear the input field after adding the new item
    }
  };

  return (
    <div>
      <TextField
        label="New Child Title"
        variant="outlined"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Button variant="contained" onClick={handleAdd}>
        Add
      </Button>
    </div>
  );
};

export default AddNewTestCase;