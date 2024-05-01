import React, { useState, useEffect } from "react";
import { Grid, Card } from "@material-ui/core";
import { useStyles } from "./styles";
import Button from "@mui/material/Button";
import TabsPanel from "./TabsPanel";
import AddNewProject from "./AddNewProject";
import { Add } from "@mui/icons-material/";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import DynamicTreeView from "./DynamicTreeView";
import axios from "axios";
import { header } from "../../utils/authheader";
import { toast } from "react-toastify";
import { Box } from "@mui/material";
import { getBaseUrl } from "../../utils/configService";
import { useDispatch, useSelector } from 'react-redux';
import { AddWorkspace, fetchWorkSpaces, setRootId } from "../../redux/actions/TestCase/testcaseAction";

export default function TestCase() {
  const classes = useStyles();
  const dispatch = useDispatch()
  const [addNewProject, setAddNewProject] = useState(false);
  const [depth, setdepth] = useState(0);
  const [formData, setFormData] = useState({ name: "" });
  const [drawerOpen, setDrawerOpen] = useState(true);

  useEffect(() => {
    dispatch(fetchWorkSpaces())
  }, []);


  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formData.name.trim()) {
      toast.error("Whitespace is not allowed.");
      return; 
    }
    try {
      const BASE_URL = await getBaseUrl();
      const response = await axios.post(
        `${BASE_URL}/FunctionalTest/AddFunctionalTest`,
        {
          // id: 0,
          // parentId: 0,
          // name: formData.name,
          rootId: 0,
          node: 0,
          parent: formData.parentId,
          name: formData.name,
        },

        header()
      );
      if(response.data.status === 'fail'){
        toast.error(response.data.message)
      }else{
        dispatch(AddWorkspace(response.data.Data[0]))
        setFormData({ name: "" });
        setAddNewProject(false);
      }
      
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
 
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ name: value, id: Math.random(), parentId: 0 });
  };

  const handleTestCaseList = (id, node) => {
    setdepth(node);
    setAddNewProject(false);
    // if (node > 1) {
    // //   setAddTestCase(id);
    // dispatch(setRootId(id))
    // } else {
    // dispatch(setRootId(0))
    // }
    dispatch(setRootId(id))

  };

  const handleCancel = () => {
     setAddNewProject(false)
     setFormData({ name: "" });
  }

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
            <Card className={classes.card} style={{ paddingBottom: "30px" }}>
              <Grid
                container
                alignItems="center"
                className={classes.bodyHeader}
                style={{ position: "relative" }}
              >
                <Grid item xs={6}>
                  Workspaces
                </Grid>
                <Grid item xs={5} style={{ textAlign: "right" }}>
                  {addNewProject ? (
                    <Button
                      variant="contained"
                      onClick={handleCancel}
                      style={{
                        fontSize: 14,
                        backgroundColor: "rgb(101, 77, 247)",
                        color: "#ffffff",
                        cursor: "pointer",
                      }}
                    >
                      Cancel
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      onClick={() => setAddNewProject(true)}
                      style={{
                        fontSize: 14,
                        backgroundColor: "rgb(101, 77, 247)",
                        color: "#ffffff",
                        cursor: "pointer",
                      }}
                    >
                      <Add />
                    </Button>
                  )}
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
                />
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={12} md={drawerOpen ? 9 : 12} xl={10}>
            {depth >= 1 ? (
              <TabsPanel/>
            ) : (
              <Box />
            )}
          </Grid>
        </Grid>
      </div>
    </>
  );
}
