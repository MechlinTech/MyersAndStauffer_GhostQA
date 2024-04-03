import React, { useState, useEffect, Children } from "react";
import { Grid, Card, Box } from "@material-ui/core";
import { useStyles } from "./styles";
import Button from "@mui/material/Button";

import { Add } from "@mui/icons-material";

import AddTestCase from "./AddTestCase";
import AddNewProject from "./AddNewProject";

import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import DynamicTreeView from "./DynamicTreeView";
import axios from "axios";
import { header } from "../../utils/authheader";
const BASE_URL = process.env.REACT_APP_BASE_URL;

export default function TestLab() {
  const classes = useStyles();

  const [addTestCase, setAddTestCase] = useState(0);
  const [addNewProject, setAddNewProject] = useState(false);

  const [formData, setFormData] = useState({ name: "" });
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [nameSuite, setNameSuite] = useState("");

  const [selectedItem, setSelectedItem] = useState(null);
  const [listData, setListData] = useState([]);
  const [depth, setdepth] = useState(null);
  const [childOfFirstTwoParent, setchildOfFirstTwoParent] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/AddTestLab/GetDataRootRelation`,
          header()
        );
        // Assuming response.data is the array of data you want to set as listData
        setListData(response.data == "" ? [] : response.data);
        console.log(response);
      } catch (error) {
        console.error("Error fetching data:", error);
        setListData([]);
      }
    };

    fetchData(); // Call the fetchData function when the component mounts
  }, [addTestCase, addNewProject]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${BASE_URL}/AddTestLab/AddRootRelation`,
        {
          rootId: 0,
          node: 0,
          parent: 0,
          name: formData.name,
        },

        header()
      );
      setListData([...listData, response.data.Data[0]]); // Reset form data
      setFormData({ name: "" });
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

  const handleTestCaseList = (item, node = 0) => {
    setdepth(node);
    if (node > 1) {
      setAddTestCase(item.id);
      setNameSuite(item.name);
      setAddNewProject(false);
    } else {
      let childs = listData.filter((data)=> data.parentId === item.id )
      setchildOfFirstTwoParent(childs)
      setAddTestCase(0);
      setNameSuite("");
      setAddNewProject(false);
    }
  };
  const treeStyle = drawerOpen ? {} : { display: "none" };
  return (
    <>
      <div className={classes.main}>
        <Grid container spacing={2}>
          <Box
            onClick={() => setDrawerOpen(!drawerOpen)}
            style={{ position: "absolute", left: "3px", cursor: "pointer" }}
          >
            {!drawerOpen && <KeyboardDoubleArrowRightIcon />}
          </Box>
          <Grid item xs={12} md={3} xl={2} style={treeStyle}>
            <Card
              className={classes.card}
              style={{ paddingBottom: "30px" }}
            >
              <Grid
                container
                alignItems="center"
                style={{ position: "relative" }}
                className={classes.bodyHeader}
              >
                <Grid item xs={6}>
                  Workspace
                </Grid>
                <Grid item xs={6} style={{ textAlign: "right" }}>
                  <Button
                    variant="contained"
                    onClick={() => setAddNewProject((current) => !current)}
                    style={{
                      fontSize: 14,
                      backgroundColor: "rgb(101, 77, 247)",
                      color: "#ffffff",
                      cursor: "pointer",
                    }}
                  >
                    {!addNewProject ? <Add /> : "Cancel"}
                  </Button>
                </Grid>
                <Grid
                  item
                  xs={1}
                  style={{ position: "absolute", right: "-14px", top: "-6px" }}
                >
                  <Box
                    onClick={() => setDrawerOpen(!drawerOpen)}
                    sx={{ cursor: "pointer" }}
                  >
                    {drawerOpen && <KeyboardDoubleArrowLeftIcon />}
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  {addNewProject && (
                    <AddNewProject
                      handleChange={handleChange}
                      handleSubmit={handleSubmit}
                      formData={formData}
                    />
                  )}
                </Grid>
              </Grid>
              <Grid>
                <DynamicTreeView
                  TestCaseHandle={handleTestCaseList}
                  listData={listData}
                  setListData={setListData}
                />
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={12} md={drawerOpen ? 9 : 12} xl={10} >
            {depth>1 ? (
              <AddTestCase addTestCase={addTestCase} nameSuite={nameSuite} />
            ):(<Box/>)}
          </Grid>
        </Grid>
      </div>
    </>
  );
}
