import React, { useState, useEffect } from "react";
import { Grid, Card, Drawer } from "@material-ui/core";
import { useStyles } from "./styles";
import Button from "@mui/material/Button";
import TabsPanel from "./TabsPanel";
import AddNewProject from "./AddNewProject";
import { Remove, Add } from "@mui/icons-material/";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import DynamicTreeView from "./DynamicTreeView";
import axios from "axios";
import { header } from "../../utils/authheader";
import { Box } from "@mui/material";
const BASE_URL = process.env.REACT_APP_BASE_URL;

export default function Performance() {
  const classes = useStyles();

  const [addTestCase, setAddTestCase] = useState(0);
  const [addNewProject, setAddNewProject] = useState(false);
  const [depth, setdepth] = useState(0)
  const [formData, setFormData] = useState({ name: "" });
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isCollapsed, setisCollapsed] = useState(false);
  const [listData, setListData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/Performance/GetProjectData`,
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
        `${BASE_URL}/Performance/AddProjectData`,
        {
          id: 0,
          parentId: 0,
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

  const handleTestCaseList = (id,node) => {
    setdepth(node)
    setAddNewProject(false);
    if(node>1){
      setAddTestCase(id);
    }else
      setAddTestCase(0)
  };

  const treeStyle = drawerOpen ? {} : { display: "none" };
  return (
    <>
      <div className={classes.main}>
        <Grid container spacing={2}>
          <Box
            onClick={() => setDrawerOpen(!drawerOpen)}
            style={{ position: "absolute", left: "3px", cursor: "pointer"}}
          >
            {!drawerOpen && <KeyboardDoubleArrowRightIcon />}
          </Box>

          <Grid item xs={12} md={3} style={treeStyle}>
              <Card
                className={classes.card}
                style={{ paddingBottom: "30px", maxHeight: "78vh" }}
              >
                <Grid
                  container
                  alignItems="center"
                  className={classes.bodyHeader}
                  style={{position:'relative'}}
                >
                  <Grid item xs={6}>
                    Workspaces
                  </Grid>
                  <Grid item xs={5} style={{ textAlign: "right" }}>
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
                      {!addNewProject?<Add />:'Cancel'}
                    </Button>
                  </Grid>
                  <Grid item xs={1} style={{position:'absolute',right:'-14px',top:'-6px'}}>
                    <Box
                      onClick={() => setDrawerOpen(!drawerOpen)}
                      sx={{cursor:'pointer'}}
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
          <Grid item xs={12} md={drawerOpen ? 9 : 12}>
            {depth>1?(addTestCase !== 0 && <TabsPanel rootId={addTestCase} />):(<Box/>)}
          </Grid>
        </Grid>
      </div>
    </>
  );
}
