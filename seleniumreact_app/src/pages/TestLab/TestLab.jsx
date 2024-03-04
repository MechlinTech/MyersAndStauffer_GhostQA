import React, { useState, useEffect } from "react";
import { Grid, Card } from "@material-ui/core";
import { useStyles } from "./styles";
import Button from '@mui/material/Button';

import { Add } from "@mui/icons-material";
import axios from "axios";
import AddTestCase from "./AddTestCase";



import DynamicTreeView from "./DynamicTreeView";
import AddNewProject from "./AddNewProject";
import { header } from "../../utils/authheader";
const BASE_URL = process.env.REACT_APP_BASE_URL;
const datax = [
  {
    "name": "Root",
    "id": 1,
    "parentId": 0
  },
  {
    "name": "Root 2",
    "id": 10,
    "parentId": 0
  },
  {
    "name": "data 1",
    "id": 2,
    "parentId": 1
  },
  {
    "name": "data 2",
    "id": 3,
    "parentId": 1
  },
  {
    "name": "data 3",
    "id": 4,
    "parentId": 3
  }
];


export default function TestLab() {
  const classes = useStyles();
  const [listData, setListData] = useState([]);
  const [addTestCase, setAddTestCase] = useState(false);
  
  // State to manage form data
  const [formData, setFormData] = useState({
    name: '',
    id:-Math.random(),   
    parentId:0,
  });
  useEffect(() => {
    const fetchData = async () => {     
      try {
        const response = await axios.get(
          `${BASE_URL}/AddTestLab/GetDataRootRelation`,         
          header()
        );
       
        // Assuming response.data is the array of data you want to set as listData
        setListData((response.data==''?[]:response.data));
        console.log(response);
      } catch (error) {
        console.error("Error fetching data:", error);
        setListData(datax);
      }
    };

    fetchData(); // Call the fetchData function when the component mounts
  }, []);
  
  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
     // Add the new project to listData
     setListData(...listData,{ name: '', id: -Math.random(), parentId: 0 }); // Reset form data
};

  
  // Handle form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  

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
                
               <DynamicTreeView TestCaseHandle={handleTestCaseList} listData ={listData} setListData={setListData}/>
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            {addTestCase && <AddNewProject
            handleChange= {handleChange} 
            handleSubmit={ handleSubmit}
            formData={formData}
          
            />}
            
          </Grid>
        </Grid>
      </div>
    </>
  );
}

 