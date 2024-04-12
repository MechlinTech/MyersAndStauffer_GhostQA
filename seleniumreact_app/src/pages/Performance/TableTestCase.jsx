import React, { useState, useRef, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";
import { Button, Stack } from "@mui/material";
import { useStyles } from "./styles";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DesignTabs from "./Component/Design/DesignTabs";
import { header, headerForm } from "../../utils/authheader";
import { StyledTypography } from "./styles";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { getBaseUrl } from "../../utils/configService";
// const BASE_URL = process.env.REACT_APP_BASE_URL || "api";
import { useDispatch } from "react-redux";
import { GetLocationScenarioVUCount, setScenarioId, setScenarios } from "../../redux/actions/performanceAction";

export default function TableTestCase({
  testCase,
  showAddNewElement,
  setShowAddNewElement,
  rootId,
  apiCalling,
}) {
  const navigate = useNavigate();
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();
  const testNamefield = useRef();
  const [testCaseData, setTestCaseData] = useState([]);
  // console.log("testCaseData", testCaseData);
  const [expandedAccord, setExpandedAccord] = useState("");
  const fetchData = async () => {
    try {
      const BASE_URL = await getBaseUrl();
      const response = await axios.get(
        `${BASE_URL}/Performance/GetPerformanceFileByRootId?RootId=${rootId}`,
        header()
      );
      // Assuming response.data is the array of data you want to set as listData
      setTestCaseData(response.data == "" ? [] : response.data);
      dispatch(
        GetLocationScenarioVUCount(response.data == "" ? [] : response.data)
      );
      dispatch(setScenarios(response.data == "" ? [] : response.data))

      const searchParams = new URLSearchParams(location.search);
      const testId = parseInt(searchParams.get("testid"));
      if (testId && Array.isArray(response.data)) {
        const testToEdit = response.data.find((item) => item.id === testId);
        // setExpandedAccord(
        //   expandedAccord ? expandedAccord : testToEdit.testCaseName
        // );
        setExpandedAccord(
          expandedAccord ? expandedAccord : testId
        );
      }
      console.log(response);
    } catch (error) {
      console.error("Error fetching data:", error);
      setTestCaseData([]);
    }
  };
  useEffect(() => {
    fetchData(); // Call the fetchData function when the component mounts
  }, [rootId]);
  // useEffect(() => {
  //   const searchParams = new URLSearchParams(location.search);
  //   const testId = parseInt(searchParams.get("testid"));
  //   if (testId && Array.isArray(testCaseData)) {
  //     const testToEdit = testCaseData.find((item) => item.id === testId);
  //     setExpandedAccord(testToEdit ? testToEdit.testCaseName : "");
  //   }
  // }, []);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const fileDataRef = useRef(null);
  const [designTabsActive, setDesignTabsActive] = useState(false);
  const handleActiveTabs = () => {
    setDesignTabsActive(!designTabsActive);
  };
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const handleFileSaving = async () => {
    if (!selectedFile) {
      toast.error("please select file");
      return;
    } else {
      const fileName = selectedFile.name;
      const extension = fileName.split(".").pop().toLowerCase();

      if (extension !== "jmx") {
        toast.error("Invalid file format. Please select a .jmx file.");
        // Optionally, clear the file input
        // selectedFile(null)
        return;
      }
    }

    if (testNamefield.current.value.trim() == "") {
      toast.error("Scenario name required");
      return;
    }
    const formData = new FormData();
    formData.append("id", 0);
    formData.append("rootId", rootId);
    formData.append("testCaseName", testNamefield.current.value);
    formData.append("binaryData", selectedFile);
    formData.append("fileName", selectedFile.name);

    try {
      const BASE_URL = await getBaseUrl();
      const response = await axios.post(
        `${BASE_URL}/Performance/AddPerformanceFile`,
        formData,
        headerForm()
      );
      console.log("response", response);
      fetchData();
      apiCalling();
      setSelectedFile(null);
      setExpandedAccord(testNamefield.current.value);
      testNamefield.current.value = "";
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleDeleteElement = async (id, event) => {
    event.stopPropagation();
    try {
      const BASE_URL = await getBaseUrl();
      const response = await axios.post(
        `${BASE_URL}/Performance/DeletePerformanceFile?Id=${id}`,
        { Id: id },
        header()
      );
      fetchData();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  const handleExpandAccord = (panel) => (e, isExpanded) => {
    setExpandedAccord(isExpanded ? panel : "");
  };
  function truncateFileName(fileName, maxLength) {
    if (fileName.length <= maxLength) {
      return fileName;
    } else {
      const truncatedName = fileName.substring(0, maxLength);
      const extensionIndex = fileName.lastIndexOf(".");
      const extension = fileName.substring(extensionIndex);
      return truncatedName + "..." + extension;
    }
  }
  const selectedAccodStyle = {
    border: "2px solid #654DF7",
    // color: "white",
    borderRadius: "5px",
  };
  return (
    <TableContainer
    // component={Paper}
    // style={{
    //   border: testCaseData.length > 0 ? "solid 2px #DADADA" : "none",
    //   borderRadius: testCaseData.length > 0 ? "5px" : "",
    // }}
    >
      <Table aria-label="simple table">
        {testCaseData.length > 0 && (
          <TableHead sx={{ backgroundColor: "#dedede" }}>
            <TableRow>
              <TableCell colSpan={3}>
                <Stack
                  width="100%"
                  display="felx"
                  flexDirection="row"
                  justifyContent="space-between"
                  p={0}
                >
                  <div style={{ width: "33%" }}>
                    <StyledTypography>Scenario</StyledTypography>
                  </div>
                  <div style={{ width: "33%", textAlign: "center" }}>
                    <StyledTypography>File Name</StyledTypography>
                  </div>
                  <div style={{ width: "33%", textAlign: "right" }}>
                    <StyledTypography>Action</StyledTypography>
                  </div>
                </Stack>
              </TableCell>
            </TableRow>
          </TableHead>
        )}

        <TableBody>
          {testCaseData?.map((item, index) => (
            <TableRow key={index}>
              <TableCell colSpan={3} style={{ padding: "0px" }} onClick={()=>dispatch(setScenarioId(item.id))}>
                <Accordion
                  expanded={expandedAccord === item.id}
                  // expanded={expandedAccord === item.testCaseName}
                  onChange={
                    // handleExpandAccord(item.testCaseName)}
                    handleExpandAccord(item.id)}
                  sx={{
                    boxShadow: "none",
                    paddingLeft: "0px",
                    // border:'1px solid red',
                    marginTop: "6px",
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    style={
                      expandedAccord === item.id
                        ? selectedAccodStyle
                        : {}
                    }
                  >
                    <Stack
                      width="100%"
                      display="felx"
                      flexDirection="row"
                      justifyContent="space-between"
                    >
                      <div style={{ width: "33%" }}>
                        <StyledTypography>
                          {item.testCaseName}
                        </StyledTypography>
                      </div>
                      <div style={{ width: "33%", textAlign: "center" }}>
                      <StyledTypography>
                        {truncateFileName(item.fileName, 40)}
                      </StyledTypography>
                      </div>
                      <div style={{ width: "33%", textAlign: "right" }}>
                      <DeleteIcon
                        style={{
                          color: "red",
                        }}
                        onClick={(e) => handleDeleteElement(item.id, e)}
                      />
                      </div>

                      
                      
                    </Stack>
                  </AccordionSummary>
                  <AccordionDetails>
                    <DesignTabs
                      PerformanceFileId={item.id}
                      testCaseData={testCaseData}
                    />
                  </AccordionDetails>
                </Accordion>
              </TableCell>
            </TableRow>
          ))}
          {!showAddNewElement && (
            <TableRow
            // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell colSpan={3}>
                <Stack
                  width="100%"
                  display="felx"
                  flexDirection="row"
                  justifyContent="space-between"
                  p={0}
                >
                  <div style={{ width: "33%" }}>
                    <input
                      type="file"
                      ref={fileInputRef}
                      style={{ display: "none" }}
                      accept=".jmx"
                      onChange={handleFileChange}
                    />

                    <input
                      type="text"
                      placeholder="Enter Scenario Name"
                      ref={testNamefield}
                      style={{
                        fontSize: 14,
                        borderRadius: "4px",
                        border: "1px solid #654df7",
                        outline: "none",
                        padding: "6px",
                      }}
                      required
                    />
                  </div>
                  <div style={{ width: "33%", textAlign: "center" }}>
                    <Button
                      onClick={handleButtonClick}
                      style={{
                        backgroundColor: "rgb(101, 77, 247)",
                        color: "#ffffff",
                        cursor: "pointer",
                        textTransform: "toLowerCase",
                      }}
                    >
                      <StyledTypography style={{ textTransform: "none" }}>
                        {selectedFile ? `${selectedFile.name}` : "Choose file"}
                      </StyledTypography>
                    </Button>
                  </div>

                  <div style={{ width: "33.3%", textAlign: "right" }}>
                    <Button
                      style={{
                        fontSize: 14,
                        backgroundColor: !selectedFile
                          ? "rgba(101, 77, 247, 0.5)"
                          : "rgb(101, 77, 247)",
                        color: "#ffffff",
                        cursor: !selectedFile ? "not-allowed" : "pointer",
                        textTransform: "none",
                      }}
                      disabled={!selectedFile}
                      onClick={handleFileSaving}
                    >
                      Save
                    </Button>
                  </div>
                </Stack>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
