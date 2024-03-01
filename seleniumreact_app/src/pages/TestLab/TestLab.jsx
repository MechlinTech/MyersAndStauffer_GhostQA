import React, { useState, useEffect } from "react";
import { Grid, Card } from "@material-ui/core";
import { useStyles } from "./styles";
import Button from '@mui/material/Button';

import { Add } from "@mui/icons-material";

import AddTestCase from "./AddTestCase";



import DynamicTreeView from "./DynamicTreeView";



export default function TestLab() {
  const classes = useStyles();
 
  const [addTestCase, setAddTestCase] = useState(false);


  const [selectedItem, setSelectedItem] = useState(null);
  const handleItemClick = (id) => {
    setSelectedItem(id); // Update selected item state
   // onItemClick(id); // Call the onItemClick callback function with the clicked item's id
  };
  
  const handleTestCaseList= (id) => {
    setAddTestCase(true);    
  }
  return (
    <>
      <div className={classes.main}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={5}>
            <Card className={classes.card} style={{ paddingBottom: "30px", maxHeight: "78vh" }}>
              <Grid container alignItems="center" className={classes.bodyHeader}>
                <Grid item xs={6}>
                  Projects
                </Grid>
                <Grid item xs={6} style={{ textAlign: "right" }}>
                  <Button
                    variant="contained"
                    onClick={()=>setAddTestCase(current=>!current)}
                    style={{
                      fontSize: 14,
                      backgroundColor: "rgb(101, 77, 247)",
                      color: "#ffffff",
                      cursor: "pointer",
                    }}
                  >
                    <Add /> Add New Project
                  </Button>
                </Grid>
              </Grid>
              <Grid>
                
               <DynamicTreeView TestCaseHandle={handleTestCaseList}/>
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            {addTestCase && <AddTestCase />}
            
          </Grid>
        </Grid>
      </div>
    </>
  );
}

 