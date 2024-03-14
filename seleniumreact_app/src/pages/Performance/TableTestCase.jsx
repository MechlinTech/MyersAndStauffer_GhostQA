import React, { useState, useRef,useEffect } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PlayArrowSharpIcon from '@mui/icons-material/PlayArrowSharp';
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import { useNavigate } from 'react-router-dom';
import Collapse from '@mui/material/Collapse';
import axios from "axios";
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import { useStyles } from "./styles";
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import DesignTabs from "./Component/DesignTabs";
import { header,headerForm } from "../../utils/authheader";
const BASE_URL = process.env.REACT_APP_BASE_URL;
export default function TableTestCase({ testCase, showAddNewElement, setShowAddNewElement,addTestCase }) {
  const navigate = useNavigate()
  const classes = useStyles();
  const testNamefield = useRef();
  const [testCaseData, setTestCaseData] = useState([]);
  useEffect(() => {
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

    fetchData(); // Call the fetchData function when the component mounts
  }, []);
  
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
          `${BASE_URL}/Performance/AddProjectData`,
          formData,
          headerForm()
        );
        setTestCaseData([...testCaseData, {
          id: response.data,
          name: testNamefield.current.value,
          file: selectedFile,
          fileName: selectedFile.name
        }]);
        setSelectedFile(null);
        setShowAddNewElement(!showAddNewElement)
        testNamefield.current.value = '';
       
      } catch (error) {
        console.error("Error fetching data:", error);     
      } 
      
    }
  }
  const handleDeleteElement = async(event, id) => {
   
    try {
      const response = await axios.post(
        `${BASE_URL}/Performance/DeletePerformanceFile`,
        {Id:id},
        header()
      );
      setTestCaseData([...testCaseData, {
        id: response.data,
        name: testNamefield.current.value,
        file: selectedFile,
        fileName: selectedFile.name
      }]);
      const data = testCaseData.filter((item) => {
        if (item.id !== id) {
          return item;
        }
      });
    } catch (error) {
      console.error("Error fetching data:", error);     
    } 
    
  }

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  const [expanded, setExpanded] = useState([]);

  const toggleExpand = (id) => {
    if (expanded.includes(id)) {
      setExpanded(expanded.filter(item => item !== id));
    } else {
      setExpanded([...expanded, id]);
    }
    handleActiveTabs();
  };
  return (
    <TableContainer component={Paper} style={{
      border: 'solid 2px #DADADA',
      borderRadius: '5px'
    }}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Test Name</TableCell>
            <TableCell align="left">File name</TableCell>
            <TableCell align="left"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {testCaseData?.map((item) => (
            <>
              <TableRow
                key={0}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row" onClick={() => {

                  handleActiveTabs();
                }} sx={{ cursor: 'pointer' }}>
                  {item.name}
                </TableCell>
                <TableCell align="left"> {item.fileName}</TableCell>


                <TableCell align="right">
                  <DeleteIcon sx={{ color: '#f74d4d' }} style={{ cursor: 'pointer' }} onClick={(event) => handleDeleteElement(event, item.id)} />
                  {!expanded.includes(item.id) ? <ExpandMoreIcon onClick={() => toggleExpand(item.id)} /> : <ExpandLessIcon onClick={() => toggleExpand(item.id)} />}

                </TableCell>

              </TableRow>
              {expanded.includes(item.id) &&
                <TableRow>
                  <TableCell colSpan='4'>
                    <DesignTabs />
                  </TableCell>

                </TableRow>
              }

            </>


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
        </TableBody>
      </Table>
    </TableContainer>
  );
}