import React, { useState, useRef,useEffect } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import AddIcon from '@mui/icons-material/Add';
import { Button, Stack } from '@mui/material';
import { useStyles } from "./styles";
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DesignTabs from "./Component/DesignTabs";
import { header,headerForm } from "../../utils/authheader";
import { StyledTypography } from "./styles";
const BASE_URL = process.env.REACT_APP_BASE_URL;
export default function TableTestCase({ testCase, showAddNewElement, setShowAddNewElement,addTestCase }) {
  const navigate = useNavigate()
  const classes = useStyles();
  const testNamefield = useRef();
  const [testCaseData, setTestCaseData] = useState([]);
  const [expandedAccord, setExpandedAccord] = useState("");
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/Performance/GetPerformanceFileByRootId?RootId=${addTestCase}`,
        header()
      );
      // Assuming response.data is the array of data you want to set as listData
      setTestCaseData((response.data == '' ? [] : response.data));
      console.log(response);
    } catch (error) {
      console.error("Error fetching data:", error);
      setTestCaseData([]);
    }
  };
  useEffect(() => {
    fetchData(); // Call the fetchData function when the component mounts
  }, [addTestCase]);
  
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const fileDataRef = useRef(null);
  const [designTabsActive, setDesignTabsActive] = useState(false);
  const handleActiveTabs = () => {
    setDesignTabsActive(!designTabsActive)
  }
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const handleNewElementAppend = async(event) => {
    if (event.keyCode == 13) {
      const formData = new FormData();
      formData.append("id", 0);
      formData.append( "rootId",addTestCase);
      formData.append("testCaseName",  testNamefield.current.value);
      formData.append("binaryData",selectedFile);
      formData.append("fileName", selectedFile.name);
     
      try {
        const response = await axios.post(
          `${BASE_URL}/Performance/AddPerformanceFile`,
          formData,
          headerForm()
        );
        fetchData()
        setSelectedFile(null);
        setExpandedAccord(testNamefield.current.value)
        testNamefield.current.value = '';
       
      } catch (error) {
        console.error("Error fetching data:", error);     
      } 
      
    }
  }
  const handleDeleteElement = async(id,event) => {
      event.stopPropagation()
    try {
      const response = await axios.post(
        `${BASE_URL}/Performance/DeletePerformanceFile?Id=${id}`,
        {Id:id},
        header()
      );
      fetchData()
    } catch (error) {
      console.error("Error fetching data:", error);     
    } 
    
  }

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  const handleExpandAccord = (panel) => (e, isExpanded) => {
    setExpandedAccord(isExpanded ? panel : "");
  };
  return (
    <TableContainer component={Paper} style={{
      border: 'solid 2px #DADADA',
      borderRadius: '5px'
    }}>
      <Table aria-label="simple table">
        <TableHead sx={{backgroundColor:'#dedede'}}>
          <TableRow>
            <TableCell><StyledTypography>Test Name</StyledTypography></TableCell>
            <TableCell align="left"><StyledTypography>File name</StyledTypography></TableCell>
            <TableCell align="left"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          
        </TableBody>
      </Table>
        {testCaseData?.map((item, index) => (
            <React.Fragment key={index}>
              <Accordion
                expanded={expandedAccord === item.testCaseName}
                onChange={handleExpandAccord(item.testCaseName)}
                sx={{
                  boxShadow: "none",
                }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Stack width='100%' display='felx' flexDirection="row" justifyContent="space-between">
                    <StyledTypography align="left">{item.testCaseName}</StyledTypography>
                    <StyledTypography align="left">{item.fileName}</StyledTypography>
                    <DeleteIcon style={{color:'red'}} onClick={(e)=>handleDeleteElement(item.id,e)}/>
                  </Stack>
                </AccordionSummary>
                <AccordionDetails>
                      <DesignTabs PerformanceFileId={item.id} />
                </AccordionDetails>
              </Accordion>
            </React.Fragment>
          ))}


          {!showAddNewElement && <TableRow
            key={0}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row" sx={{ cursor: 'pointer' }}>
              <input type="file" ref={fileInputRef} style={{ display: 'none' }}  accept=".jmx" onChange={handleFileChange} />

              <input type='text' placeholder='Enter Test Name' ref={testNamefield} style={{
                fontSize: 14,
                borderRadius: '4px',
                border: "solid 2px #DADADA",
                padding: "6px 14px"
              }} onKeyDown={(event) => { handleNewElementAppend(event) }} />
            </TableCell>
            <TableCell align="left">
              <Button style={{
                fontSize: 14,
                backgroundColor: "rgb(101, 77, 247)",
                color: "#ffffff",
                cursor: "pointer",
                padding: "6px 14px"
              }}
                onClick={handleButtonClick}>
                <AddIcon />
                {selectedFile ? `${selectedFile.name}` : 'Add '}

              </Button>

            </TableCell>


            <TableCell align="left">

            </TableCell>
          </TableRow>
          }
    </TableContainer>
  );
}