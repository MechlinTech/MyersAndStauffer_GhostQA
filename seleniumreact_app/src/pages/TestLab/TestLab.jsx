import React, { useState, useEffect } from "react";
import { Grid, Card } from "@material-ui/core";
import { useStyles } from "./styles";
import Button from '@mui/material/Button';

import { Add } from "@mui/icons-material";

import AddTestCase from "./AddTestCase";
import AddNewProject from "./AddNewProject";


import DynamicTreeView from "./DynamicTreeView";
import axios from "axios";
import { header } from "../../utils/authheader";
const BASE_URL = process.env.REACT_APP_BASE_URL;


export default function TestLab() {
  const classes = useStyles();

  const [addTestCase, setAddTestCase] = useState(0);
  const [addNewProject, setAddNewProject] = useState(false);

  const [formData, setFormData] = useState({name:""});

  const [selectedItem, setSelectedItem] = useState(null);
  const [listData, setListData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/AddTestLab/GetDataRootRelation`,
          header()
        );
        // Assuming response.data is the array of data you want to set as listData
        setListData((response.data == '' ? [] : response.data));
        console.log(response);
      } catch (error) {
        console.error("Error fetching data:", error);
        setListData([]);
      }
    };

    fetchData(); // Call the fetchData function when the component mounts
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${BASE_URL}/AddTestLab/AddRootRelation`,
        {
          "rootId": 0,
          "node": 0,
          "parent": 0,
          "name": formData.name
        },

        header()
      );
      setListData([...listData, response.data.Data[0]]); // Reset form data
      setFormData({name:""});
      setAddNewProject(!addNewProject);
    } catch (error) {
      console.error("Error fetching data:", error);     
    }
  };
  const handleItemClick = (id) => {
    setSelectedItem(id); // Update selected item state
    // onItemClick(id); // Call the onItemClick callback function with the clicked item's id
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ name: value, id: Math.random(), parentId: 0 });
  };


  const handleTestCaseList = (id) => {
    setAddTestCase(id);
    setAddNewProject(false);
    console.log(id,'testswt');
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
                    onClick={() => setAddNewProject(current => !current)}
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

                <DynamicTreeView TestCaseHandle={handleTestCaseList} listData={listData} setListData={setListData} />
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            {addNewProject && <AddNewProject
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              formData={formData}
            />}
            {addTestCase!==0 && <AddTestCase  addTestCase={addTestCase}/>}

          </Grid>
        </Grid>
      </div>
    </>
  );
}

